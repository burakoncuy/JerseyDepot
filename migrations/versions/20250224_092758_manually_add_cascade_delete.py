"""Manually add cascade delete

Revision ID: 63dfe92b03aa
Revises: d91436518d97
Create Date: 2025-02-24 09:27:58.467556

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '63dfe92b03aa'
down_revision = 'd91436518d97'
branch_labels = None
depends_on = None


def upgrade():
    # Drop old foreign key constraints
    op.drop_constraint('favorites_item_id_fkey', 'favorites', type_='foreignkey')
    op.drop_constraint('reviews_item_id_fkey', 'reviews', type_='foreignkey')
    op.drop_constraint('order_items_item_id_fkey', 'order_items', type_='foreignkey')
    op.drop_constraint('carts_item_id_fkey', 'carts', type_='foreignkey')

    # Create new foreign key constraints with ON DELETE CASCADE
    op.create_foreign_key(None, 'favorites', 'items', ['item_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'reviews', 'items', ['item_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'order_items', 'items', ['item_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'carts', 'items', ['item_id'], ['id'], ondelete='CASCADE')


def downgrade():
    # Drop the new constraints
    op.drop_constraint(None, 'favorites', type_='foreignkey')
    op.drop_constraint(None, 'reviews', type_='foreignkey')
    op.drop_constraint(None, 'order_items', type_='foreignkey')
    op.drop_constraint(None, 'carts', type_='foreignkey')

    # Recreate old constraints without CASCADE
    op.create_foreign_key('favorites_item_id_fkey', 'favorites', 'items', ['item_id'], ['id'])
    op.create_foreign_key('reviews_item_id_fkey', 'reviews', 'items', ['item_id'], ['id'])
    op.create_foreign_key('order_items_item_id_fkey', 'order_items', 'items', ['item_id'], ['id'])
    op.create_foreign_key('carts_item_id_fkey', 'carts', 'items', ['item_id'], ['id'])
