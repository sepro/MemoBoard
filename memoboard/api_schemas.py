from marshmallow import Schema, fields

class ItemSchema(Schema):
    id = fields.Int(dump_only=True)
    list_id = fields.Int()
    content = fields.Str()
    created = fields.DateTime(dump_only=True)
    uri = fields.Str(dump_only=True)
    list_uri = fields.Str(dump_only=True)


class ListSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    created = fields.DateTime(dump_only=True)
    uri = fields.Str(dump_only=True)
    items_uri = fields.Str(dump_only=True)

    items = fields.Nested(ItemSchema, many=True)


list_schema = ListSchema()
lists_schema = ListSchema(many=True)
item_schema = ItemSchema()
items_schema = ItemSchema(many=True)