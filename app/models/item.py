from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from enum import Enum

class CategoryType(Enum):
    SOCCER = "SOCCER"
    FOOTBALL = "FOOTBALL"
    BASKETBALL = "BASKETBALL"
    BASEBALL = "BASEBALL"

class ConditionType(Enum):
    NEW = "NEW"
    USED = "USED"

class SizeType(Enum):
    S = "S"
    M = "M"
    L = "L"
    XL = "XL"
    XX = "XXL"

class StatusType(Enum):
    AVAILABLE = "AVAILABLE"
    SOLD = "SOLD"


class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    item_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    category = db.Column(db.Enum(CategoryType), nullable=False)
    condition = db.Column(db.Enum(ConditionType), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    size = db.Column(db.Enum(SizeType), nullable=False)
    status = db.Column(db.Enum(StatusType), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now()
    )

    # Relationships
    cart_items = db.relationship('Cart', back_populate='item')
    favorites = db.relationship('Favorite', back_populate='item')
    reviews = db.relationship('Review', back_populate='item')
    order_items = db.relationship('OrderItem', back_populate='item')

    def to_dict(self):
        return {
            'item_id': self.item_id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price),
            'category': self.category.value if self.category else None,
            'condition': self.condition.value if self.condition else None,
            'image_url': self.image_url,
            'size': self.size.value if self.size else None,
            'status': self.status.value if self.status else None,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }