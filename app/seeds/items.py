from app.models import db,environment, SCHEMA
from app.models.item import Item, CategoryType, ConditionType, SizeType, ItemStatusType
from datetime import datetime

def seed_items():
    item1 = Item(
        user_id=1,
        name="Real Madrid",
        description="2025 new season home jersey",
        price=140,
        category=CategoryType.SOCCER,
        condition=ConditionType.NEW,
        image_url="https://www.sportsdirect.com/images/products/36738701_l.jpg",
        size=SizeType.M,
        item_status=ItemStatusType.AVAILABLE,
    )

    item2 = Item(
        user_id=2,
        name="Philadelphia Eagles",
        description="Super Bowl Jersey",
        price=149.99,
        category=CategoryType.FOOTBALL,
        condition=ConditionType.USED,
        image_url="https://fanatics.frgimages.com/philadelphia-eagles/mens-nike-jalen-hurts-midnight-green-philadelphia-eagles-super-bowl-lix-game-player-jersey_ss5_p-202849307+pv-1+u-r3us083nsp2gzmqxlcoj+v-0ihsjezh6qqbpf27tqfo.jpg?_hv=2&w=900",
        size=SizeType.L,
        item_status=ItemStatusType.AVAILABLE,
    )

    item3 = Item(
        user_id=1,
        name="LA Lakers",
        description="Signed by Kobe Bryant",
        price=15000,
        category=CategoryType.BASKETBALL,
        condition=ConditionType.USED,
        image_url="https://i.ebayimg.com/images/g/OPcAAOSwrR5nGZ~g/s-l1600.webp",
        size=SizeType.XL,
        item_status=ItemStatusType.AVAILABLE,
    )

    item4 = Item(
        user_id=3,
        name="Babe Ruth Signed Baseball",
        description="A rare baseball jersey signed by Babe Ruth, authenticated with a certificate.",
        price=25000,
        category=CategoryType.BASEBALL,
        condition=ConditionType.USED,
        image_url="https://www.sportsintegrity.com/cdn/shop/files/babe-ruth-yankees-js-frame-laser_clipped_rev_1_1024x1024@2x.jpg?v=1729892081",
        size=SizeType.M,
        item_status=ItemStatusType.AVAILABLE,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )


    db.session.add_all([item1, item2, item3, item4])
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items;")
        
    db.session.commit()
