from memoboard import create_app, db

from flask import url_for
from flask_testing import TestCase

import json
import config


class MyTest(TestCase):
    def create_app(self):
        app = create_app("tests.config")

        return app

    def setUp(self):
        """
        Creates a database and fills it with sufficient dummy data to run the tests.
        """
        db.create_all()

    def tearDown(self):
        """
        Removes test database again, so the next test can start with a clean slate
        """
        db.session.remove()
        db.drop_all()

    def test_main(self):
        # check if route returns code 200
        response = self.client.get("/")
        self.assert_template_used("index.html")
        self.assert200(response)

    def test_api(self):
        from memoboard.models import MemoList, MemoItem

        required_fields_list = [
            "name",
            "id",
            "created",
            "items",
            "items_uri",
            "uri",
            "collapsed",
        ]
        required_fields_item = ["content", "created", "id", "list", "list_uri", "uri"]
        url = url_for("api.lists")

        # Test creating a new list
        response = self.client.post(
            url, data=dict(name="New List"), follow_redirects=True
        )
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))

        self.assertTrue(all([f in data.keys() for f in required_fields_list]))

        list_url = url_for("api.list", list_id=data["id"])

        # Test getting existing list
        response = self.client.get(list_url, follow_redirects=True)
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))

        self.assertTrue(all([f in data.keys() for f in required_fields_list]))

        # Test if non-existant list are handled
        invalid_list_url = url_for("api.list", list_id=666)
        response = self.client.get(invalid_list_url, follow_redirects=True)
        self.assert404(response)
        data = json.loads(response.data.decode("utf-8"))
        self.assertTrue("error" in data.keys())

        # Test updating existing list
        response = self.client.put(
            list_url,
            data=dict(name="New List, New Name", collapsed=0),
            follow_redirects=True,
        )
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))

        self.assertTrue(all([f in data.keys() for f in required_fields_list]))

        # Test update with improper information (should return 400)
        response = self.client.put(list_url, data=dict(), follow_redirects=True)
        self.assert404(response)
        faulty_data = json.loads(response.data.decode("utf-8"))
        self.assertTrue("error" in faulty_data.keys())

        # Test creating an item
        items_url = data["items_uri"]
        response = self.client.post(
            items_url, data=dict(content="New Item"), follow_redirects=True
        )
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))

        self.assertTrue(all([f in data.keys() for f in required_fields_item]))

        # Test getting an item
        item_url = data["uri"]
        response = self.client.get(item_url, follow_redirects=True)
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))

        self.assertTrue(all([f in data.keys() for f in required_fields_item]))

        # Test updating an item
        response = self.client.put(
            item_url, data=dict(content="New Item, New Name"), follow_redirects=True
        )
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))

        self.assertTrue(all([f in data.keys() for f in required_fields_item]))

        # Test updating an item without new content
        response = self.client.put(item_url, data=dict(), follow_redirects=True)
        self.assert404(response)
        faulty_data = json.loads(response.data.decode("utf-8"))
        self.assertTrue("error" in faulty_data.keys())

        # Test if non-existing item is handled
        invalid_item_url = url_for("api.list_item", list_id=1, item_id=666)
        response = self.client.get(invalid_item_url, follow_redirects=True)
        self.assert404(response)
        data = json.loads(response.data.decode("utf-8"))
        self.assertTrue("error" in data.keys())

        # Test getting all list items
        response = self.client.get(items_url, follow_redirects=True)
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))
        for d in data:
            self.assertTrue(all([f in d.keys() for f in required_fields_item]))

        # Test getting all lists
        response = self.client.get(url)
        self.assert200(response)
        data = json.loads(response.data.decode("utf-8"))
        for d in data:
            self.assertTrue(all([f in d.keys() for f in required_fields_list]))

        # Test __repr__ on model class
        first_list = MemoList.query.first()
        first_item = MemoItem.query.first()
        self.assertTrue(first_list.__repr__() == "<MemoList %d>" % first_list.id)
        self.assertTrue(first_item.__repr__() == "<MemoItem %d>" % first_item.id)

        # Test removing an item
        response = self.client.delete(item_url, follow_redirects=True)
        self.assert200(response)

        # Test removing a list
        response = self.client.delete(list_url, follow_redirects=True)
        self.assert200(response)

    def test_config(self):
        config_items = [
            config.basedir,
            config.DEBUG,
            config.TESTING,
            config.SECRET_KEY,
            config.DEBUG_TB_INTERCEPT_REDIRECTS,
            config.SQLALCHEMY_DATABASE_URI,
            config.SQLALCHEMY_ECHO,
            config.SQLALCHEMY_MIGRATE_REPO,
            config.SQLALCHEMY_TRACK_MODIFICATIONS,
            config.MINIFY_HTML,
        ]

        self.assertTrue(all([i is not None for i in config_items]))
