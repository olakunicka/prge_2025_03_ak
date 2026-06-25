import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField
} from "@mui/material";

import "./PolygonList.css";

function PolygonList() {

    const [polygons, setPolygons] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

    const loadPolygons = () => {

        fetch("http://localhost:10000/app/polygons_dynamic")
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

        await fetch(
            `http://localhost:10000/app/delete_polygon/${id}`,
            {
                method: "DELETE"
            }
        );

        loadPolygons();

    };

    const updatePolygon = async (id) => {

        await fetch(
            `http://localhost:10000/app/update_polygon/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: editName
                })

            }
        );

        setEditId(null);
        setEditName("");

        loadPolygons();

    };

    return (

        <div className="polygonList">

            <div className="polygonList__header">

                <h1>LISTA POLIGONÓW</h1>

                <p>Zarządzaj dodanymi poligonami.</p>

            </div>

            <div className="polygonList__grid">

                {polygons.data?.map((polygon) => (

                    <Card
                        key={polygon.id}
                        className="polygonCard"
                    >

                        <CardContent>

                            {editId === polygon.id ? (

                                <>

                                    <TextField

                                        fullWidth

                                        value={editName}

                                        onChange={(e) =>
                                            setEditName(e.target.value)
                                        }

                                    />

                                    <div className="polygonCard__buttons">

                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() =>
                                                updatePolygon(polygon.id)
                                            }
                                        >
                                            ZAPISZ
                                        </Button>

                                    </div>

                                </>

                            ) : (

                                <>

                                    <Typography
                                        className="polygonCard__title"
                                    >
                                        {polygon.name}
                                    </Typography>

                                    <Typography
                                        className="polygonCard__label"
                                    >
                                        POLIGON
                                    </Typography>

                                    <Typography
                                        className="polygonCard__value"
                                    >
                                        {polygon.name}
                                    </Typography>

                                    <div className="polygonCard__buttons">

                                        <Button
                                            variant="contained"
                                            className="editButton"
                                            onClick={() => {

                                                setEditId(polygon.id);
                                                setEditName(polygon.name);

                                            }}
                                        >
                                            EDYTUJ
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() =>
                                                deletePolygon(polygon.id)
                                            }
                                        >
                                            USUŃ
                                        </Button>

                                    </div>

                                </>

                            )}

                        </CardContent>

                    </Card>

                ))}

            </div>

        </div>

    );

}

export default PolygonList;