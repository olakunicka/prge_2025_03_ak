from fastapi import APIRouter
from sqlalchemy import text

from app.shared_lib.prge_shared.db_conn import engine

router_dynamic_users_from_db = APIRouter()


@router_dynamic_users_from_db.get("/users_dynamic")
async def get_user():
    try:

        sql_query = text("""
            SELECT
                id,
                name,
                rank,
                polygon
            FROM users
        """)

        with engine.connect() as connection:
            result = connection.execute(sql_query)

            users = [dict(row._mapping) for row in result]

        return {
            "status": "success",
            "data": users
        }

    except Exception as e:
        return {
            "status": f"error {str(e)}"
        }


@router_dynamic_users_from_db.get("/soldiers_by_polygon/{polygon_name}")
async def get_soldiers_by_polygon(polygon_name: str):
    try:

        sql_query = text("""
            SELECT
                name,
                rank
            FROM users
            WHERE polygon = :polygon
        """)

        with engine.connect() as connection:

            result = connection.execute(
                sql_query,
                {
                    "polygon": polygon_name
                }
            )

            soldiers = [dict(row._mapping) for row in result]

        return {
            "status": "success",
            "data": soldiers
        }

    except Exception as e:
        return {
            "status": f"error {str(e)}"
        }