import React, { useRef } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { setCursor } from "../utils/utils";
import { locationApi } from "../utils/api";
import Consumer from "../utils/context";
import "../styles/Map.css";

// default map location -> middle of US
const mapInfo = {
    lat: 38.5283,
    lng: -98.2795,
    zoom: 4
};

const LeafletMap = () => {
    const editRef = useRef(null);

    // General Functions
    const rebuildKMLString = points => {
        let coordsString = "";
        if (points && points.length !== 0) {
            for (let i = 0, len = points.length; i < len; i++) {
                coordsString += points[i].lng + "," + points[i].lat + ",0 ";
            }
            coordsString += points[0].lng + "," + points[0].lat + ",0 ";
        }

        locationApi.getZipCodes(coordsString).then(res => {
            console.log(res);
        });
        // set zip codes
        // newRequest = true;
    };
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

    // Event Functions
    const handleCreate = e => {
        try {
            rebuildKMLString(e.layer._latlngs[0]);
        } catch (e) {
            clearMap();
            // global error
        }
    };
    const handleEdit = e => {
        try {
            const { _layers } = e.layers;
            let _latlngs = _layers[Object.keys(_layers)[0]]._latlngs;

            rebuildKMLString(_latlngs[0]);
        } catch (e) {
            clearMap();
            // global error
        }
    };
    const handleDelete = e => {
        clearMap();
        rebuildKMLString([]);
    };
    const handleDrawStart = e => {
        setCursor(".leaflet-container", "crosshair");
        clearMap();
    };
    const handleDrawStop = e => {
        setCursor(".leaflet-container", "grab");
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
