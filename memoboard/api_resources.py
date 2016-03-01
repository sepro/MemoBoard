from flask import request
from flask_restful import Resource
from memoboard.models import MemoList, MemoItem
from memoboard import db


class MemoListsResource(Resource):
    def get(self):
        lists = MemoList.query.all()

        return [l.to_json() for l in lists]

    def post(self):
        new_list = MemoList(name=request.form['name'])

        db.session.add(new_list)
        db.session.commit()

        return new_list.to_json()


class MemoListResource(Resource):
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        return list.to_json()


class MemoListItemsResource(Resource):
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        return list.items_to_json

    def post(self, list_id):
        new_item = MemoItem(content=request.form['content'], list_id=list_id)

        db.session.add(new_item)
        db.session.commit()

        return new_item.to_json()


class MemoListItemResource(Resource):
    def get(self, list_id, item_id):
        item = MemoItem.query.filter_by(list_id=list_id).filter_by(id=item_id).first_or_404()
        return item.to_json()
