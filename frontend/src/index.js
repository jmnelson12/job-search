import React, { Suspense } from "react";
import ReactDOM from "react-dom";
const Main = React.lazy(() => import("./Main"));

ReactDOM.render(
	<Suspense fallback={<div className="global-loader">Loading...</div>}>
		<Main />
	</Suspense>,
	document.getElementById("root")
);
