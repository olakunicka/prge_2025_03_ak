import React, {useState} from 'react';

import {Container, Paper, Box, TextField, Button} from '@mui/material';

function NewUser() {

    const [userName, setUserName] = useState('')
    const [userLocation, setUserLocation] = useState('')
    const [userPosts, setUserPosts] = useState(0)


    const handleWrite = (e) => {
        setUserName(e.target.value)
        // console.log(userName)
    }


    const handleSubmit = async (e) => {
        console.log(userName, userLocation, userPosts)
        e.preventDefault();

        try {

            const response = await fetch('http://localhost:10000/app/insert_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify({
                        name: userName,
                        location: userLocation,
                        posts: userPosts
                    })
            })

            console.log(response)


        } catch (e) {
            console.log(e)
        }

    }


    return (
        <div className='newuser__container'>
            <Container>
                <Paper elevation={3} sx={{p: 4}}>
                    <Box component='form'
                         onSubmit={(e) => handleSubmit(e)}
                    >
                        <TextField
                            sx={{m: 1}}
                            fullWidth
                            label='imie'
                            value={userName}
                            onChange={(e) => handleWrite(e)}

                        ></TextField>
                        <TextField
                            sx={{m: 1}}
                            fullWidth
                            label='miejscowość'
                            value={userLocation}
                            onChange={(e) => setUserLocation(e.target.value)}
                        ></TextField>

                        <TextField
                            sx={{m: 1}}
                            fullWidth
                            label='posty'
                            value={userPosts}
                            onChange={(e) => setUserPosts(e.target.value)}
                        ></TextField>

                        <Button type='submit' variant='contained'>Dodaj użytkownika</Button>

                    </Box>
                </Paper>
            </Container>
        </div>
    );
}

export default NewUser;