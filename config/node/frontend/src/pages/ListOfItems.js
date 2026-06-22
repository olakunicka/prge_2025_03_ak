import React, {useState, useEffect} from 'react';
import UserCard from "../UserCard";

function ListOfItems() {

    const [soldiers, setSoldiers] = useState([]);

    useEffect(() => {

        fetch('http://localhost:10000/app/users_dynamic')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setSoldiers(res);
            });

    }, []);

    return (
        <div className="ListofUsers">

            <h1>Lista żołnierzy</h1>

            <div>
                {soldiers.data?.map(user =>
                    <UserCard
                        key={user.id}
                        user={user}
                    />
                )}
            </div>

        </div>
    );
}

export default ListOfItems;