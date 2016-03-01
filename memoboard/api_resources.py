from flask_restful import Resource
from memoboard.models import MemoList, MemoItem


class MemoListsResource(Resource):
    def get(self):
        lists = MemoList.query.all()

        return [l.to_json() for l in lists]


class MemoListResource(Resource):
    def get(self, list_id):
        return {'hello': 'world', 'list_id': list_id}


class MemoListItemsResource(Resource):
    def get(self, list_id):
        return {'hello': 'world', 'test': "test"}


class MemoListItemResource(Resource):
    def get(self, list_id, item_id):
        return {'hello': 'world', 'item_id': item_id}