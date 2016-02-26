from flask import Response
from functools import wraps
import json


def jsonify(method):
    """
    Benchmark decorator, a quick and convenient way to time a function
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