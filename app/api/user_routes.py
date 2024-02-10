from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, User, To_Do, To_See, To_Eat, Review


user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'Users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if user is None:
        return jsonify({'Error': "User couldn't be found"})
    return user.to_dict()

# Get to-do's by current user
@user_routes.route('/to-do')
def get_user_todo():
    curr_user_id = current_user.id
    to_dos = db.session.query(To_Do).filter(
        To_Do.user_id == curr_user_id).all()
    return {"To-Do's": [to_do.to_dict() for to_do in to_dos]}

# Get to-see's by current user
@user_routes.route('/to-see')
def get_user_tosee():
    curr_user_id = current_user.id
    to_sees = db.session.query(To_See).filter(
        To_See.user_id == curr_user_id).all()
    return {"To-See's": [to_see.to_dict() for to_see in to_sees]}

# Get to-eat's by current user
@user_routes.route('/to-eat')
def get_user_toeat():
    curr_user_id = current_user.id
    to_eats = db.session.query(To_Eat).filter(
        To_Eat.user_id == curr_user_id).all()
    return {"To-Eat's": [to_eat.to_dict() for to_eat in to_eats]}


# Get reviews by current user
@user_routes.route('/reviews')
def get_user_reviews():
    curr_user_id = current_user.id
    reviews = db.session.query(Review).filter(
        Review.user_id == curr_user_id).all()
    return {"My Reviews": [review.to_dict() for review in reviews]}