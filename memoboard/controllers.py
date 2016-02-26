from flask import Blueprint, render_template, url_for
from memoboard.utils.jsonify import jsonify

from memoboard.models import MemoList

main = Blueprint('main', __name__)
api = Blueprint('api', __name__)


@main.route('/')
def index():
    return render_template('index.html')


@api.route('/lists')
def api_lists():
    lists = MemoList.query.all()
    return "test"


@api.route('/lists/<int:list_id>')
def api_lists_get(list_id):
    lists = MemoList.query.get_or_404(list_id)
    return "test"