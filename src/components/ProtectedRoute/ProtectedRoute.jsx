import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { applicationContext } from "../../context";

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const { token } = useContext(applicationContext);

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				token ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
}

export default ProtectedRoute;
