from fastapi import APIRouter
from sqlalchemy import text
from pydantic import BaseModel

from app.shared_lib.prge_shared.db_conn import engine

router_db_insert = APIRouter()


class UserData(BaseModel):
    name: str
    rank: str
    polygon: str


class PolygonData(BaseModel):
    name: str


@router_db_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:

        params = {
            "name": user.name,
            "rank": user.rank,
            "polygon": user.polygon
        }

        sql_query = text("""
            INSERT INTO users (name, rank, polygon)
            VALUES (:name, :rank, :polygon)
        """)

        with engine.connect() as connection:
            connection.execute(sql_query, params)
            connection.commit()

        return {
            "status": "success"
        }

    except Exception as e:
        return {
            "status": f"error {str(e)}"
        }


@router_db_insert.post("/insert_polygon")
async def insert_polygon(polygon: PolygonData):
    try:

        sql_query = text("""
            INSERT INTO polygons (name)
            VALUES (:name)
        """)

        with engine.connect() as connection:
            connection.execute(
                sql_query,
                {
                    "name": polygon.name
                }
            )

            connection.commit()

        return {
            "status": "success",
            "data_inserted": polygon.name
        }

    except Exception as e:
        return {
            "status": f"error {str(e)}"
        }


@router_db_insert.delete("/delete_user/{user_id}")
async def delete_user(user_id: int):
    try:

        sql_query = text("""
            DELETE FROM users
            WHERE id = :user_id
        """)

        with engine.connect() as connection:
            connection.execute(
                sql_query,
                {
                    "user_id": user_id
                }
            )

            connection.commit()

        return {
            "status": "success"
        }

    except Exception as e:
        return {
            "status": f"error {str(e)}"
        }

@router_db_insert.delete("/delete_polygon/{polygon_id}")
async def delete_polygon(polygon_id: int):
    try:

        sql_query = text("""
            DELETE FROM polygons
            WHERE id = :polygon_id
        """)

        with engine.connect() as connection:
            connection.execute(
                sql_query,
                {
                    "polygon_id": polygon_id
                }
            )

            connection.commit()

        return {
            "status": "success"
        }

    except Exception as e:
        return {
            "status": f"error {str(e)}"
        }
@router_db_insert.put("/update_user/{user_id}")
async def update_user(
        user_id: int,
        user: UserData
):
    try:

        sql_query = text("""
            UPDATE users
            SET
                name = :name,
                rank = :rank,
                polygon = :polygon
            WHERE id = :user_id
        """)

        with engine.connect() as connection:

            connection.execute(
                sql_query,
                {
                    "user_id": user_id,
                    "name": user.name,
                    "rank": user.rank,
                    "polygon": user.polygon
                }
            )

            connection.commit()

        return {
            "status": "success"
        }

    except Exception as e:

        return {
            "status": f"error {str(e)}"
        }