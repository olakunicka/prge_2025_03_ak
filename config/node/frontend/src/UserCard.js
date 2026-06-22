import React, {useState} from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    Button
} from '@mui/material';

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
                    method: 'DELETE'
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
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    rank: rank,
                    polygon: polygon
                })
            }
        );

        const data = await response.json();

        console.log(data);
        alert(JSON.stringify(data));

    } catch (error) {

        console.log(error);
    }
};

    return (
        <div className='userCard'>

            <Card>

                <CardHeader
                    avatar={
                        <Avatar
                            sx={{bgcolor: 'green'}}
                            aria-label="soldier"
                        >
                            {user.name?.charAt(0)}
                        </Avatar>
                    }
                    title={user.name}
                    subheader={`Stopień: ${user.rank}`}
                />

                <CardContent>

                    <Typography>
                        Żołnierz: {user.name}
                    </Typography>

                    <Typography>
                        Stopień: {user.rank}
                    </Typography>

                    <Typography>
                        Poligon: {user.polygon}
                    </Typography>

                    <Button
                        variant="contained"
                        color="error"
                        sx={{mt: 2}}
                        onClick={deleteUser}
                    >
                        USUŃ
                    </Button>

                    <Button
                        variant="contained"
                        sx={{mt: 2, ml: 2}}
                        onClick={() => setEditMode(!editMode)}
                    >
                        EDYTUJ
                    </Button>

                    {
                        editMode && (

                            <div style={{marginTop: '15px'}}>

                                <input
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                                <br/><br/>

                                <input
                                    value={rank}
                                    onChange={(e) =>
                                        setRank(e.target.value)
                                    }
                                />

                                <br/><br/>

                                <input
                                    value={polygon}
                                    onChange={(e) =>
                                        setPolygon(e.target.value)
                                    }
                                />

                                <br/><br/>

                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={updateUser}
                                >
                                    ZAPISZ
                                </Button>

                            </div>
                        )
                    }

                </CardContent>

            </Card>

        </div>
    );
}

export default UserCard;