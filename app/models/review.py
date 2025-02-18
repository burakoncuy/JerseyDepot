from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    review_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id')),nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.item_id')),nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    # Relationships
    user = db.relationship('User', back_populates='reviews')
    item = db.relationship('Item', back_populates='reviews')

    def to_dict(self):
        return {
            'review_id': self.review_id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }