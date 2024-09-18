
import sys
import os
from dotenv import load_dotenv
import logging
curr_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(curr_dir)
sys.path.append(parent_dir)

from fastapi import FastAPI, status, Request
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware



from server.api import database

load_dotenv()

PORT: int = int(os.environ.get("DATABASE_PORT", 8000))


logger = logging.getLogger(__name__)

app = FastAPI(
    title = "API for  database operations",
    description = "This is a API for database operations",
    version = "0.1",
    openapi_tags= [
        {
            "name" : "database", 
            "description" : "Operations related to the database"
        }
    ],
    debug =True
)




app.add_middleware(
    CORSMiddleware,
    
    # TODO :update this to the endpoints calling this service
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"],
    
    
)

@app.get("/ready")
def ready():
    return {"status" : "ok"}

app.include_router(database.router)




# handle exceptions 
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content = jsonable_encoder({
            "status_code" : status.HTTP_422_UNPROCESSABLE_ENTITY,
            "message" : "Validation error: " + str(exc),
        })
    )
    
    
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content=jsonable_encoder({
            "status_code" : exc.status_code,
            "message" : str(exc.detail),
        })
    )

    

if __name__ == "__main__":
    import uvicorn
    print(f"Running database service on port {PORT}")
    
    
    uvicorn.run("main:app", host="localhost", port=PORT, reload=True)
    