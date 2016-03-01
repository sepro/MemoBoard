from memoboard import db
from datetime import datetime
from flask import url_for


class MemoList(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<MemoList %d>' % self.id

    @property
    def items_uri(self):
        return url_for('api.list_items', list_id=self.id)

    @property
    def uri(self):
        return url_for('api.list', list_id=self.id)


class MemoItem(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), index=True)
    list = db.relationship('MemoList', backref=db.backref('items', cascade="all, delete-orphan"))

    def __repr__(self):
        return '<MemoItem %d>' % self.id

    @property
    def list_uri(self):
        return url_for('api.list', list_id=self.list_id)

    @property
    def uri(self):
        return url_for('api.list_item', list_id=self.list_id, item_id=self.id)
