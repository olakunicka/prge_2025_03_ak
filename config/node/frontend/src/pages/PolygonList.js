import React, {useState, useEffect} from 'react';

function PolygonList() {

    const [polygons, setPolygons] = useState([]);

    useEffect(() => {

        loadPolygons();

    }, []);

    const loadPolygons = () => {

        fetch('http://localhost:10000/app/polygons_dynamic')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setPolygons(res);
            });
    };

    const deletePolygon = async (polygonId) => {

        try {

            await fetch(
                `http://localhost:10000/app/delete_polygon/${polygonId}`,
                {
                    method: 'DELETE'
                }
            );

            loadPolygons();

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="PolygonList">

            <h1>Lista poligonów</h1>

            {polygons.data?.map(polygon => (

                <div
                    key={polygon.id}
                    style={{
                        border: '1px solid black',
                        padding: '10px',
                        margin: '10px'
                    }}
                >
                    <h3>{polygon.name}</h3>

                    <button
                        onClick={() =>
                            deletePolygon(polygon.id)
                        }
                    >
                        USUŃ
                    </button>

                </div>

            ))}

        </div>
    );
}

export default PolygonList;