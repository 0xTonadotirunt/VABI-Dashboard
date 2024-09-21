


import os

from flask import Flask


def create_app(test_config) :
    # #This function is responsible to create a Flask instance according
    # a previous setting passed from environment. In that process, it also
    # initialise the database source.



    app = Flask(__name__, instance_relative_config=True)

    load_config(app, test_config)

    # init_database(app)
    init_blueprints(app)

    return app


def load_config(app: Flask, test_config):
 

    if os.environ.get('FLASK_ENV') == 'Production' or test_config.get("FLASK_ENV") == 'Production':
        app.config.from_object('app.config.Production')

    elif test_config.get('TESTING'):
        app.config.from_mapping(test_config)

    else:
        app.config.from_object('app.config.Development')








def init_blueprints(app: Flask) :
    #Registes the blueprint to the application.




    # error Handlers
    from .blueprint import dashboard, default
    app.register_blueprint(dashboard.bp)
    app.register_blueprint(default.bp)






