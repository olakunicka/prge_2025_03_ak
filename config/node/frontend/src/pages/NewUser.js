import React, {useState} from 'react';
import {Container, Paper, Box, TextField, Button} from '@mui/material';


function NewUser(props) {

    const [userName, setUserName] = useState('')
    const [userLocation, setUserLocation] = useState('')
    const [userPosts, setUserPosts] = useState('')


    const handleWrite = (e) => {
        setUserName(e.target.value)
        console.log(userName)
    }

    const handleSubmit = async(e) => {
        console.log(userName,userLocation,userPosts)
        e.preventDefault();

        try {

            const response = await fetch('', {
                method:'',
                header: {
                    'Content-Type': 'application/json'
                }
            })


        } catch (e){
            console.log(e)
        }


    }


    return (
        <div className='newuser__container'>
            <Container>
                <Paper elevation={3} sx={{p: 4}}>
                    <Box component={'form'}
                        onSubmit={(e)=>handleSubmit(e)}
                    >
                        <TextField sx={{m:1}}
                        fullWidth
                        label='imie'
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}


                        ></TextField>
                        <TextField
                        sx={{m:1}}
                        fullWidth
                        label='miejscowość'
                        value={userLocation}
                        onChange={(e)=> setUserLocation(e.target.value)}

                        ></TextField>
                        <TextField
                        sx={{m:1}}
                        fullWidth
                        label='posty'
                        value={userPosts}
                        onChange={(e)=> setUserPosts(e.target.value)}
                        ></TextField>


                        <Button type='submit' variant='contained'>Dodaj użytkownika</Button>


                    </Box>
                </Paper>
            </Container>




        </div>
    );
}

export default NewUser;

