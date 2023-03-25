import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { applicationContext } from "../../context";

import AllReports from "./../AllReports/AllReports";
import Homepage from "./../HomePage/HomePage";
import Wizard from "./../Wizard/Wizard";
import DetailPage from "./../DetailPage/DetailPage";

import Footer from "./../../components/Footer/Footer";
import Header from "./../../components/Header/Header";

import ProtectedRoute from "./../../components/ProtectedRoute/ProtectedRoute";
import ErrorPage from "../ErrorPage/ErrorPage";

function ProtectedPages() {
	const { token } = useContext(applicationContext);

	return (
		<>
			{token && <Header />}

			<Switch>
				<Route
					exact
					path="/home"
					render={() => (token ? <Homepage /> : <Redirect to="/" />)}
				/>
				<Route
					exact
					path="/reports"
					render={() =>
						token ? <AllReports /> : <Redirect to="/" />
					}
				/>
				{/* Higher order components */}
				<ProtectedRoute exact path="/wizard" component={Wizard} />

				{token && (
					<Route
						exact
						path="/details/:id"
						render={(routerObject) => (
							<DetailPage id={routerObject.match.params.id} />
						)}
					/>
				)}

				<Route path="*">
					<ErrorPage />
				</Route>
			</Switch>

			{token && <Footer />}
		</>
	);
}

export default ProtectedPages;
