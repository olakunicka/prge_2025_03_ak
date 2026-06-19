import React from 'react';
import {Card, CardHeader, Avatar, CardContent, Typography} from '@mui/material'

function UserCard(user) {
    return (
        <div className='userCard'
             key={user.id}
        >
            <Card >
                <CardHeader
                    avatar={
                    <Avatar sx={{bgcolor:'red'}} aria-label="recipe"
                    >
                        {user.name}
                    </Avatar>
                }
                title = {user.name}
                subheader={user.location}
                >

                </CardHeader>
                <CardContent>
                    <Typography>
                        Twój znakomy {user.name} opublikował {user.posts} postów.
                    </Typography>
                </CardContent>


            </Card>

        </div>
    );
}

export default UserCard;