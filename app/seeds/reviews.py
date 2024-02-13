from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        user_id=1,
        to_do_id=1,
        to_see_id=None,
        to_eat_id=None,
        rating=5,
        comment='Had the best time ever at Belmont!!',
        review_image='https://www.halfmooninn.com/blog/wp-content/uploads/2022/07/BMIJulyBlogHeader2-960x430.jpg'
    )
    review2 = Review(
        user_id=2,
        to_do_id=None,
        to_see_id=1,
        to_eat_id=None,
        rating=5,
        comment='Best sunset ever!!',
        review_image='https://www.halfmooninn.com/blog/wp-content/uploads/2022/07/BMIJulyBlogHeader2-960x430.jpg'
    )
    review3 = Review(
        user_id=1,
        to_do_id=None,
        to_see_id=None,
        to_eat_id=1,
        rating=4,
        comment='Can never go wrong with the California burrito!',
        review_image='https://www.halfmooninn.com/blog/wp-content/uploads/2022/07/BMIJulyBlogHeader2-960x430.jpg'
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))