import L from "leaflet";
import Icon from "../../images/icon-location.svg";

const customIcon = new L.Icon({
	iconUrl: Icon,
	iconRetinaUrl: Icon,
	iconAnchor: null,
	popupAnchor: [25, 5],
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	className: "leaflet-div-icon",
});

export { customIcon };
