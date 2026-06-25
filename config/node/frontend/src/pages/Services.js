import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import MapIcon from "@mui/icons-material/Map";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import "./Services.css";

function Services() {

    const modules = [
        {
            title: "MAPA",
            icon: <MapIcon sx={{ fontSize: 85 }} />,
            link: "/map"
        },
        {
            title: "DODAJ\nŻOŁNIERZA",
            icon: <PersonAddIcon sx={{ fontSize: 85 }} />,
            link: "/newuser"
        },
        {
            title: "LISTA ŻOŁNIERZY",
            icon: <GroupsIcon sx={{ fontSize: 85 }} />,
            link: "/list"
        },
        {
            title: "DODAJ POLIGON",
            icon: <AddLocationAltIcon sx={{ fontSize: 85 }} />,
            link: "/newpolygon"
        },
        {
            title: "LISTA POLIGONÓW",
            icon: <LocationCityIcon sx={{ fontSize: 85 }} />,
            link: "/polygonlist"
        }
    ];

    return (
        <div className="services">

            <h1 className="services__title">
                SYSTEM ZARZĄDZANIA
                <br />
                POLIGONAMI WOJSKOWYMI
            </h1>

            <p className="services__subtitle">
                Wybierz moduł, z którego chcesz skorzystać.
            </p>

            <div className="services__grid">

                {modules.map((module, index) => (

                    <Button
                        key={index}
                        component={Link}
                        to={module.link}
                        className="service-card"
                    >

                        <div className="service-icon">
                            {module.icon}
                        </div>

                        <div className="service-title">
                            {module.title}
                        </div>

                    </Button>

                ))}

            </div>

        </div>
    );
}

export default Services;