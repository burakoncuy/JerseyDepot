from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from enum import Enum
from datetime import datetime

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

class ItemStatusType(Enum):
    AVAILABLE = "AVAILABLE"
    SOLD = "SOLD"


class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    category = db.Column(db.Enum(CategoryType), nullable=False)
    condition = db.Column(db.Enum(ConditionType), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    size = db.Column(db.Enum(SizeType), nullable=False)
    item_status = db.Column(db.Enum(ItemStatusType), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    cart_items = db.relationship('Cart', back_populates='item')
    favorites = db.relationship('Favorite', back_populates='item')
    reviews = db.relationship('Review', back_populates='item')
    order_items = db.relationship('OrderItem', back_populates='item')   

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price),
            'category': self.category.value if self.category else None,
            'condition': self.condition.value if self.condition else None,
            'image_url': self.image_url,
            'size': self.size.value if self.size else None,
            'item_status': self.item_status.value if self.item_status else None,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }