from fastapi import APIRouter
from sqlalchemy import text
from pydantic import BaseModel

from app.shared_lib.prge_shared.spatial import get_coordinates
from app.shared_lib.prge_shared.db_conn import engine

router_db_insert = APIRouter()


class UserData(BaseModel):
    name: str
    posts: int
    location: str


@router_db_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:

        params = {
            "name": user.name,
            "posts": user.posts,
            "location": user.location,
            "lat": get_coordinates(user.location)[0],
            "lng": get_coordinates(user.location)[1]
        }

        sql_query = text("""
                         insert into users (name, posts, location, geom)
                         values (:name, :posts, :location, 'SRID=4326;POINT(:lng :lat)');
                         """)

        with engine.connect() as connection:
            results = connection.execute(sql_query, params)
            connection.commit()
            print(results)

        return {"status": "success", "data_inserted": {user.name, user.posts, user.location}}


    except Exception as e:
        return {"status": f"error {str(e)}"}

class PolygonData(BaseModel):
    name: str

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