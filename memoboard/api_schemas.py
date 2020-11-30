from memoboard import ma

from memoboard.models import MemoItem, MemoList


class ItemSchema(ma.SQLAlchemyAutoSchema):
    include_relationships = True

    class Meta:
        model = MemoItem

    uri = ma.URLFor('api.list_item', list_id='<list_id>', item_id='<id>')
    list_uri = ma.URLFor('api.list', list_id='<list_id>')

    added = ma.Method('get_added', dump_only=True)
    list = ma.Method('get_list', dump_only=True)

    @staticmethod
    def get_added(item):
        return str(item.created_humanized)

    @staticmethod
    def get_list(item):
        return item.list_id


class ListSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MemoList

    uri = ma.URLFor('api.list', list_id='<id>')
    items_uri = ma.URLFor('api.list_items', list_id='<id>')

    items = ma.Nested(ItemSchema, many=True)

    added = ma.Method('get_added', dump_only=True)

    @staticmethod
    def get_added(list):
        return str(list.created_humanized)
