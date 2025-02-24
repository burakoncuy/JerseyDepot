from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from datetime import datetime

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id'), ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id'), ondelete="CASCADE"), nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    order = db.relationship('Order', back_populates='order_items')
    item = db.relationship('Item', back_populates='order_items')

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'item_id': self.item_id,
            'quantity': self.quantity,
            'price': float(self.price),
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }