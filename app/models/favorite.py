from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    favorite_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id')), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.item_id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    item = db.relationship('Item', back_populates='favorites')

    def to_dict(self):
        return {
            'favorite_id': self.favorite_id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,

        }