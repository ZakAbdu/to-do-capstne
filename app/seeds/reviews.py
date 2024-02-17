from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=1,
        todo_id=2,
        rating=5,
        comment='Had the best time ever at Belmont!!',
        review_image='https://www.halfmooninn.com/blog/wp-content/uploads/2022/07/BMIJulyBlogHeader2-960x430.jpg'
    )
    review2 = Review(
        user_id=2,
        todo_id=1,
        rating=5,
        comment='Lions was dopeee'
    )
    review3 = Review(
        user_id=1,
        todo_id=3,
        rating=4,
        comment='Can never go wrong with the California burrito!',
        review_image='https://www.halfmooninn.com/blog/wp-content/uploads/2022/07/BMIJulyBlogHeader2-960x430.jpg'
    )
    review4 = Review(
        user_id=1,
        todo_id=4,
        rating='2',
        comment='Trashhhh'
    )
    review5 = Review(
        user_id=2,
        todo_id=5,
        rating='5',
        comment='Amazinggg'
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        