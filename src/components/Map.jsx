import { MapContainer, TileLayer } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import { getContext } from "../context";
import CustomMarker from "./CustomMarker";

function Map() {
	let {
		apiFetchedData: {
			location: { lat, lng },
		},
	} = getContext();

	return (
		<MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
			<CustomMarker />
			<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
		</MapContainer>
	);
}

export default Map;
