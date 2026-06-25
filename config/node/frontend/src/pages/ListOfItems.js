import React, { useState, useEffect } from "react";
import UserCard from "../UserCard";

import "./ListOfItems.css";

function ListOfItems() {

    const [soldiers, setSoldiers] = useState([]);

    useEffect(() => {

        fetch("http://localhost:10000/app/users_dynamic")
            .then(res => res.json())
            .then(res => {
                setSoldiers(res);
            });

    }, []);

    return (

        <div className="list-page">

            <div className="list-container">

                <h1 className="list-title">
                    LISTA ŻOŁNIERZY
                </h1>

                <p className="list-subtitle">
                    Zarządzaj dodanymi żołnierzami.
                </p>

                <div className="list-grid">

                    {soldiers.data?.map(user => (

                        <UserCard
                            key={user.id}
                            user={user}
                        />

                    ))}

                </div>

            </div>

        </div>

    );

}

export default ListOfItems;