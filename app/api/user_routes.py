from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, To_Do, Review, Favorite
from app.forms.favorite_form import FavoriteForm



user_routes = Blueprint('users', __name__)

@user_routes.route('/')
# @login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'Users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
# @login_required
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


# Get reviews by current user
@user_routes.route('/reviews')
def get_user_reviews():
    curr_user_id = current_user.id
    reviews = db.session.query(Review).filter(
        Review.user_id == curr_user_id).all()
    return {"My Reviews": [review.to_dict() for review in reviews]}

# Get favorites by user
@user_routes.route('/<int:id>/favorites')
def get_favorites(id):
    favorites = Favorite.query.filter(Favorite.user_id == id)
    return {'My To-Do List': [fav.to_dict() for fav in favorites]}

# Add Favorite 
@user_routes.route('/<int:id>/favorites', methods=['POST'])
def add_favorite(id):
    form = FavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newFav = Favorite(user_id=form['userId'].data,
                          toDo_id=form['todo_id'].data)
        db.session.add(newFav)
        db.session.commit()
        return newFav.to_dict()
    else:
        return{'Error'}


# Delete Favorite
@user_routes.route('/<int:id>/favorites/<int:fav_id>', methods=['DELETE'])
def delete_fav(id, fav_id):
    favorite = Favorite.query.get(fav_id)
    if (favorite):
        db.session.delete(favorite)
        db.session.commit()
        return {'Message': "Favorite successfuly removed"}
    else:
        return {'Message': 'Favorite does not exist'}