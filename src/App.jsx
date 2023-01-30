import Main from "./components/Main";
import Map from "./components/Map";
import Result from "./components/Result";
import { useRef, useEffect } from "react";
import { getContext } from "./context";
import { Toaster } from "react-hot-toast";
function App() {
	const { isLoading } = getContext();
	const render = useRef(0);

	useEffect(() => {
		console.log(render.current);
		render.current += 1;
	});

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
