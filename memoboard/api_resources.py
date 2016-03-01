from flask_restful import Resource
from memoboard.models import MemoList, MemoItem


class MemoListsResource(Resource):
    def get(self):
        return {'hello': 'world'}


class MemoListResource(Resource):
    def get(self, list_id):
        return {'hello': 'world', 'list_id': list_id}


class MemoItemResource(Resource):
    def get(self, item_id):
        return {'hello': 'world', 'item_id': item_id}