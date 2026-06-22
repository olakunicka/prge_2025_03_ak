import React, {useRef, useEffect, useState} from 'react';

import Button from '@mui/material/Button';
import RoomIcon from '@mui/icons-material/Room';

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";

import {useGeographic} from 'ol/proj';
import {Feature} from 'ol';

import Point from 'ol/geom/Point';

import {TileWMS, Vector as VectorSource, OSM} from 'ol/source';

import GeoJSON from 'ol/format/GeoJSON';

import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

import './MapComponent.css';

function MapComponent() {

    const [toggleMarkerButton, setToggleMarkerButton] = useState(false);

    const toggleMarkerRef = useRef(false);
    const mapRef = useRef(null);

    useGeographic();

    const handleMarkerButtonClick = () => {

        const newValue = !toggleMarkerButton;

        setToggleMarkerButton(!toggleMarkerButton);
        toggleMarkerRef.current = newValue;
    }

    useEffect(() => {

        // warstwa markerów dodawanych kliknięciem
        const markerSource = new VectorSource();

        const markerLayer = new VectorLayer({
            source: markerSource,
        });

        // warstwa użytkowników z GeoServera
        const usersSource = new VectorSource({
            url: '/geoserver/prge_2025_03_ak/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge_2025_03_ak:users&outputFormat=application/json',
            format: new GeoJSON(),
        });

        usersSource.on('featuresloadend', () => {
            console.log('ZAŁADOWANO:', usersSource.getFeatures().length);
        });

        usersSource.on('featuresloaderror', () => {
            console.log('BŁĄD ŁADOWANIA WFS');
        });

        const usersLayer = new VectorLayer({
            source: usersSource,
            style: new Style({
                image: new CircleStyle({
                    radius: 8,
                    fill: new Fill({
                        color: 'red'
                    }),
                    stroke: new Stroke({
                        color: 'white',
                        width: 2
                    })
                })
            })
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),

                new TileLayer({
                    source: new TileWMS({
                        url: 'http://localhost:9000/geoserver/prge_2025_03_ak/wms?',
                        params: {
                            'LAYERS': 'prge_2025_03_ak:AEC015_lasy',
                            'TILED': true
                        },
                        serverType: 'geoserver',
                        transition: 0
                    })
                }),

                usersLayer,
                markerLayer
            ],

            view: new View({
                center: [21, 52.23],
                zoom: 6
            })
        });

        // kliknięcie użytkownika
        map.on('singleclick', function (event) {

            map.forEachFeatureAtPixel(event.pixel, function (feature) {

                const props = feature.getProperties();

                if (props.name) {

                    alert(
                        `Imię: ${props.name}\n` +
                        `Miejscowość: ${props.location}\n` +
                        `Posty: ${props.posts}`
                    );
                }

            });

        });

        // dodawanie własnego markera
        map.on('click', function (event) {

            if (toggleMarkerRef.current) {

                markerSource.clear();

                const coordinates = event.coordinate;

                const marker = new Feature({
                    geometry: new Point(coordinates)
                });

                markerSource.addFeature(marker);
            }

        });

        return () => map.setTarget(null);

    }, []);

    return (
        <>
            <div className='mapComponent' ref={mapRef}></div>

            <Button
                variant={toggleMarkerButton ? "contained" : "outlined"}
                startIcon={<RoomIcon/>}
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    zIndex: 1000
                }}
                onClick={() => handleMarkerButtonClick()}
            >
                Marker
            </Button>
        </>
    );
}

export default MapComponent;