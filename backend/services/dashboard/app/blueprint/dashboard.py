

from flask import (
    abort, Blueprint, request, Response, make_response, jsonify
)
# from flask_jwt_extended import (
#     jwt_required, get_jwt_identity
# )
# from app.model import UserRepository, TokenRepository


bp = Blueprint('dashboard', __name__, url_prefix='/dashboard')


@bp.route('', methods=('GET',))
def health_check():
    
    # health check



    return make_response(jsonify({
        'code': '200',
        'data': 'ready'
    }), 200)


