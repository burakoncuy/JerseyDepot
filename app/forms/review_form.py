from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    # Fields for the Review model
    rating = IntegerField(
        'Rating',
        validators=[
            DataRequired(),
            NumberRange(min=1, max=5, message="Rating must be between 1 and 5.")
        ]
    )
    comment = TextAreaField('Comment', validators=[DataRequired()])
    
    # Submit button
    submit = SubmitField('Submit')