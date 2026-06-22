import React, {useState,useEffect} from 'react';
import UserCard from "../UserCard";

function ListOfItems() {

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        // http://localhost:10000/app/users_dynamic
        fetch('http://localhost:10000/app/users_dynamic')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUsers(res);
            })
    },  []);

    return (
        <div className="ListofUsers">
            <h1> Lista użytkowników </h1>
            <div>
                {users.data?.map(user => <UserCard key={user.id} user={user}/>)}
            </div>


        </div>
    );
}

export default ListOfItems;