from app.models import db, Favorite, environment, SCHEMA
from datetime import datetime

def seed_favorites():
    favorite1 = Favorite(user_id=1, item_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    favorite2 = Favorite(user_id=2, item_id=2, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    favorite3 = Favorite(user_id=3, item_id=1, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    favorite4 = Favorite(user_id=1, item_id=3, created_at=datetime.utcnow(), updated_at=datetime.utcnow())

    db.session.add_all([favorite1, favorite2, favorite3, favorite4])
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM favorites;")
        
    db.session.commit()
