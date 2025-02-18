from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from enum import Enum
from datetime import datetime


class OrderStatusType(Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"
    SHIPPED = "SHIPPED"
    CANCELED = "CANCELED"

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    order_status = db.Column(db.Enum(OrderStatusType), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='orders')
    order_items = db.relationship('OrderItem', back_populates='order')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': float(self.total),
            'order_status': self.order_status.value if self.order_status else None,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }