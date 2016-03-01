from flask_restful import Resource
from memoboard.models import MemoList, MemoItem


class MemoListResource(Resource):
    def get(self):
        return {'hello': 'world'}

    def get_list(self, list_id):
        return {'hello': 'world', 'list_id': list_id}
