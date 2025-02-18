from app.models import db, OrderItem, environment, SCHEMA
from datetime import datetime

def seed_order_items():
    order_item1 = OrderItem(order_id=1, item_id=1, quantity=2, price=50.00, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    order_item2 = OrderItem(order_id=1, item_id=2, quantity=1, price=100.00, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    order_item3 = OrderItem(order_id=2, item_id=3, quantity=3, price=150.50, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    order_item4 = OrderItem(order_id=3, item_id=1, quantity=1, price=50.00, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    order_item5 = OrderItem(order_id=4, item_id=2, quantity=2, price=100.00, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

    db.session.add_all([order_item1, order_item2, order_item3, order_item4, order_item5])
    db.session.commit()

def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM order_items;")
        
    db.session.commit()
