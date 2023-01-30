import { useEffect } from "react";
import { Marker, useMap, Popup } from "react-leaflet";
import { getContext } from "../context";

function CustomMarker() {
	let {
		apiFetchedData: {
			location: { lat, lng },
			as: { name },
		},
	} = getContext();

	const map = useMap();

	useEffect(() => {
		map.flyTo({ lat, lng });
	}, [lat, lng]);

	return (
		<Marker
			position={[lat, lng]}
			eventHandlers={{
				click: (e) => {
					map.flyTo(e.latlng, 14);
				},
			}}
		>
			<Popup>{name}</Popup>
		</Marker>
	);
}

export default CustomMarker;
