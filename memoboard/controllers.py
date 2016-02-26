from flask import Blueprint, render_template, url_for
from memoboard.utils.jsonify import jsonify

from memoboard import db
from memoboard.models import MemoList, MemoItem

main = Blueprint('main', __name__)
api = Blueprint('api', __name__)


@main.route('/')
def index():
    return render_template('index.html')


@api.route('/lists/', methods=['GET'])
@jsonify
def get_lists():
    lists = MemoList.query.all()

    return [l.to_json() for l in lists]


@api.route('/lists/', methods=['POST'])
@jsonify
def create_list():
    new_list = MemoList('test')

    db.session.add(new_list)
    db.session.commit()

    return new_list.to_json()


@api.route('/lists/<int:list_id>', methods=['GET'])
@jsonify
def get_list(list_id):
    current_list = MemoList.query.get_or_404(list_id)

    return current_list.to_json()


@api.route('/lists/<int:list_id>/items/', methods=['GET'])
@jsonify
def get_list_items(list_id):
    current_list = MemoList.query.get_or_404(list_id)
    items = current_list.to_json()['items']

    return items


@api.route('/lists/<int:list_id>/items/', methods=['POST'])
@jsonify
def create_list_items(list_id):
    current_list = MemoList.query.get_or_404(list_id)

    new_item = current_list.add_item(MemoItem('test content'))

    return new_item.to_json()


@api.route('/items/<int:item_id>', methods=['GET'])
@jsonify
def get_item(item_id):
    current_item = MemoItem.query.get_or_404(item_id)

    return current_item.to_json()


@api.route('/items/<int:item_id>', methods=['DELETE'])
@jsonify
def delete_item(item_id):
    current_item = MemoItem.query.get_or_404(item_id)
    current_item.delete()

    return {'status': 'success'}
