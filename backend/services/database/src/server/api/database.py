from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix = "/db",
    tags = ["db Objects"],
)

@router.get("/ready", summary="Check if the db is ready")
def get_db_ready():
    return {"ready": True}