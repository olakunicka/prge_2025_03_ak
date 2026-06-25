import React from 'react';
import { Typography, Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";

import './Home.css';

function Home() {

    return (

        <div className="home">

            <div className="home__card">

                <h1 className="home__title">
                    SYSTEM ZARZĄDZANIA
                    <br />
                    POLIGONAMI WOJSKOWYMI
                </h1>

                <Typography className="home__subtitle">
                    Interaktywny system do zarządzania poligonami wojskowymi
                    oraz przypisanymi do nich żołnierzami.
                </Typography>

                <Button
                    className="home__button"
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/services"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                            backgroundColor: "#4b6f44",
                            "&:hover": {
                                backgroundColor: "#3d5d37"
                            }
                        }}
                >
                    ROZPOCZNIJ
                </Button>

            </div>

        </div>

    );
}

export default Home;