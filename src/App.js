import { ApplicationProvider } from "./context";

import { Route, Switch, useHistory } from "react-router-dom";

import "./app.css";

import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import { parseJwt } from "./utils/utils";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

import ProtectedPages from "./pages/ProtectedPages/ProtectedPages";

import fetchApi from "./services/fetchApi";

function App() {
	const [allCandidates, setAllCandidates] = useState([]);
	const [allCompanies, setAllCompanies] = useState([]);
	const [allReports, setAllReports] = useState([]);
	const [rerender, setRerender] = useState("");
	const [token, setToken] = useState(
		localStorage.getItem("token") ? localStorage.getItem("token") : ""
	);

	const [isAdmin, setIsAdmin] = useState(false);
	const [isLogged, setIsLogged] = useState(false);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalInfo, setModalInfo] = useState({});

	const history = useHistory();

	const logout = () => {
		setToken("");
		localStorage.removeItem("token");
		history.push("/");
	};

	const handleReports = (data) => {
		setAllReports(data.sort((a, b) => b.id - a.id));
	};

	useEffect(() => {
		setIsLogged(!!token);
		const parsedData = token && parseJwt(token);
		setIsAdmin(parsedData?.email === "admin@admin.com");
	}, [token]);

	const apiUrl = "https://node-api-krmk.onrender.com/api"; // when using add /your-api-route

	useEffect(() => {
		if (token) {
			fetchApi("reports", handleReports, logout, {
				Authorization: "Bearer " + token,
			});
		}
	}, [token, rerender]);

	useEffect(() => {
		if (token) {
			fetchApi("candidates", setAllCandidates, logout, {
				Authorization: "Bearer " + token,
			});
			fetchApi("companies", setAllCompanies, logout, {
				Authorization: "Bearer " + token,
			});
		}
	}, [token]);

	return (
		<>
			<ApplicationProvider
				value={{
					allCandidates,
					allCompanies,

					allReports,
					setAllReports,

					token,
					setToken,

					modalInfo,
					setModalInfo,

					setModalIsOpen,
					modalIsOpen,

					isAdmin,

					apiUrl,

					setRerender,
				}}
			>
				<Switch>
					<Route exact path="/">
						<LoginPage />
					</Route>

					<ProtectedPages />
				</Switch>
			</ApplicationProvider>
		</>
	);
}

export default App;
