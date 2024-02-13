from app.models import db, To_See, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tosee():
    sunset = To_See(
        user_id=1,
        name="Sunset Cliffs",
        cover_image="https://www.gosandiego.com/wp-content/uploads/2021/09/Sunset-Cliffs-San-Diego-AdobeStock_284221491.jpeg",
        email="sunset@io.com",
        phone_number='123456789',
        address='1253 Sunset Cliffs Blvd',
        city='San Diego',
        state='California',
        category='To-See' 
    )
    cabrillo = To_See(
        user_id=2,
        name='Cabrillo National Monument',
        cover_image="https://www.parkrangerjohn.com/wp-content/uploads/2022/03/Epic-Guide-to-Cabrillo-National-Monument-California.jpg",
        email="cabrillo@io.com",
        phone_number='012345678',
        address="1800 Cabrillo Memorial Dr",
        city='San Diego',
        state='California',
        category='To-See'
    )

    db.session.add(sunset)
    db.session.add(cabrillo)
    db.session.commit()

def undo_tosee():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE `{SCHEMA}`.`to-see` RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM `to-see`"))
    db.session.commit()