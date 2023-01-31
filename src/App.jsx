import Main from "./components/Main";
import Map from "./components/Map";
import Result from "./components/Result";
import "../node_modules/leaflet/dist/leaflet.css";
import { useRef, useEffect } from "react";
import { getContext } from "./context";
import { Toaster } from "react-hot-toast";
function App() {
	const { isLoading } = getContext();

	if (isLoading) return <div className='loader'>Loading...</div>;
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
