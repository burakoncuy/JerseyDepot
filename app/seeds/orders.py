# from app.models import db, Order, OrderStatusType, environment, SCHEMA
# from datetime import datetime

# def seed_orders():
#     order1 = Order(user_id=1, total=200.00, order_status=OrderStatusType.PENDING, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     order2 = Order(user_id=2, total=150.50, order_status=OrderStatusType.COMPLETED, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     order3 = Order(user_id=3, total=300.75, order_status=OrderStatusType.SHIPPED, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
#     order4 = Order(user_id=1, total=50.00, order_status=OrderStatusType.CANCELED, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

#     db.session.add_all([order1, order2, order3, order4])
#     db.session.commit()

# def undo_orders():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM orders;")
        
#     db.session.commit()
