# from flask import Blueprint, jsonify, request
# from flask_login import login_required, current_user
# from app.models import db, To_See
# from app.forms.tosee_form import ToSeeForm

# tosee_routes = Blueprint('to-see', __name__)

# # Get all tosee's
# @tosee_routes.route('/')
# def get_tosee():
#     type = request.args.get('type')
#     city = request.args.get('city')

#     query = To_See.query

#     if type and city:
#         query = query.filter(To_See.category == type, To_See.city == city)
#     elif type:
#         query = query.filter(To_See.category == type)
#     elif city:
#         query = query.filter(To_See.city == city)
    
#     to_sees = [tosee.to_dict() for tosee in query.all()]

#     return jsonify({"To-See's": to_sees}), 200

# # Get tosee by id
# @tosee_routes.route('/<int:tosee_id>')
# def get_tosee_by_id(tosee_id):

#     tosee = To_See.query.get(tosee_id)

#     if tosee is None:
#         return jsonify({"Error": 'To-See not found'}), 404
    
#     return jsonify({"To-See": tosee.to_dict()}), 200

# # Create a To-See
# @tosee_routes.route('/', methods=['POST'])
# @login_required
# def create_tosee():
#     form = ToSeeForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         data = form.data
#         new_tosee = To_See(
#             user_id = current_user.id,
#             name = data['name'],
#             cover_image = data['cover_image'],
#             email = data['email'],
#             phone_number = data['phone_number'],
#             address = data['address'],
#             city = data['city'],
#             state = data['state'],
#             category = data['category'])
#         db.session.add(new_tosee)
#         db.session.commit()
#         return new_tosee.to_dict()
#     if form.errors:
#         errors = {}
#         for field_name, field_errors in form.errors.items():
#             errors[field_name] = field_errors[0]
#         return {'Errors': errors}

# # Edit a To-See
# @tosee_routes.route('/<int:tosee_id>', methods=['PUT'])
# @login_required
# def edit_tosee(tosee_id):

#     tosee = To_See.query.get(tosee_id)
#     user = current_user

#     if tosee is None:
#         return jsonify({"Error": "To-See not found"}), 404
    
#     if user.id is not tosee.user_id:
#          return jsonify({ 'Error': 'You are not authorized to edit this To-See'}), 400
    
#     form = ToSeeForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         form.populate_obj(tosee)
#         db.session.commit()
#         return tosee.to_dict()
    
#     if form.errors:
#         errors = {}
#         for field_name, field_errors in form.errors.items():
#             errors[field_name] = field_errors[0]
#         return {'Error': errors}

# # Delete a To-See
# @tosee_routes.route('/<int:tosee_id>', methods=['DELETE'])
# @login_required
# def delete_tosee(tosee_id):

#     tosee = To_See.query.get(tosee_id)
#     user = current_user

#     if tosee is None:
#         return jsonify({"Error": "To-See couldn't be found"}), 404
    
#     if user.id is not tosee.user_id:
#         return jsonify({ 'Error': 'You are not authorized to delete this To-See'}), 400
    
#     db.session.delete(tosee)
#     db.session.commit()
#     return{"Message": 'To-See successfully deleted'}


    

