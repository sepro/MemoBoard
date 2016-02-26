from flask import Blueprint, render_template, url_for
from memoboard.utils.jsonify import jsonify

from memoboard import db
from memoboard.models import MemoList

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
