from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, SubmitField
from wtforms.validators import DataRequired, NumberRange
from ..models.item import CategoryType, ConditionType, SizeType, ItemStatusType
from app.api.aws_helper import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired


class ItemForm(FlaskForm):
    # Fields for the Item model
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description')
    price = DecimalField('Price', validators=[DataRequired(), NumberRange(min=0)])
    
    # Dropdown for CategoryType enum
    category = SelectField(
        'Category',
        choices=[(category.value, category.value) for category in CategoryType],
        validators=[DataRequired()]
    )
    
    # Dropdown for ConditionType enum
    condition = SelectField(
        'Condition',
        choices=[(condition.value, condition.value) for condition in ConditionType],
        validators=[DataRequired()]
    )
    
    # Input for image URL
    # image_url = StringField('Image URL', validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])

    # Dropdown for SizeType enum
    size = SelectField(
        'Size',
        choices=[(size.value, size.value) for size in SizeType],
        validators=[DataRequired()]
    )
    
    # Dropdown for ItemStatusType enum
    item_status = SelectField(
        'Item Status',
        choices=[(status.value, status.value) for status in ItemStatusType],
        validators=[DataRequired()]
    )
    
    # Submit button
    submit = SubmitField('Submit')