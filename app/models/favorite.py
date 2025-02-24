from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from datetime import datetime


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id'), ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='favorites')
    item = db.relationship('Item', back_populates='favorites')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,

        }