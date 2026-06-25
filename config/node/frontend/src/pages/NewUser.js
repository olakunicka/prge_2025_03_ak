import React, { useState } from "react";

import {
    Container,
    Paper,
    Box,
    TextField,
    Button,
    Typography
} from "@mui/material";

import "./NewUser.css";

function NewUser() {

    const [soldierName, setSoldierName] = useState("");
    const [soldierRank, setSoldierRank] = useState("");
    const [soldierPolygon, setSoldierPolygon] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:10000/app/insert_user",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: soldierName,
                        rank: soldierRank,
                        polygon: soldierPolygon
                    })
                }
            );

            const data = await response.json();
            console.log(data);

            setSoldierName("");
            setSoldierRank("");
            setSoldierPolygon("");

        } catch (e) {
            console.log(e);
        }
    };

    return (

        <div className="newuser-page">

            <Container maxWidth="md">

                <div className="newuser-container">

                    <Typography
                        variant="h2"
                        className="newuser-title"
                    >
                        DODAWANIE ŻOŁNIERZA
                    </Typography>

                    <Typography
                        className="newuser-subtitle"
                    >
                        Uzupełnij dane nowego żołnierza.
                    </Typography>

                    <Paper
                        elevation={0}
                        className="newuser-card"
                    >

                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                        >

                            <TextField
                                fullWidth
                                label="Imię i nazwisko"
                                value={soldierName}
                                onChange={(e) =>
                                    setSoldierName(e.target.value)
                                }
                            />

                            <TextField
                                fullWidth
                                label="Stopień"
                                value={soldierRank}
                                onChange={(e) =>
                                    setSoldierRank(e.target.value)
                                }
                            />

                            <TextField
                                fullWidth
                                label="Poligon"
                                value={soldierPolygon}
                                onChange={(e) =>
                                    setSoldierPolygon(e.target.value)
                                }
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                className="newuser-button"
                            >
                                DODAJ ŻOŁNIERZA
                            </Button>

                        </Box>

                    </Paper>

                </div>

            </Container>

        </div>

    );
}

export default NewUser;