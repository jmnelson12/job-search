import React, { useState, useEffect } from "react";
import "./styles/Main.css";

const Main = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<div className="Main">
			{isLoading ? (
				<div className="global-loader">Loading...</div>
			) : (
				<>
					<h1>Le Main.js</h1>
				</>
			)}
		</div>
	);
};

export default Main;
