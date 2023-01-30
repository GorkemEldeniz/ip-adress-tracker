import { createContext, useContext } from "react";
import { useState, useMemo, useEffect } from "react";
import { getIp } from "../utils";

export const Context = createContext();

export const getContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [apiFetchedData, setApiFetchData] = useState({});

	useEffect(() => {
		const abortController = new AbortController();
		(async () => {
			let data = await fetch(import.meta.env.VITE_USER_IP_API, {
				signal: abortController.signal,
			});
			data = await data.json();
			let url = new URL(import.meta.env.VITE_IP_API);
			const searchParams = new URLSearchParams(url.search);
			searchParams.append("apiKey", import.meta.env.VITE_API_KEY);
			searchParams.append("ipAddress", data.ip);
			let fetchedData = await getIp(url.href + searchParams);
			setApiFetchData(fetchedData);
			setIsLoading(false);
		})();
		return () => {
			abortController.abort();
		};
	}, []);

	const contextDatas = useMemo(() => ({
		apiFetchedData,
		setApiFetchData,
		isLoading,
		setIsLoading,
	}));

	return <Context.Provider value={contextDatas}>{children}</Context.Provider>;
};
