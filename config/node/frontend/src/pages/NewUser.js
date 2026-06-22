import React, {useState} from 'react';

import {Container, Paper, Box, TextField, Button} from '@mui/material';

function NewUser() {

    const [soldierName, setSoldierName] = useState('');
    const [soldierRank, setSoldierRank] = useState('');
    const [soldierPolygon, setSoldierPolygon] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(
            soldierName,
            soldierRank,
            soldierPolygon
        );

        try {

            const response = await fetch(
                'http://localhost:10000/app/insert_user',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: soldierName,
                        location: soldierRank,
                        posts: soldierPolygon
                    })
                }
            );

            console.log(response);

        } catch (e) {
            console.log(e);
        }

    };

    return (
        <div className='newuser__container'>
            <Container>
                <Paper elevation={3} sx={{p: 4}}>
                    <Box
                        component='form'
                        onSubmit={(e) => handleSubmit(e)}
                    >

                        <TextField
                            sx={{m: 1}}
                            fullWidth
                            label='Imię i nazwisko'
                            value={soldierName}
                            onChange={(e) =>
                                setSoldierName(e.target.value)
                            }
                        />

                        <TextField
                            sx={{m: 1}}
                            fullWidth
                            label='Stopień'
                            value={soldierRank}
                            onChange={(e) =>
                                setSoldierRank(e.target.value)
                            }
                        />

                        <TextField
                            sx={{m: 1}}
                            fullWidth
                            label='Poligon'
                            value={soldierPolygon}
                            onChange={(e) =>
                                setSoldierPolygon(e.target.value)
                            }
                        />

                        <Button
                            type='submit'
                            variant='contained'
                        >
                            Dodaj żołnierza
                        </Button>

                    </Box>
                </Paper>
            </Container>
        </div>
    );
}

export default NewUser;