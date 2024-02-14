# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import db, To_Eat
# from app.forms.toeat_form import ToEatForm

# toeat_routes = Blueprint('to-eat', __name__)

# # Get all toeat's
# @toeat_routes.route('/')
# def get_toeat():
#     type = request.args.get('type')
#     city = request.args.get('city')

#     query = To_Eat.query

#     if type and city:
#         query = query.filter(To_Eat.category == type, To_Eat.city == city)
#     elif type:
#         query = query.filter(To_Eat.category == type)
#     elif city:
#         query = query.filter(To_Eat.city == city)
    
#     to_eats = [toeat.to_dict() for toeat in query.all()]

#     return jsonify({"To-Eat's": to_eats}), 200

# # Get toeat by id
# @toeat_routes.route('/<int:toeat_id>')
# def get_toeat_by_id(toeat_id):

#     toeat = To_Eat.query.get(toeat_id)

#     if toeat is None:
#         return jsonify({"Error": 'To-Eat not found'}), 404
    
#     return jsonify({"To-Eat": toeat.to_dict()}), 200

# # Create a toeat
# @toeat_routes.route('/', methods=['POST'])
# @login_required
# def create_toeat():
#     form = ToEatForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         data = form.data
#         new_toeat = To_Eat(
#             user_id = current_user.id,
#             name = data['name'],
#             cover_image = data['cover_image'],
#             email = data['email'],
#             phone_number = data['phone_number'],
#             address = data['address'],
#             city = data['city'],
#             state = data['state'],
#             category = data['category'])
#         db.session.add(new_toeat)
#         db.session.commit()
#         return new_toeat.to_dict()
#     if form.errors:
#         errors = {}
#         for field_name, field_errors in form.errors.items():
#             errors[field_name] = field_errors[0]
#         return {'Errors': errors}

# # Edit a toeat
# @toeat_routes.route('/<int:toeat_id>', methods=['PUT'])
# @login_required
# def edit_toeat(toeat_id):

#     toeat =To_Eat.query.get(toeat_id)
#     user = current_user

#     if toeat is None:
#         return jsonify({"Error": 'To-Eat not found'}, 404)
    
#     if user.id is not toeat.user_id:
#         return jsonify({"Error": 'You are not authorized to edit this To-Eat'}), 400
    
#     form = ToEatForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         form.populate_obj(toeat)
#         db.session.commit()
#         return toeat.to_dict()
    
#     if form.errors:
#         errors = {}
#         for field_name, field_errors in form.errors.items():
#             errors[field_name] = field_errors[0]
#         return {'Error': errors}

# # Delete a To-Eat
# @toeat_routes.route('/<int:toeat_id>', methods=['DELETE'])
# @login_required
# def delete_toeat(toeat_id):
    
#     toeat = To_Eat.query.get(toeat_id)
#     user = current_user

#     if toeat is None:
#         return jsonify({"Error": "To-Eat couldn't be found"}), 404
    
#     if user.id is not toeat.user_id:
#         return jsonify({ 'Error': 'You are not authorized to delete this To-Eat'}), 400
    
#     db.session.delete(toeat)
#     db.session.commit()
#     return {'Message': 'To-Eat successfully deleted'}

    