import React, { useState } from 'react';

import {
    Container,
    Paper,
    Box,
    TextField,
    Button
} from '@mui/material';

function NewPolygon() {

    const [polygonName, setPolygonName] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                'http://localhost:10000/app/insert_polygon',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: polygonName
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            alert('Poligon został dodany');

            setPolygonName('');

        } catch (error) {

            console.log(error);

            alert('Błąd podczas dodawania poligonu');
        }
    };

    return (
        <div className='newpolygon__container'>

            <Container>
                <Paper elevation={3} sx={{ p: 4 }}>

                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                    >

                        <TextField
                            fullWidth
                            label='Nazwa poligonu'
                            value={polygonName}
                            onChange={(e) =>
                                setPolygonName(e.target.value)
                            }
                            sx={{ mb: 2 }}
                        />

                        <Button
                            type='submit'
                            variant='contained'
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