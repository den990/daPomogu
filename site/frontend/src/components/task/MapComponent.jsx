import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const MapComponent = ({ latitude, longitude }) => {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        setMapLoaded(true);
    }, []);

    if (!mapLoaded) {
        return <div>Загрузка карты...</div>;
    }

    return (
        <YMaps>
            <Map defaultState={{ center: [latitude, longitude], zoom: 12 }} width="100%" height="400px">
                <Placemark geometry={[latitude, longitude]} />
            </Map>
        </YMaps>
    );
};

export default MapComponent;
