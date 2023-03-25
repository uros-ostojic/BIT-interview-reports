import React, { useState, useContext } from "react";
import Card from "../../components/Card/Card";
import "./allReports.css";

import { applicationContext } from "./../../context";
import Modal from "../../components/Modal/Modal";
import Search from "../../components/Search/Search";
import SearchError from "./../../components/SearchError/SearchError";
import BackgroundAnimation from "../../components/BackgroundAnimation/BackgroundAnimation";
import Loader from "../../components/Loader/Loader";

const AllReports = () => {
	const [inputValue, setInputValue] = useState("");
	const { allReports } = useContext(applicationContext);

	const searchReports = !allReports.length
		? []
		: allReports?.filter((e) => {
				const companyName = e.companyName?.toLowerCase();
				const candidateName = e.candidateName?.toLowerCase();
				return (
					companyName?.includes(inputValue.toLowerCase()) ||
					candidateName?.includes(inputValue.toLowerCase())
				);
		  });

	return (
		<>
			<Modal />
			<div className="allReports">
				<BackgroundAnimation />
				<main>
					<Search
						title="Reports"
						setInputValue={setInputValue}
						inputValue={inputValue}
					/>

					{searchReports.map((e) => (
						<Card info={e} key={e.id} isList={true} />
					))}
					{inputValue && !searchReports?.length && <SearchError />}

					{!!searchReports?.length && <Loader />}
				</main>
			</div>
		</>
	);
};

export default AllReports;
