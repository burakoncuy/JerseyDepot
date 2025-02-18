from app.models import db, Cart, environment, SCHEMA
from datetime import datetime

def seed_carts():
    cart1 = Cart(user_id=1, item_id=1, quantity=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    cart2 = Cart(user_id=1, item_id=2, quantity=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    cart3 = Cart(user_id=2, item_id=3, quantity=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    cart4 = Cart(user_id=3, item_id=1, quantity=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    cart5 = Cart(user_id=4, item_id=2, quantity=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

    db.session.add_all([cart1, cart2, cart3, cart4, cart5])
    db.session.commit()

def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts;")
        
    db.session.commit()
