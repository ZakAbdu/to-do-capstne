from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review, To_Do, To_Eat, To_See
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

# Get all reviews by to_do id
@review_routes.route('/to_do/reviews')
def get_todo_reviews(to_do_id):
    """
    Gets a list of the todo's reviews
    """
    if To_Do.query.get(to_do_id) is None:
        return jsonify({'Error': 'To-Do not found'}), 404
    
    reviews = [review.to_dict() for review in Review.query.filter_by(to_do_id=to_do_id).all()]

    return jsonify({"Reviews": reviews}), 200

# Get all reviews by to_see id
@review_routes.route('/to-see/reviews')
def get_tosee_reviews(to_see_id):
    """
    Gets a list of the tosee's reviews
    """
    if To_See.query.get(to_see_id) is None:
        return jsonify({"Error": 'To-See not found'}), 404
    
    reviews = [review.to_dict() for review in Review.query.filter_by(to_see_id=to_see_id).all()]

    return jsonify({"Reviews": reviews}), 200

# Get all reviews by to_eat id
@review_routes.route('/to-eat/reviews')
def get_toeat_reviews(to_eat_id):
    """
    Gets a list of the toeat's reviews
    """
    if To_Eat.query.get(to_eat_id) is None:
        return jsonify({"Error": 'To-Eat not found'}), 404
    
    reviews = [review.to_dict() for review in Review.query.filter_by(to_eat_id=to_eat_id).all()]
    
    return jsonify({"Reviews": reviews}), 200


# Create a TO-DO Review
@review_routes.route('/', methods=['POST'])
@login_required
def create_todo_review(to_do_id):
    """
    Creates a new review for the to-do
    """
    # Checks if todo's id is valid
    if To_Do.query.get(to_do_id) is None:
        return jsonify({"Error": "To-Do not found"}), 404
    
     # Checks if user already left a review for this to-do
    if Review.query.filter_by(to_do_id=to_do_id, user_id=current_user.id).all():
        return jsonify({"Error": 'User already has a review for this To-Do'}), 403
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_review = Review(user_id=current_user.id,
                            to_do_id=to_do_id,
                            rating=data['rating'],
                            comment=data['comment'],
                            review_image=data['review_image'])
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'Error': errors}

# Edit TO-DO Review
@review_routes.route('/<int:review_id>', methods=["PUT"])
@login_required
def edit_todo_reviews(to_do_id, review_id):
    """
    Edits a todo's review
    """
    if To_Do.query.get(to_do_id) is None:
        return jsonify({"Error": 'To-Do not found'}), 404
    
    review = Review.query.get(review_id)

    if current_user.id is not review.user_id:
        return jsonify({"Error": 'You are not authorized to edit this post'})
    
    form = ReviewForm(obj=review)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form.populate_obj(review)
        db.session.commit()
        return review.to_dict()
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'error': errors}
    
# Delete a To-Do Review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_todo_reviews(to_do_id, review_id):
    """
    Deletes a todo's Review
    """
    if To_Do.query.get(to_do_id) is None:
        return jsonify({"Error": 'To-Do not found'}), 404
    
    if Review.query.get(review_id) is None:
        return jsonify({"Error": 'Review not found'}), 404
    
    review = Review.query.get(review_id)

    if current_user.id is not review.user_id:
        return jsonify({"Error": 'You are not authorized to delete this review'})
    
    db.session.delete(review)
    db.session.commit()
    return {"Message": "Review successfully deleted"}

