from fastapi import APIRouter
from sqlalchemy import text

from app.shared_lib.prge_shared.db_conn import engine

router_dynamic_polygons = APIRouter()


@router_dynamic_polygons.get("/polygons_dynamic")
async def get_polygons():
    try:

        sql_query = text("""
            SELECT
                id,
                name,
                ST_X(geom) AS lon,
                ST_Y(geom) AS lat
            FROM polygons
        """)

        with engine.connect() as connection:
            result = connection.execute(sql_query)

            polygons = [dict(row._mapping) for row in result]

        return {
            "status": "success",
            "data": polygons
        }

    except Exception as e:
        return {"status": f"error {str(e)}"}