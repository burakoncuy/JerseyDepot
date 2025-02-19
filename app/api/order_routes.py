from flask import Blueprint,request,jsonify
from ..models.db import db
from ..models.cart import Cart
from ..models.item import Item
from ..models.order import Order,OrderStatusType
from ..models.order_item import OrderItem
from flask_login import login_required, current_user

order_routes = Blueprint("orders", __name__)


## List orders
@order_routes.route("", methods=["GET"])
@login_required
def view_orders():
    # Get all orders for the logged-in user
    orders = Order.query.filter_by(user_id=current_user.id).all()

    if not orders:
        return {"message": "No orders found."}, 404

    # Return the orders in JSON format
    return jsonify([order.to_dict() for order in orders]), 200



## View Order Details
@order_routes.route("/<int:id>", methods=["GET"])
@login_required
def view_order(id):
    # Get the order by ID for the logged-in user
    order = Order.query.filter_by(id=id, user_id=current_user.id).first()

    if not order:
        return {"message": "Order not found."}, 404

    # Include order items in the response
    order_items = OrderItem.query.filter_by(order_id=id).all()
    order_details = order.to_dict()
    order_details['order_items'] = [item.to_dict() for item in order_items]

    return jsonify(order_details), 200



## Create a new order
@order_routes.route("/create", methods=["POST"])
@login_required
def create_order():
    # Get cart items for the logged-in user
    cart_items = Cart.query.filter_by(user_id=current_user.id).all()

    if not cart_items:
        return {"message": "Your cart is empty."}, 400

    # Calculate total price for the order
    total = sum([item.quantity * item.item.price for item in cart_items])

    # Create the new order
    new_order = Order(
        user_id=current_user.id,
        total=total,
        order_status="PENDING"
    )
    
    # Add the new order to the database
    db.session.add(new_order)
    db.session.commit()

    # Create order items for each cart item
    for cart_item in cart_items:
        new_order_item = OrderItem(
            order_id=new_order.id,
            item_id=cart_item.item_id,
            quantity=cart_item.quantity,
            price=cart_item.item.price
        )
        db.session.add(new_order_item)

    # Commit all order items to the database
    db.session.commit()

    # Optionally, clear the cart after order is placed
    for cart_item in cart_items:
        db.session.delete(cart_item)
    db.session.commit()

    return jsonify(new_order.to_dict()), 201



## Update order status
@order_routes.route("/<int:id>/status", methods=["PUT"])
@login_required
def update_order_status(id):
    # Get the order by ID and ensure the user is either the buyer or the seller
    order = Order.query.filter_by(id=id).first()

    if not order:
        return {"message": "Order not found."}, 404

    # Check if the current user is either the buyer (user who made the order)
    # or the seller (owner of the items in the order)
    is_buyer = order.user_id == current_user.id

    # Check if the current user is the seller of any of the items in the order
    is_seller = any(item.item.user_id == current_user.id for item in order.order_items)

    if not is_buyer and not is_seller:
        return {"message": "You do not have permission to update the order status."}, 403

    # Get the new status from the request
    new_status = request.json.get('order_status')

    if new_status not in ["PENDING", "COMPLETED", "SHIPPED", "CANCELED"]:
        return {"message": "Invalid order status."}, 400

    # Update the order status
    order.order_status = new_status
    db.session.commit()

    return jsonify(order.to_dict()), 200

