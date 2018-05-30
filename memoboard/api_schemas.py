from flask import url_for
from memoboard import ma

from memoboard.models import MemoItem, MemoList


class ItemSchema(ma.ModelSchema):
    class Meta:
        model = MemoItem

    uri = ma.URLFor('api.list_item', list_id='<list_id>', item_id='<id>')
    list_uri = ma.URLFor('api.list', list_id='<list_id>')

    added = ma.Method('get_added', dump_only=True)

    def get_added(self, item):
        return str(item.created_humanized)


class ListSchema(ma.ModelSchema):
    class Meta:
        model = MemoList

    uri = ma.URLFor('api.list', list_id='<id>')
    items_uri = ma.URLFor('api.list_items', list_id='<id>')

    items = ma.Nested(ItemSchema, many=True)

    added = ma.Method('get_added', dump_only=True)

    def get_added(self, list):
        return str(list.created_humanized)
