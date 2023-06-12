import { useState, useRef, useEffect } from "react";
import arrowIcon from "../../images/icon-arrow.svg";
import { getIp, isDomain, isIP } from "../utils/index";
import { getContext } from "../context/index";
import { toast } from "react-hot-toast";

function SearchBar() {
	const { setApiFetchData } = getContext();
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef(null);
	const [error, setError] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);

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
			inputRef.current.classList.add("error");
			setButtonDisabled(false);
			setError(true);
		}
		const fetchedData = await getIp(url.href + searchParams);
		setButtonDisabled(false);
		if (fetchedData.code === 400) {
			setInputValue("");
			setError(true);
		} else {
			inputRef.current.classList.remove("error");
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
					ref={inputRef}
					value={inputValue}
					placeholder='Search for any IP address or domain'
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button
					className={buttonDisabled ? "disabled" : null}
					type='submit'
					disabled={buttonDisabled}
				>
					<img src={arrowIcon} alt='ArrowIcon' />
				</button>
			</div>
		</form>
	);
}

export default SearchBar;
