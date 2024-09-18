from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(
    prefix = "/dashboard",
    tags = ["Dashboard Objects"],
)

@router.get("/ready", summary="Check if the dashboard is ready")
def get_dashboard_ready():
    return {"ready": True}