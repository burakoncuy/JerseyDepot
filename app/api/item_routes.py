from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models.item import Item, ItemStatusType, CategoryType, ConditionType, SizeType
from ..models.favorite import Favorite
from ..models.user import User
from ..models.review import Review 
from ..models.order import Order, OrderStatusType
from ..models.order_item import OrderItem
from ..models.db import db
from datetime import datetime
from ..forms.item_form import ItemForm
from ..forms.review_form import ReviewForm
from ..api.aws_helper import get_unique_filename,upload_file_to_s3

item_routes = Blueprint("items", __name__)


##Get all items
@item_routes.route("/", methods=["GET"])
def get_items():
    items= [items.to_dict() for items in Item.query.all()]
    return items


##Get a specific item
@item_routes.route("/<int:id>", methods=["GET"])
def get_item(id):
    item=Item.query.get(id)
    if item:
        return item.to_dict()
    else:
        return {"message": "Item not found"},404


##Get items owned by current user
@item_routes.route("/current", methods=["GET"])
@login_required
def get_current_user_items():
    items=Item.query.filter(Item.user_id == current_user.id).all()
    if not items:
        return {"message": "not item found"}
    items_list=[item.to_dict() for item in items]
    return {"items": items_list}

##Create a new item
@item_routes.route("/new", methods=["POST"])
@login_required  # Ensures user must be logged in
def create_item():
    form = ItemForm()
    form.csrf_token.data = request.cookies.get('csrf_token')  # Get CSRF token

    if form.validate_on_submit():
        # Handle image file upload
        image = form.image.data
        if image:
            filename = get_unique_filename(image.filename)
            image_url = upload_file_to_s3(image)
            if "errors" in image_url:
                return image_url  # Return the error message if upload failed

            image_url = image_url["url"]
        else:
            image_url = None  # Set to None if no image uploaded

        new_item = Item(
            user_id=current_user.id,  # This will work only if the user is logged in
            name=form.name.data,
            description=form.description.data,
            price=form.price.data,
            category=form.category.data,
            condition=form.condition.data,
            image_url=image_url,
            size=form.size.data,
            item_status=form.item_status.data
        )

        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict(), 201  # Return created item
    return {"errors": form.errors}, 400


##Update an item
@item_routes.route("/<int:id>/update" , methods=["PUT"])
@login_required
def update_item(id):
    item = Item.query.get(id)

    if not item:
        return {"error": "Item not found"}, 404

    if item.user_id != current_user.id:
        return {"error": "Unauthorized to update this item"}, 403

    # Get data from request form
    name = request.form.get("name")
    description = request.form.get("description")
    price = request.form.get("price")
    category = request.form.get("category")
    condition = request.form.get("condition")
    size = request.form.get("size")
    item_status = request.form.get("item_status")

    # Handle image file upload
    image = request.files.get("image")  # Fetch file from request

    if image:
        filename = get_unique_filename(image.filename)
        image_url = upload_file_to_s3(image)  # Upload to S3
        if "errors" in image_url:
            return image_url  # Return error if upload fails
        item.image_url = image_url["url"]  # Update item image URL

    # Update other item fields
    item.name = name
    item.description = description
    item.price = price
    item.category = category
    item.condition = condition
    item.size = size
    item.item_status = item_status
    item.updated_at = datetime.utcnow()

    db.session.commit()
    return item.to_dict(), 200


##Delete an item
@item_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_item(id):
    item = Item.query.get(id)

    if not item:
        return {"errors": ["Item not found"]}, 404

    if current_user.id != item.user_id:
        return {"error": "Unauthorized to delete this item"}, 403

    # Delete related reviews first
    Review.query.filter(Review.item_id == id).delete()

    # Delete related favorites
    Favorite.query.filter(Favorite.item_id == id).delete()

    # Finally, delete the item
    db.session.delete(item)
    db.session.commit()

    return {"message": "Item successfully deleted"}, 200


## Add item to favorites
@item_routes.route("/<int:item_id>/add-to-favorite", methods=["POST"])
@login_required
def add_to_favorite(item_id):
    # Fetch the item by ID
    item = Item.query.get(item_id)

    if not item:
        return {"message": "Item not found"}, 404

    # Check if the favorite entry already exists
    existing_favorite = Favorite.query.filter_by(user_id=current_user.id, item_id=item_id).first()
    if existing_favorite:
        return {"message": "Item is already in favorites"}, 400

    # Create and add the favorite entry
    favorite = Favorite(
        user_id=current_user.id,
        item_id=item_id,  # Ensure item_id is correctly set
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(favorite)
    db.session.commit()

    return favorite.to_dict(), 201  # Return the newly created favorite



## Get favorite items
@item_routes.route("/favorites", methods=["GET"])
@login_required
def get_favorites():
    user = current_user

    # Query favorite items by joining with the Item table
    favorite_items = [fav.item.to_dict() for fav in user.favorites]

    return jsonify(favorite_items)


@item_routes.route("/<int:item_id>/remove-from-favorite", methods=["DELETE"])
@login_required
def remove_from_favorite(item_id):
    # Fetch the favorite entry for the current user and item
    favorite = Favorite.query.filter_by(user_id=current_user.id, item_id=item_id).first()

    if not favorite:
        return {"message": "Item is not in favorites"}, 400

    # Remove the favorite entry
    db.session.delete(favorite)
    db.session.commit()

    return {"message": "Item removed from favorites"}, 200



## Get reviews for an item
@item_routes.route("/<int:id>/reviews", methods=["GET"])
def get_reviews(id):
    reviews = Review.query.filter_by(item_id=id).join(User).all()
    
    if not reviews:
        return {"message": "No reviews yet"}, 404

    # Create a list of reviews with the associated username
    reviews_list = [
        {
            **review.to_dict(),  # Get all review data
            'user_name': review.user.username  # Add the username of the user who made the review
        }
        for review in reviews
    ]

    return jsonify(reviews_list), 200





## Add a review 
@item_routes.route("/<int:id>/reviews", methods=["POST"])
@login_required
def add_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies.get('csrf_token', '')

    if form.validate_on_submit():
        # Check if item exists
        item = Item.query.get(id)
        if not item:
            return {"message": "Item not found"}, 404

        # Create a new review (no order check required)
        new_review = Review(
            user_id=current_user.id,
            item_id=id,
            rating=form.rating.data,
            comment=form.comment.data
        )
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict(), 201
    else:
        return jsonify(form.errors), 400