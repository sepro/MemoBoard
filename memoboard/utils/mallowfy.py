from functools import wraps


def mallowfy(s):
    """
    Applies desired marshmallow serializer on methods output
    :param s: serializer scheme to apply
    :return: decorated function
    """
    def mallowfy_decorator(method):
        """
        applies s (marshmallow serializer) onto output of method

        :param method: function from which the output is serialized
        :return:
        """
        @wraps(method)
        def mallowfied(*args, **kw):
            result = s.dump(method(*args, **kw))
            return result.data

        return mallowfied
    return mallowfy_decorator
