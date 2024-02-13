from app.models import db, To_Do, environment, SCHEMA
from sqlalchemy.sql import text

def seed_todo():
    belmont = To_Do(
        user_id=1,
        name="Belmont Park",
        cover_image="https://lh3.googleusercontent.com/luSsjfSxq8W5GqNWGXlxWj1sQK0Rz4RruYRczXWzPb1CKyBTtH-ZiWLC69M0P6ynGThuulUlXmsOlkw_aGGZAF7MMxwsH0n1qLz32GKYow",
        email="belmont@io.com",
        phone_number='123456789',
        address='3146 Mission Blvd',
        city='San Diego',
        state='California',
        category='To-Do' 
    )
    zoo = To_Do(
        user_id=2,
        name='San Diego Zoo',
        cover_image="https://www.parkrangerjohn.com/wp-content/uploads/2022/03/Epic-Guide-to-Cabrillo-National-Monument-California.jpg",
        email="zoo@io.com",
        phone_number='012345678',
        address="2920 Zoo Drive",
        city='San Diego',
        state='California',
        category='To-Do'
    )

    db.session.add(zoo)
    db.session.add(belmont)
    db.session.commit()

def undo_todo():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.to-do RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM to-do"))