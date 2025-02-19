from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models.item import Item, ItemStatusType, CategoryType, ConditionType, SizeType
from ..models.db import db
from datetime import datetime
from ..forms.item_form import ItemForm

item_routes = Blueprint("items", __name__)


#Get all items
@item_routes.route("/", methods=["GET"])
def get_items():
    items= [items.to_dict() for items in Item.query.all()]
    return items


#Get a specific item
@item_routes.route("/<int:id>", methods=["GET"])
def get_item(id):
    item=Item.query.get(id)
    if item:
        return item.to_dict()
    else:
        return {"message": "Item not found"},404
    

#Create a new item
@item_routes.route("/new", methods=["POST"])
@login_required  # Ensures user must be logged in
def create_item():
    form = ItemForm()
    form.csrf_token.data = request.cookies.get('csrf_token')  # Get CSRF token

    if form.validate_on_submit():
        new_item = Item(
            user_id=current_user.id,  # This will work only if user is logged in
            name=form.name.data,
            description=form.description.data,
            price=form.price.data,
            category=form.category.data,
            condition=form.condition.data,
            image_url=form.image_url.data,
            size=form.size.data,
            item_status=form.item_status.data
        )
        db.session.add(new_item)
        db.session.commit()
        return new_item.to_dict(), 201  # Return created item
    return {"errors": form.errors}, 400


#Update an item
@item_routes.route("/<int:id>/update" , methods=["PUT"])
@login_required
def update_item(id):
    item = Item.query.get(id)

    if not item:
        return {"error": "Item not found"}, 404

    if item.user_id != current_user.id:
        return {"error": "Unauthorized to update this item"}, 403

    form = ItemForm()
    form.csrf_token.data = request.cookies.get('csrf_token')  # Get CSRF token

    if form.validate_on_submit():
        item.name = form.name.data
        item.description = form.description.data
        item.price = form.price.data
        item.category = form.category.data
        item.condition = form.condition.data
        item.image_url = form.image_url.data
        item.size = form.size.data
        item.item_status = form.item_status.data
        item.updated_at = datetime.utcnow()  # Update timestamp

        db.session.commit()
        return item.to_dict(), 200  # Return updated item

    return {"errors": form.errors}, 400


##Delete an item
@item_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_item(id):
    item=Item.query.get(id)

    if not item:
        return {"errors": ["item not found"]}, 404

    if(current_user.id != item.user_id):
        return {"error": "Unauthorized to delete this item"}, 403
    
    db.session.delete(item)
    db.session.commit()

    return {"message": "item successfully deleted"}
