import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Box
} from "@mui/material";

import "./UserCard.css";

function UserCard({ user }) {

    const [editMode, setEditMode] = useState(false);

    const [name, setName] = useState(user.name);
    const [rank, setRank] = useState(user.rank);
    const [polygon, setPolygon] = useState(user.polygon);

    const deleteUser = async () => {

        try {

            await fetch(
                `http://localhost:10000/app/delete_user/${user.id}`,
                {
                    method: "DELETE"
                }
            );

            window.location.reload();

        } catch (error) {

            console.log(error);

        }

    };

    const updateUser = async () => {

        try {

            const response = await fetch(
                `http://localhost:10000/app/update_user/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        rank,
                        polygon
                    })
                }
            );

            if (response.ok) {
                window.location.reload();
            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="userCard">

            <Card className="userCard__card">

                <CardContent>

                    <Typography className="userCard__name">

                        {user.name}

                    </Typography>

                    <Typography className="userCard__rank">

                        {user.rank}

                    </Typography>

                    <div className="userCard__info">

                        <div className="userCard__row">

                            <span className="userCard__label">
                                POLIGON
                            </span>

                            <span className="userCard__value">
                                {user.polygon}
                            </span>

                        </div>

                    </div>

                    <Box className="userCard__buttons">

                        <Button
                            className="editButton"
                            variant="contained"
                            onClick={() => setEditMode(!editMode)}
                        >
                            EDYTUJ
                        </Button>

                        <Button
                            className="deleteButton"
                            variant="contained"
                            onClick={deleteUser}
                        >
                            USUŃ
                        </Button>

                    </Box>

                    {editMode && (

                        <div className="userCard__edit">

                            <TextField
                                fullWidth
                                size="small"
                                margin="dense"
                                label="Imię i nazwisko"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />

                            <TextField
                                fullWidth
                                size="small"
                                margin="dense"
                                label="Stopień"
                                value={rank}
                                onChange={(e) =>
                                    setRank(e.target.value)
                                }
                            />

                            <TextField
                                fullWidth
                                size="small"
                                margin="dense"
                                label="Poligon"
                                value={polygon}
                                onChange={(e) =>
                                    setPolygon(e.target.value)
                                }
                            />

                            <Button
                                className="saveButton"
                                variant="contained"
                                onClick={updateUser}
                            >
                                ZAPISZ ZMIANY
                            </Button>

                        </div>

                    )}

                </CardContent>

            </Card>

        </div>

    );

}

export default UserCard;