from flask import request
from flask_restful import Resource

from memoboard.models import MemoList, MemoItem
from memoboard import db

from memoboard.api_schemas import ItemSchema, ListSchema

from memoboard.utils.mallowfy import mallowfy


class MemoListsResource(Resource):
    @mallowfy(ListSchema(many=True))
    def get(self):
        lists = MemoList.query.all()

        return lists

    @mallowfy(ListSchema())
    def post(self):
        new_list = MemoList(name=request.form['name'])

        db.session.add(new_list)
        db.session.commit()

        return new_list


class MemoListResource(Resource):
    @mallowfy(ListSchema())
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        return list

    def delete(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        db.session.delete(list)
        db.session.commit()

        return {}

    @mallowfy(ListSchema())
    def put(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        list.name = request.form['name']
        db.session.commit()

        return list


class MemoListItemsResource(Resource):
    @mallowfy(ItemSchema(many=True))
    def get(self, list_id):
        list = MemoList.query.get_or_404(list_id)

        return list.items

    @mallowfy(ItemSchema())
    def post(self, list_id):
        new_item = MemoItem(content=request.form['content'], list_id=list_id)

        db.session.add(new_item)
        db.session.commit()

        return new_item


class MemoListItemResource(Resource):
    @mallowfy(ItemSchema())
    def get(self, list_id, item_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first_or_404()

        return item

    def delete(self, list_id, item_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first_or_404()

        db.session.delete(item)
        db.session.commit()

        return {}

    @mallowfy(ItemSchema())
    def put(self, list_id, item_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first_or_404()

        if 'content' in request.form.keys():
            item.content = request.form['content']

        db.session.commit()

        return item
