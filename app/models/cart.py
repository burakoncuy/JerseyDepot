from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    cart_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id')), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.item_id')), nullable=False)
    quantity = db.Column(db.Integer, default=1, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

      # Relationships
    user = db.relationship('User', back_populates='cart_items')
    item = db.relationship('Item', back_populates='cart_items')

    def to_dict(self):
        return {
            'cart_id': self.cart_id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'quantity': self.quantity,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }