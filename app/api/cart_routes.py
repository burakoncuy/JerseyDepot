from flask import Blueprint,request,jsonify
from ..models.db import db
from ..models.cart import Cart
from ..models.item import Item
from flask_login import login_required, current_user


cart_routes = Blueprint("cart", __name__)


## View current user's cart
@cart_routes.route("", methods=["GET"])
@login_required
def view_cart():
    # Get the cart items for the logged-in user
    cart_items = Cart.query.filter_by(user_id=current_user.id).all()

    if not cart_items:
        return {"message": "Your cart is empty."}, 200

    # Include the associated item data in the response
    cart_items_with_items = []
    for cart_item in cart_items:
        cart_item_dict = cart_item.to_dict()
        cart_item_dict['item'] = cart_item.item.to_dict()  # Include the item data
        cart_items_with_items.append(cart_item_dict)

    return jsonify(cart_items_with_items), 200


## Add item to the cart
@cart_routes.route("", methods=["POST"])
@login_required
def add_to_cart():
    item_id = request.json.get('item_id')
    quantity = request.json.get('quantity', 1)

    item = Item.query.get(item_id)
    if not item:
        return {"message": "Item not found."}, 404

    # Check if the user's cart already has items
    user_cart_items = Cart.query.filter_by(user_id=current_user.id).all()

    if user_cart_items:
        # Get the seller ID of the first item in the cart
        existing_seller_id = user_cart_items[0].item.user_id  

        # If the new item has a different seller, prevent adding it
        if item.user_id != existing_seller_id:
            return {"message": "You can only add items from one seller at a time. Please clear your cart first."}, 400

    # Check if item is already in cart
    existing_item = Cart.query.filter_by(user_id=current_user.id, item_id=item_id).first()
    if existing_item:
        existing_item.quantity += quantity
        db.session.commit()
        return jsonify(existing_item.to_dict()), 200

    new_cart_item = Cart(
        user_id=current_user.id,
        item_id=item_id,
        quantity=quantity,
    )

    db.session.add(new_cart_item)
    db.session.commit()

    return jsonify(new_cart_item.to_dict()), 201



## Remove item from cart
@cart_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def remove_from_cart(id):
    # Get the cart item by user and item ID
    cart_item = Cart.query.filter_by(user_id=current_user.id, item_id=id).first()

    if not cart_item:
        return {"message": "Item not found in your cart."}, 404

    # Remove the item from the cart
    db.session.delete(cart_item)
    db.session.commit()

    return {"message": "Item removed from cart."}, 200


## Update item on the cart
@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_cart_item(id):
    # Get data from the request body
    quantity = request.json.get('quantity')
    size = request.json.get('size')

    # Get the cart item by user and item ID
    cart_item = Cart.query.filter_by(user_id=current_user.id, item_id=id).first()

    if not cart_item:
        return {"message": "Item not found in your cart."}, 404

    # Update the quantity or size
    if quantity is not None:
        cart_item.quantity = quantity
    if size:
        cart_item.size = size

    # Commit the changes to the database
    db.session.commit()

    return jsonify(cart_item.to_dict()), 200
