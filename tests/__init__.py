from memoboard import create_app

from flask.ext.testing import TestCase


class MyTest(TestCase):

    def create_app(self):
        app = create_app('tests.config')

        return app

    def test_main(self):
        # check if route returns code 200
        response = self.client.get('/')
        self.assert_template_used('index.html')
        self.assert200(response)