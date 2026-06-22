import React from 'react';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

function Services() {
    return (
        <div className='services'>

            <div className='services__title'>
                System zarządzania poligonami
            </div>

            <Button
                className="map__button"
                variant="contained"
                size="large"
                component={Link}
                to='/map'
            >
                MAPA
            </Button>

            <Button
                className="newuser_button"
                variant="contained"
                size="large"
                component={Link}
                to='/newuser'
            >
                DODAJ ŻOŁNIERZA
            </Button>

            <Button
                className="list__button"
                variant="contained"
                size="large"
                component={Link}
                to='/list'
            >
                LISTA ŻOŁNIERZY
            </Button>

            <Button
                className="polygon_button"
                variant="contained"
                size="large"
                component={Link}
                to='/newpolygon'
            >
                DODAJ POLIGON
            </Button>

            <Button
                className="polygonlist_button"
                variant="contained"
                size="large"
                component={Link}
                to='/polygonlist'
            >
                LISTA POLIGONÓW
            </Button>

        </div>
    );
}

export default Services;