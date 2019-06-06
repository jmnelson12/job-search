import React, { useRef, useState } from "react";
import { Map, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { setCursor, getUniqueValues } from "../utils/utils";
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
    const runLocationSearch = async (coordsString, ctx) => {
        await locationApi.getLocationInfo(coordsString, ctx).then(res => {
            const { payload, message, success } = res.data;

            if (success) {
                ctx.setLocationData(getUniqueValues(payload, "zipcode"));
            } else {
                ctx.setGlobalMessage({
                    type: "danger",
                    message
                });
            }
        });
    };
    const rebuildKMLString = (points, ctx) => {
        let coordsString = "";
        if (points && points.length !== 0) {
            for (let i = 0, len = points.length; i < len; i++) {
                coordsString += points[i].lng + "," + points[i].lat + ",0 ";
            }
            coordsString += points[0].lng + "," + points[0].lat + ",0 ";
        }

        // setIsCallingForLocs(true);
        runLocationSearch(coordsString, ctx);
    };
    const clearMap = ctx => {
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
            console.error(e);
            ctx.setGlobalMessage({
                type: "danger",
                message:
                    "Error Clearing Map. Please refresh the page and try again. Sorry for the inconvenience."
            });
        }
    };

    // Event Functions
    const handleCreate = (e, ctx) => {
        rebuildKMLString(e.layer._latlngs[0], ctx);
    };
    const handleEdit = (e, ctx) => {
        const { _layers } = e.layers;
        let _latlngs = _layers[Object.keys(_layers)[0]]._latlngs;

        rebuildKMLString(_latlngs[0], ctx);
    };
    const handleDelete = (e, ctx) => {
        clearMap(ctx);
        rebuildKMLString([], ctx);
    };
    const handleDrawStart = (e, ctx) => {
        setCursor(".leaflet-container", "crosshair");
        clearMap(ctx);
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
                                onCreated={e => {
                                    handleCreate(e, ctx);
                                }}
                                onEdited={e => {
                                    handleEdit(e, ctx);
                                }}
                                onDeleted={e => {
                                    handleDelete(e, ctx);
                                }}
                                onDrawStart={e => {
                                    handleDrawStart(e, ctx);
                                }}
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
