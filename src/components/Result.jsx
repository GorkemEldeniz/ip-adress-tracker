import React from "react";
import { getContext } from "../context";
function Result() {
	const { apiFetchedData } = getContext();

	return (
		<div className='result'>
			<div className='ip'>
				<h2>IP ADDRESS</h2>
				<span>{apiFetchedData?.ip}</span>
			</div>
			<div className='location'>
				<h2>LOCATION</h2>
				<span>
					{apiFetchedData?.location.region} {apiFetchedData?.location.country}
				</span>
			</div>
			<div className='timezone'>
				<h2>TIMEZONE</h2>
				<span>{apiFetchedData?.location.timezone}</span>
			</div>
			<div className='isp'>
				<h2>ISP</h2>
				<span>{apiFetchedData.isp}</span>
			</div>
		</div>
	);
}

export default Result;
