from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships with cascading delete
    items = db.relationship('Item', back_populates='user', cascade="all, delete-orphan")
    cart_items = db.relationship('Cart', back_populates='user', cascade="all, delete-orphan")
    favorites = db.relationship('Favorite', back_populates='user', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='user', cascade="all, delete-orphan")
    orders = db.relationship('Order', back_populates='user', cascade="all, delete-orphan")


    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
