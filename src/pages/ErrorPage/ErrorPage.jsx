import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import BackgroundAnimation from "../../components/BackgroundAnimation/BackgroundAnimation";
import { applicationContext } from "../../context";
import "./errorPage.css";

const ErrorPage = () => {
	const { token } = useContext(applicationContext);

	const history = useHistory();

	return (
		<>
			<BackgroundAnimation />
			<section id="errorPage" className={token ? "" : "notLogged"}>
				<main>
					<div className="bg-glass">
						<h1>Oops!</h1>
						<h3>Error 404: Page not found</h3>
						{!token ? (
							<Link
								className="bg-glass bg-glass--animated"
								to="/"
							>
								Go back
							</Link>
						) : (
							<button
								className="bg-glass bg-glass--animated"
								onClick={history.goBack}
							>
								Go back
							</button>
						)}
					</div>
				</main>
			</section>
		</>
	);
};

export default ErrorPage;
