from flask import Response
from functools import wraps
import json


def jsonify(method):
    """
    Export dict or list as jsonified response
    :param method: function it wraps
    :return: decorated function
    """
    @wraps(method)
    def jsonified(*args, **kw):
        result = method(*args, **kw)
        return Response(json.dumps(result,
                                   sort_keys=True,
                                   indent=4),
                        mimetype='application/json')

    return jsonified