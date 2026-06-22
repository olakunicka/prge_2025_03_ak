import React from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography
} from '@mui/material';

function UserCard({ user }) {

    return (
        <div className='userCard'>

            <Card>

                <CardHeader
                    avatar={
                        <Avatar
                            sx={{ bgcolor: 'green' }}
                            aria-label="soldier"
                        >
                            {user.name?.charAt(0)}
                        </Avatar>
                    }
                    title={user.name}
                    subheader={`Stopień: ${user.location}`}
                />

                <CardContent>

                    <Typography>
                        Żołnierz {user.name}
                    </Typography>

                    <Typography>
                        Stopień: {user.location}
                    </Typography>

                    <Typography>
                        Poligon: {user.posts}
                    </Typography>

                </CardContent>

            </Card>

        </div>
    );
}

export default UserCard;