from flask import url_for
from memoboard import ma

from memoboard.models import MemoItem, MemoList


class ItemSchema(ma.ModelSchema):
    class Meta:
        model = MemoItem

    uri = ma.Method("get_uri", dump_only=True)
    list_uri = ma.Method("get_list_uri", dump_only=True)

    def get_uri(self, item):
        return url_for('api.list_item', list_id=item.list_id, item_id=item.id)

    def get_list_uri(self, item):
        return url_for('api.list', list_id=item.list_id)


class ListSchema(ma.ModelSchema):
    class Meta:
        model = MemoList

    uri = ma.Method("get_uri", dump_only=True)
    items_uri = ma.Method("get_items_uri", dump_only=True)

    items = ma.Nested(ItemSchema, many=True)

    def get_uri(self, list):
        return url_for('api.list', list_id=list.id)

    def get_items_uri(self, list):
        return url_for('api.list_items', list_id=list.id)


list_schema = ListSchema()
lists_schema = ListSchema(many=True)
item_schema = ItemSchema()
items_schema = ItemSchema(many=True)
