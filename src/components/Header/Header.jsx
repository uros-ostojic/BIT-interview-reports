import React, { useContext, useState } from "react";
import "./header.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { applicationContext } from "../../context";

const Header = () => {
	const [isShown, setIsShown] = useState(false);

	const { setToken } = useContext(applicationContext);
	const history = useHistory();
	const location = useLocation();

	const logout = () => {
		setToken("");
		localStorage.removeItem("token");
		history.push("/");
	};

	return (
		<header>
			<div className="main-header">
				<div>
					<span>Blazing fast</span>

					<button
						className={`hamburger ${isShown ? "opened" : ""}`}
						onClick={() => setIsShown(!isShown)}
					>
						<svg width="30" height="30" viewBox="0 0 100 100">
							<path
								className="line line1"
								d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
							/>
							<path className="line line2" d="M 20,50 H 80" />
							<path
								className="line line3"
								d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
							/>
						</svg>
					</button>
				</div>

				<nav className={isShown ? "show" : ""}>
					<Link
						onClick={() => setIsShown(false)}
						to="/home"
						className={
							location.pathname === "/home" ? "active" : ""
						}
					>
						Candidates
					</Link>
					<Link
						onClick={() => setIsShown(false)}
						to="/reports"
						className={
							location.pathname === "/reports" ? "active" : ""
						}
					>
						Reports
					</Link>
					<Link
						onClick={() => setIsShown(false)}
						to="/wizard"
						className={
							location.pathname === "/wizard" ? "active" : ""
						}
					>
						Create report
					</Link>

					<Link className="sign-out" to="/" onClick={logout}>
						Sign out
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
