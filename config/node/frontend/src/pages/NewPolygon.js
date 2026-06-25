import React, { useState } from "react";

import {
    Container,
    Paper,
    Box,
    TextField,
    Button,
    Typography
} from "@mui/material";

import "./NewPolygon.css";

function NewPolygon() {

    const [polygonName, setPolygonName] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:10000/app/insert_polygon",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: polygonName
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            setPolygonName("");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="newpolygon">

            <Container maxWidth="md">

                <div className="newpolygon__header">

                    <Typography
                        variant="h2"
                        className="newpolygon__title"
                    >
                        DODAWANIE POLIGONU
                    </Typography>

                    <Typography
                        className="newpolygon__subtitle"
                    >
                        Uzupełnij dane nowego poligonu.
                    </Typography>

                </div>

                <Paper
                    elevation={0}
                    className="newpolygon__paper"
                >

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <TextField
                            fullWidth
                            label="Nazwa poligonu"
                            value={polygonName}
                            onChange={(e) =>
                                setPolygonName(e.target.value)
                            }
                            margin="normal"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            className="newpolygon__button"
                            fullWidth
                        >
                            DODAJ POLIGON
                        </Button>

                    </Box>

                </Paper>

            </Container>

        </div>

    );

}

export default NewPolygon;