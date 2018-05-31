from flask import request
from flask_restful import Resource

from memoboard.models import MemoList, MemoItem

from memoboard.api_schemas import ItemSchema, ListSchema

from memoboard.utils.mallowfy import mallowfy

from . import api


@api.resource('/lists', endpoint='lists')
class MemoListsResource(Resource):
    @mallowfy(ListSchema(many=True))
    def get(self):
        lists = MemoList.query.all()

        return lists

    @mallowfy(ListSchema())
    def post(self):
        new_list = MemoList.add(name=request.form['name'])

        return new_list


@api.resource('/lists/<int:list_id>', endpoint='list')
class MemoListResource(Resource):
    @mallowfy(ListSchema())
    def get(self, list_id):
        list = MemoList.query.get(list_id)

        return list

    def delete(self, list_id):
        MemoList.delete(list_id)

        return {}

    @mallowfy(ListSchema())
    def put(self, list_id):
        if 'name' in request.form.keys():
            list = MemoList.update(list_id, request.form['name'])
            return list
        else:
            return None


@api.resource('/lists/<int:list_id>/items', endpoint='list_items')
class MemoListItemsResource(Resource):
    @mallowfy(ItemSchema(many=True))
    def get(self, list_id):
        list = MemoList.query.get(list_id)

        return list.items

    @mallowfy(ItemSchema())
    def post(self, list_id):
        new_item = MemoItem.add(content=request.form['content'], list_id=list_id)

        return new_item


@api.resource('/lists/<int:list_id>/items/<int:item_id>', endpoint='list_item')
class MemoListItemResource(Resource):
    @mallowfy(ItemSchema())
    def get(self, list_id, item_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first()

        return item

    def delete(self, list_id, item_id):
        MemoItem.delete(item_id, list_id)

        return {}

    @mallowfy(ItemSchema())
    def put(self, list_id, item_id):

        if 'content' in request.form.keys():
            item = MemoItem.update(item_id, list_id, request.form['content'])
            return item
        else:
            return None

