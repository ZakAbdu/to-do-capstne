from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, To_Do
from app.forms.todo_form import ToDoForm

todo_routes = Blueprint('to-do', __name__)

# Get all todo's
@todo_routes.route('/')
def get_todo():
    type = request.args.get('type')
    city = request.args.get('city')

    query = To_Do.query

    if type and city:
        query = query.filter(To_Do.category == type, To_Do.city == city)
    elif type:
        query = query.filter(To_Do.category == type)
    elif city:
        query = query.filter(To_Do.city == city)
    
    to_dos = [todo.to_dict() for todo in query.all()]

    return jsonify({'To-Dos': to_dos}), 200


# Get todo by id
@todo_routes.route('/<int:todo_id>')
def get_todo_by_id(todo_id):

    todo = To_Do.query.get(todo_id)

    if todo is None:
        return jsonify({"Error": 'To-Do not found'}), 404
    
    return jsonify({"To-Do": todo.to_dict()}), 200


# Create a todo
@todo_routes.route('/', methods=['POST'])
@login_required
def create_todo():
    form = ToDoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_todo = To_Do(
            user_id = current_user.id,
            name = data['name'],
            cover_image = data['cover_image'],
            email = data['email'],
            phone_number = data['phone_number'],
            address = data['address'],
            city = data['city'],
            state = data['state'],
            category = data['category'])
        db.session.add(new_todo)
        db.session.commit()
        return new_todo.to_dict()
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'Errors': errors}

# Edit a todo
@todo_routes.route('/<int:todo_id>', methods=['PUT'])
@login_required
def edit_todo(todo_id):

    todo = To_Do.query.get(todo_id)
    user = current_user

    if todo is None:
        return jsonify({"Error": "To-Do not found"}), 404
    
    if user.id is not todo.user_id:
         return jsonify({ 'Error': 'You are not authorized to edit this To-Do'}), 400
    
    form = ToDoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(todo)
        db.session.commit()
        return todo.to_dict()
    
    if form.errors:
        errors = {}
        for field_name, field_errors in form.errors.items():
            errors[field_name] = field_errors[0]
        return {'Error': errors}

# Delete a To-Do
@todo_routes.route('/<int:todo_id>', methods=['DELETE'])
@login_required
def delete_todo(todo_id):

    todo = To_Do.query.get(todo_id)
    user = current_user

    if todo is None:
        return jsonify({"Error": "To-Do couldn't be found"}), 404
    
    if user.id is not todo.user_id:
        return jsonify({ 'Error': 'You are not authorized to delete this To-Do'}), 400
    
    db.session.delete(todo)
    db.session.commit()
    return {'Message': 'To-Do successfully deleted'}