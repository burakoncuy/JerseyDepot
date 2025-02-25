# from app.models import db, environment, SCHEMA
# from app.models.review import Review
# from datetime import datetime
# from sqlalchemy.sql import text

# def seed_reviews():
#     review1 = Review(
#         user_id=1,
#         item_id=1,
#         rating=5,
#         comment="Amazing quality! The fabric is great and fits perfectly.",
#     )
#     review2 = Review(
#         user_id=2,
#         item_id=2,
#         rating=4,
#         comment="Good jersey, but a little bit big for me. Still looks great!",
#     )
#     review3 = Review(
#         user_id=3,
#         item_id=3,
#         rating=5,
#         comment="An incredible item! The autograph by Kobe Bryant is a treasure.",
#     )
#     review4 = Review(
#         user_id=4,
#         item_id=4,
#         rating=5,
#         comment="Such a rare item! It's awesome to own a signed baseball from Babe Ruth.",
#     )

#     db.session.add_all([review1, review2, review3, review4])
#     db.session.commit()

# def undo_reviews():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM reviews;")
        
#     db.session.commit()
