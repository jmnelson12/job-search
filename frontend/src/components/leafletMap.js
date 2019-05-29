import React, { useState, useRef } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { setCursor } from "../utils/utils";
import Consumer from "../utils/context";
import "../styles/Map.css";

// default map location -> middle of US
const mapInfo = {
    lat: 38.5283,
    lng: -98.2795,
    zoom: 4
};

const LeafletMap = () => {
    const [points, setPoints] = useState([]);
    const editRef = useRef(null);

    // General Functions
    const clearMap = () => {
        try {
            const layerContainer =
                editRef.current.leafletElement.options.edit.featureGroup;
            const layers = layerContainer._layers;
            const layer_ids = Object.keys(layers);
            let currentLayer;

            if (layer_ids.length !== 0) {
                layer_ids.forEach(id => {
                    currentLayer = layers[id];
                    layerContainer.removeLayer(currentLayer);
                });
            }
        } catch (e) {
            // Global Error
            console.error(e);
        }
    };
    const getLatLngs = (e, type) => {
        type = type.toUpperCase();
        let _latlngs = null;
        switch (type) {
            case "CREATE":
                _latlngs = e.layer._latlngs;
                break;
            case "EDIT":
                const { _layers } = e.layers;
                try {
                    _latlngs = _layers[Object.keys(_layers)[0]]._latlngs;
                } catch (e) {
                    _latlngs = null;
                }
                break;
            default:
                break;
        }
        return _latlngs;
    };

    // Event Functions
    const handleCreate = e => {
        const latlngs = getLatLngs(e, "CREATE");
        if (latlngs) {
            setPoints(latlngs);
        } else {
            clearMap();
            // global error
        }
    };
    const handleDrawStart = e => {
        setCursor(".leaflet-container", "crosshair");
        clearMap();
    };
    const handleDrawStop = e => {
        setCursor(".leaflet-container", "grab");
    };
    const handleEdit = e => {
        const latlngs = getLatLngs(e, "EDIT");
        if (latlngs) {
            setPoints(latlngs);
        } else {
            clearMap();
            // global error
        }
    };
    const handleDelete = e => {
        clearMap();
    };

    return (
        <Consumer>
            {ctx => {
                return (
                    <Map
                        center={[mapInfo.lat, mapInfo.lng]}
                        zoom={mapInfo.zoom}
                        tap={true}
                        touchZoom={true}>
                        <FeatureGroup>
                            <EditControl
                                ref={editRef}
                                position="topright"
                                onCreated={handleCreate}
                                onEdited={handleEdit}
                                onDeleted={handleDelete}
                                onDrawStart={handleDrawStart}
                                onDrawStop={handleDrawStop}
                                draw={{
                                    rectangle: false,
                                    circlemarker: false,
                                    circle: false,
                                    polyline: false,
                                    marker: false
                                }}
                            />
                        </FeatureGroup>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </Map>
                );
            }}
        </Consumer>
    );
};

export default LeafletMap;
