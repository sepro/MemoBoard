#!/usr/bin/env python3
from memoboard import create_app

app = create_app('config')
app.run()
