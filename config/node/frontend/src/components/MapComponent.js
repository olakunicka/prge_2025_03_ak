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
    };

    useEffect(() => {
        const markerSource = new VectorSource();
        const markerLayer = new VectorLayer({ source: markerSource });

        // Twoje warstwy z poprawnym Workspace
        const layerNames = [
            'prge_2025_03_ak:AEC015_lasy',
            'prge_2025_03_ak:ABH140_rzeka',
            'prge_2025_03_ak:PEC015_budynki',
            'prge_2025_03_ak:LAP030_droga'
        ];

        const wmsLayers = layerNames.map(name => new TileLayer({
            source: new TileWMS({
                url: 'http://localhost:9000/geoserver/prge_2025_03_ak/wms',
                params: { 'LAYERS': name, 'TILED': true },
                serverType: 'geoserver'
            })
        }));

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({ source: new OSM() }),
                ...wmsLayers,
                markerLayer
            ],
            view: new View({
                center: [21.45, 52.16],
                zoom: 12
            })
        });

        map.on('click', function (event) {
            if (toggleMarkerRef.current) {
                markerSource.clear();
                const coordinates = event.coordinate;
                markerSource.addFeature(new Feature({ geometry: new Point(coordinates) }));

                console.log("Kliknięto w:", coordinates);

                // Pobieramy adres dla wszystkich warstw jednocześnie
                const url = wmsLayers[0].getSource().getFeatureInfoUrl(
                    coordinates,
                    map.getView().getResolution(),
                    'EPSG:4326',
                    {
                        'INFO_FORMAT': 'application/json',
                        'QUERY_LAYERS': layerNames.join(','), // Odpytuje wszystkie warstwy
                        'FEATURE_COUNT': 5,
                        'BUFFER': 50 // Klucz do wykrywania obiektów przy kliknięciu
                    }
                );

                if (url) {
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            if (data.features && data.features.length > 0) {
                                console.log("Znaleziono obiekty:", data.features);
                            } else {
                                console.log("Brak obiektów w tym punkcie.");
                            }
                        })
                        .catch(err => console.error("Błąd zapytania:", err));
                }
            }
        });

        return () => map.setTarget(null);
    }, []);

    return (<>
        <div className='mapComponent' ref={mapRef}></div>
        <Button
            variant={toggleMarkerButton ? "contained" : "outlined"}
            startIcon={<RoomIcon/>}
            sx={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }}
            onClick={handleMarkerButtonClick}
        >Marker</Button>
    </>);
}

export default MapComponent;