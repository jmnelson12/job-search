import React, { useState } from "react";
import { Map, TileLayer, Polygon, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Consumer from "../utils/context";
import "../styles/Map.css";

const lineColor = "#ff0000";
const fillColor = "#00ff00";
const lineWidth = 1;

const LeafletMap = () => {
	const [mapInfo, setMapInfo] = useState({
		lat: 38.5283,
		lng: -98.2795,
		zoom: 4
	});
	const [points, setPoints] = useState([]);
	const handleMapClick = (e, ctx) => {
		try {
			const { latlng } = e;
			setPoints([...points, [latlng.lat, latlng.lng]]);
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 * onclick={e => {
							handleMapClick(e, ctx);
						}}
	 */

	return (
		<Consumer>
			{ctx => {
				const { lat, lng } = mapInfo;
				const position = [lat, lng];

				console.log(points);
				return (
					<Map
						center={position}
						zoom={mapInfo.zoom}
						tap={true}
						touchZoom={true}
						rev="map">
						<FeatureGroup>
							<EditControl
								position="topright"
								draw={{
									rectangle: false,
									circlemarker: false,
									circle: false,
									polyline: false,
									marker: false
								}}
							/>
						</FeatureGroup>
						<Polygon
							color={lineColor}
							positions={points}
							weight={lineWidth}
							fillColor={fillColor}
						/>

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
