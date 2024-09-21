
from flask import (
    abort, Blueprint, request, Response, make_response, jsonify
)



bp = Blueprint('default', __name__, url_prefix='/')


@bp.route('', methods=('GET',))
def health_check():
    
    # health check



    return "application ready"


