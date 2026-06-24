import React, { useState, useEffect } from 'react';

function PolygonList() {

    const [polygons, setPolygons] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');

    const loadPolygons = () => {
        fetch('http://localhost:10000/app/polygons_dynamic')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setPolygons(res);
            });
    };

    useEffect(() => {
        loadPolygons();
    }, []);

    const deletePolygon = async (id) => {

        if (!window.confirm("Na pewno usunąć poligon?")) {
            return;
        }

        const response = await fetch(
            `http://localhost:10000/app/delete_polygon/${id}`,
            {
                method: 'DELETE'
            }
        );

        const result = await response.json();
        console.log(result);

        loadPolygons();
    };

    const updatePolygon = async (id) => {

        const response = await fetch(
            `http://localhost:10000/app/update_polygon/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editName
                })
            }
        );

        const result = await response.json();
        console.log(result);

        setEditId(null);
        setEditName('');

        loadPolygons();
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

                    {editId === polygon.id ? (
                        <>
                            <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />

                            <br /><br />

                            <button
                                onClick={() => updatePolygon(polygon.id)}
                            >
                                ZAPISZ
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>{polygon.name}</h3>

                            <button
                                onClick={() => deletePolygon(polygon.id)}
                            >
                                USUŃ
                            </button>

                            <button
                                onClick={() => {
                                    setEditId(polygon.id);
                                    setEditName(polygon.name);
                                }}
                                style={{ marginLeft: '10px' }}
                            >
                                EDYTUJ
                            </button>
                        </>
                    )}

                </div>

            ))}

        </div>
    );
}

export default PolygonList;