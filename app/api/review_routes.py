from flask import Blueprint,request,jsonify
from ..models.db import db
from ..models.review import Review
from ..models.item import Item
from ..forms.review_form import ReviewForm
from flask_login import login_required, current_user


review_routes = Blueprint("reviews", __name__)


## Delete a review (only by the user who created it)
@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if not review:
        return {"message": "Review not found"}, 404

    if review.user_id != current_user.id:
        return {"message": "Unauthorized"}, 403

    db.session.delete(review)
    db.session.commit()

    return {"message": "Review deleted successfully"}, 200




## Update a review 
@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_review(id):
    # Get the review by its ID
    review = Review.query.get(id)

    if not review:
        return {"message": "Review not found"}, 404
    
    # Check if the current user owns this review
    if review.user_id != current_user.id:
        return {"message": "You can only update your own reviews"}, 403

    # Use request.get_json() to parse the incoming JSON body
    data = request.get_json()

    # Create an instance of the form with the data
    form = ReviewForm(data=data)
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # Validate the form data
    if form.validate():
        # Update the review
        review.comment = form.comment.data
        review.rating = form.rating.data
        
        db.session.commit()

        return jsonify(review.to_dict())

    # If form validation fails, return errors
    return jsonify(form.errors), 400


## Get reviews made by current user
@review_routes.route("/current", methods=["GET"])
@login_required
def get_user_reviews():
    reviews = Review.query.filter_by(user_id=current_user.id).all()
    reviews_data = []
    for review in reviews:
        item = Item.query.get(review.item_id)
        reviews_data.append({
            "id": review.id,
            "rating": review.rating,
            "comment": review.comment,
            "item_name": item.name,  # Include the item name
            "item_image": item.image_url,
            "item_id": item.id,     # Include the item ID (optional)
        })
    return jsonify(reviews_data)


## Get reviews by id
@review_routes.route("/<int:id>", methods=["GET"])
def get_review(id):
    reviews = Review.query.filter_by(id=id).all()
    if not reviews:
        return {"message": "no review yet"}
    
    return jsonify([review.to_dict() for review in reviews]), 200



## Get all reviews
@review_routes.route("/", methods=["GET"])
def get_reviews():
    reviews= [reviews.to_dict() for reviews in Review.query.all()]
    return reviews
