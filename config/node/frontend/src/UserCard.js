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
                            sx={{ bgcolor: 'red' }}
                            aria-label="user"
                        >
                            {user.name?.charAt(0)}
                        </Avatar>
                    }
                    title={user.name}
                    subheader={user.location}
                />

                <CardContent>
                    <Typography>
                        Twój znajomy {user.name} opublikował {user.posts} postów.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserCard;