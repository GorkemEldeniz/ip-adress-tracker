import { useState, useRef, useEffect } from "react";
import arrowIcon from "../../images/icon-arrow.svg";
import { getIp, isDomain, isIP } from "../utils/index";
import { getContext } from "../context/index";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

function SearchBar() {
	const { setApiFetchData } = getContext();
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		const data = new FormData(e.target);
		let userInput = data.get("search");
		let url = new URL(import.meta.env.VITE_IP_API);
		const searchParams = new URLSearchParams(url.search);
		searchParams.append("apiKey", import.meta.env.VITE_API_KEY);
		if (isDomain(userInput)) {
			searchParams.append("domain", userInput);
		} else if (isIP(userInput)) {
			searchParams.append("ipAddress", userInput);
		} else {
			//default placeholder url
			setInputValue("");
			setButtonDisabled(false);
			setError(true);
		}
		setIsLoading(true);
		const fetchedData = await getIp(url.href + searchParams);
		setIsLoading(false);
		setButtonDisabled(false);
		if (fetchedData.code === 400) {
			setInputValue("");
			setError(true);
		} else {
			setApiFetchData(fetchedData);
			setError(false);
		}
	};

	useEffect(() => {
		if (error) {
			toast((t) => (
				<span className='popup'>
					Please insert valid domain or ip address
					<button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
				</span>
			));
		}
	}, [error]);

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input
					type='text'
					name='search'
					id=''
					value={inputValue}
					placeholder='Search for any IP address or domain'
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button
					className={buttonDisabled ? "disabled" : null}
					type='submit'
					disabled={buttonDisabled}
				>
					{loading ? (
						<Loader width='11px' height='14px' />
					) : (
						<img src={arrowIcon} alt='ArrowIcon' />
					)}
				</button>
			</div>
		</form>
	);
}

export default SearchBar;
