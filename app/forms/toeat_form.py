from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, AnyOf

class ToEatForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    cover_image = StringField('cover_image', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email()])
    phone_number = StringField('phone_number', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    category = SelectField('category', choices=[
        ('To-Do', 'To-Do'),
        ('To-See', 'To-See'),
        ('To-Eat', 'To-Eat')
    ], validators=[DataRequired(), AnyOf(['To-Do', 'To-See', 'To-Eat'])])