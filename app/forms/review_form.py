from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, ValidationError

def validate_rating(form, field):
    rating = field.data
    if rating <= 0 or rating > 5:
        raise ValidationError('Rating must be an integer between 1 to 5')

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired(), validate_rating])
    comment = TextAreaField('comment', validators=[DataRequired()])
    review_image = StringField('review_image')