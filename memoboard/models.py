from memoboard import db
from datetime import datetime


class MemoList(db.Model):
    __tablename__ = 'lists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<MemoList %d>' % self.id

    @staticmethod
    def add(*args, **kwargs):
        new_list = MemoList(*args, **kwargs)

        db.session.add(new_list)
        db.session.commit()

        return new_list

    @staticmethod
    def delete(list_id):
        list = MemoList.query.get_or_404(list_id)

        db.session.delete(list)
        db.session.commit()


class MemoItem(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    created = db.Column(db.DateTime, default=datetime.utcnow)

    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), index=True)
    list = db.relationship('MemoList', backref=db.backref('items', cascade="all, delete-orphan"))

    def __repr__(self):
        return '<MemoItem %d>' % self.id

    @staticmethod
    def add(*args, **kwargs):
        new_item = MemoItem(*args, **kwargs)

        db.session.add(new_item)
        db.session.commit()

        return new_item

    @staticmethod
    def delete(item_id, list_id):
        item = MemoItem.query.filter_by(id=item_id, list_id=list_id).first_or_404()

        db.session.delete(item)
        db.session.commit()
