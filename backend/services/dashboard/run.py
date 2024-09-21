

from app import create_app
from flask import Flask





if __name__ == '__main__':
    # dashboard service runnning
    app = create_app({})
    app.run()