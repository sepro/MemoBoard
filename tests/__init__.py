from memoboard import create_app, db

from flask import url_for
from flask.ext.testing import TestCase

import json


class MyTest(TestCase):

    def create_app(self):
        app = create_app('tests.config')

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
        response = self.client.get('/')
        self.assert_template_used('index.html')
        self.assert200(response)

    def test_api(self):
        # check if route returns code 200
        url = url_for('api.lists')
        response = self.client.get(url)
        self.assert200(response)

        response = self.client.post(url, data=dict(name="New List"), follow_redirects=True)
        self.assert200(response)
        data = json.loads(response.data.decode('utf-8'))

        url = url_for('api.list', list_id=1)
        response = self.client.put(url, data=dict(name="New List, New Name"), follow_redirects=True)
        self.assert200(response)
        data = json.loads(response.data.decode('utf-8'))