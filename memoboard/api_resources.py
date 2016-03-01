from flask_restful import Resource
from memoboard.models import MemoList, MemoItem


class MemoListsResource(Resource):
    def get(self):
        lists = MemoList.query.all()

        return [l.to_json() for l in lists]


class MemoListResource(Resource):
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        return list.to_json()


class MemoListItemsResource(Resource):
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        return list.items_to_json


class MemoListItemResource(Resource):
    def get(self, list_id, item_id):
        item = MemoItem.query.filter_by(list_id=list_id).filter_by(id=item_id).first_or_404()
        return item.to_json()
