from app.models import db, To_Do, environment, SCHEMA
from sqlalchemy.sql import text

def seed_todo():
    belmont = To_Do(
        user_id=1,
        name="Belmont Park",
        cover_image="https://lp-cms-production.imgix.net/2022-03/United%20States%20San%20Diego%20Manuela%20Durson%20shutterstock_1401262877%20RFE.jpg",
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
        cover_image="https://images.radio.com/aiu-media/san-diego-zoo-front-entrance-54f01554-4619-43bc-bcdf-c0b20ec9e3e1.jpg",
        email="zoo@io.com",
        phone_number='012345678',
        address="2920 Zoo Drive",
        city='San Diego',
        state='California',
        category='To-Do'
    )
    millennium = To_Do(
        user_id=2,
        name='Millennium Park',
        cover_image='https://media.timeout.com/images/105650200/750/422/image.jpg',
        email='mill@io.com',
        phone_number='12345668',
        address='201 E. Randolph St',
        city='Chicago',
        state='IL',
        category='To-See'
    )
    vicayza = To_Do(
        user_id=1,
        name='Vizcaya Museum and Gardens',
        cover_image='https://digitalphotoacademy.com/wp-content/uploads/2016/10/Vizcaya-museum-wedding.jpg',
        email='vicayza@io.com',
        phone_number='619200000',
        address='3251 S Miami Ave',
        city='Miami',
        state='FL',
        category='To-Do'
    )
    peohes = To_Do(
        user_id=2,
        name='Peohes',
        cover_image='https://media-cdn.tripadvisor.com/media/photo-s/05/dc/1c/6f/peohe-s.jpg',
        email='peohes@io.com',
        phone_number='6194374474',
        address='1201 1st St',
        city='San Diego',
        state='CA',
        category='To-Eat'
    )


    db.session.add(zoo)
    db.session.add(belmont)
    db.session.add(millennium)
    db.session.add(vicayza)
    db.session.add(peohes)
    db.session.commit()

def undo_todo():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE `{SCHEMA}`.`to-do` RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM `to-do`"))
    db.session.commit()