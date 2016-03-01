from flask import request
from flask_restful import Resource

from memoboard.models import MemoList, MemoItem
from memoboard import db

from memoboard.api_schemas import item_schema, items_schema, list_schema, lists_schema


class MemoListsResource(Resource):
    def get(self):
        lists = MemoList.query.all()

        result = lists_schema.dump(lists)

        return result.data

    def post(self):
        new_list = MemoList(name=request.form['name'])

        db.session.add(new_list)
        db.session.commit()

        result = list_schema.dump(new_list)
        return result.data


class MemoListResource(Resource):
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        result = list_schema.dump(list)

        return result.data

    def delete(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        db.session.delete(list)
        db.session.commit()

        return {}

    def put(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        list.name = request.form['name']
        db.session.commit()

        result = list_schema.dump(list)

        return result.data


class MemoListItemsResource(Resource):
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        result = items_schema.dump(list.items)
        return result.data

    def post(self, list_id):
        new_item = MemoItem(content=request.form['content'], list_id=list_id)

        db.session.add(new_item)
        db.session.commit()

        result = item_schema.dump(new_item)
        return result.data


class MemoListItemResource(Resource):
    def get(self, list_id, item_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first_or_404()
        result = item_schema.dump(item)
        return result.data

    def delete(self, list_id, item_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first_or_404()

        db.session.delete(item)
        db.session.commit()

        return {}

    def put(self, list_id, item_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first_or_404()

        if 'content' in request.form.keys():
            item.content = request.form['content']

        db.session.commit()

        result = item_schema.dump(item)
        return result.data
