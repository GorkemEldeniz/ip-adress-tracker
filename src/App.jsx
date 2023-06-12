import Main from "./components/Main";
import Map from "./components/Map";
import Result from "./components/Result";
import "../node_modules/leaflet/dist/leaflet.css";
import { useRef, useEffect } from "react";
import { getContext } from "./context";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

function App() {
	const { isLoading } = getContext();

	if (isLoading) return <Loader />;
	return (
		<main>
			<Toaster position='top-right' reverseOrder={false} />
			<Main />
			<Result />
			<Map />
		</main>
	);
}

export default App;
