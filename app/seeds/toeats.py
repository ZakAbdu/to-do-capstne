from app.models import db, To_Eat, environment, SCHEMA
from sqlalchemy.sql import text

def seed_toeat():
    lucha = To_Eat(
        user_id=1,
        name="Lucha Libre Taco Shop",
        cover_image="https://lh3.googleusercontent.com/luSsjfSxq8W5GqNWGXlxWj1sQK0Rz4RruYRczXWzPb1CKyBTtH-ZiWLC69M0P6ynGThuulUlXmsOlkw_aGGZAF7MMxwsH0n1qLz32GKYow",
        email="lucha@io.com",
        phone_number='123456789',
        address='1810 W Washington St',
        city='San Diego',
        state='California',
        category='To-Eat' 
    )
    corvette = To_Eat(
        user_id=2,
        name='Corvette Diner',
        cover_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vCxhxQHnP90X1no8aQdkEHBZYcATFN7wVMQvJKCEow&s",
        email="corvette@io.com",
        phone_number='012345678',
        address="2965 Historic Decatur Rd",
        city='San Diego',
        state='California',
        category='To-Eat'
    )

    db.session.add(lucha)
    db.session.add(corvette)
    db.session.commit()

def undo_toeat():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.to-eat RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM to-eat"))