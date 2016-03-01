from flask.ext.restless import url_for as api_url

from memoboard import db
from datetime import datetime


class MemoList(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<MemoList %d>' % self.id

    def uri(self):
        return api_url(MemoList, instid=self.id)


class MemoItem(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), index=True)
    list = db.relationship('MemoList', backref=db.backref('items'))

    def __repr__(self):
        return '<MemoItem %d>' % self.id

    def uri(self):
        return api_url(MemoItem, instid=self.id)
