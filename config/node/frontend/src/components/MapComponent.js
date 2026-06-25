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

import {Vector as VectorSource, OSM} from 'ol/source';

import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Overlay from 'ol/Overlay';


import GeoJSON from 'ol/format/GeoJSON';

import './MapComponent.css';

function MapComponent() {

    const [toggleMarkerButton, setToggleMarkerButton] = useState(false);

    const toggleMarkerRef = useRef(false);
    const mapRef = useRef(null);
    const popupRef = useRef(null);

    useGeographic();

    const handleMarkerButtonClick = () => {

        const newValue = !toggleMarkerButton;

        setToggleMarkerButton(newValue);
        toggleMarkerRef.current = newValue;
    }

    useEffect(() => {

        const markerSource = new VectorSource();

        const markerLayer = new VectorLayer({
            source: markerSource,
        });

        const usersSource = new VectorSource({
            url: '/geoserver/prge_2025_03_ak/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=prge_2025_03_ak:users&outputFormat=application/json',
            format: new GeoJSON(),
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

        const polygonSource = new VectorSource();

        const polygonLayer = new VectorLayer({
            source: polygonSource,
            style: new Style({
                image: new Icon({
                    src: 'https://fonts.gstatic.com/s/i/materialicons/place/v15/24px.svg',
                    scale: 1.5,
                    anchor: [0.5, 1]
                })
            })
        });

        fetch('http://localhost:10000/app/polygons_dynamic')
            .then(res => res.json())
            .then(res => {

                console.log("POLYGONS:", res);

                res.data.forEach(polygon => {

                    const feature = new Feature({
                        geometry: new Point([
                            polygon.lon,
                            polygon.lat
                        ]),
                        name: polygon.name
                    });

                    polygonSource.addFeature(feature);
                });

            });

        const popup = new Overlay({
            element: popupRef.current,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -35]
        });
        const map = new Map({
            target: mapRef.current,
            overlays: [popup],

            layers: [
                new TileLayer({
                    source: new OSM(),
                }),

                usersLayer,
                polygonLayer,
                markerLayer
            ],

            view: new View({
                center: [21, 52.23],
                zoom: 6
            })
        });

        map.on('singleclick', function (event) {

            map.forEachFeatureAtPixel(event.pixel, function (feature) {

                const props = feature.getProperties();

                if (props.location) {

                    alert(
                        `Żołnierz: ${props.name}\n` +
                        `Poligon: ${props.location}`
                    );

                } else if (props.name) {

                    fetch(`http://localhost:10000/app/soldiers_by_polygon/${props.name}`)
                        .then(res => res.json())
                        .then(data => {

                            let html = `<h3>${props.name}</h3>`;

                            if (data.data.length === 0) {

                                html += `<p>Brak żołnierzy</p>`;

                            } else {

                                html += "<ul>";

                                data.data.forEach(soldier => {

                                    html += `<li>${soldier.name} (${soldier.rank})</li>`;

                                });

                                html += "</ul>";

                            }

                            document.getElementById("popup-content").innerHTML = html;

                            popup.setPosition(
                                feature.getGeometry().getCoordinates()
                            );

                            popupRef.current.style.display = "block";

                        });

                }

            });

        });

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
            <div
                ref={popupRef}
                className="ol-popup"
                style={{display: "none"}}
            >
                <div id="popup-content"></div>
            </div>

            <Button
                variant={toggleMarkerButton ? "contained" : "outlined"}
                startIcon={<RoomIcon/>}
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    zIndex: 1000
                }}
                onClick={handleMarkerButtonClick}
            >
                Marker
            </Button>
        </>
    );
}

export default MapComponent;