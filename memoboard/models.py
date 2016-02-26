from flask import url_for

from memoboard import db
from datetime import datetime


class MemoList(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    items = db.relationship('MemoItem', backref=db.backref('list', lazy='joined'), lazy='dynamic')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<MemoList %d>' % self.id

    def to_json(self):
        json_out = {'id': self.id,
                    'name': self.name,
                    'created': self.created.isoformat(),
                    'items': [i.to_json() for i in self.items],
                    'uri': url_for('api.get_list', list_id=self.id)}

        return json_out


class MemoItem(db.Model):
    __tablename__ = 'list_items'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), index=True)

    def __init__(self, content):
        self.content = content

    def __repr__(self):
        return '<MemoItem %d>' % self.id

    def to_json(self):
        json_out = {'id': self.id,
                    'content': self.content,
                    'created': self.created.isoformat(),
                    'list_id': self.list_id,
                    'list_uri': url_for('api.get_list', list_id=self.id)}

        return json_out

