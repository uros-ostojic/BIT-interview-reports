import React, { useState, useContext } from "react";
import "./homePage.css";

import Search from "../../components/Search/Search";
import SearchError from "../../components/SearchError/SearchError";
import Card from "../../components/Card/Card";

import BackgroundAnimation from "../../components/BackgroundAnimation/BackgroundAnimation";

import { applicationContext } from "../../context";

const Homepage = () => {
	const [inputValue, setInputValue] = useState("");
	const { allCandidates } = useContext(applicationContext);

	const searchCandidate = !allCandidates.length
		? []
		: allCandidates?.filter((e) => {
				const candidateName = e.name.toLowerCase();

				return candidateName.includes(inputValue.toLowerCase());
		  });

	return (
		<>
			<div className="homePage">
				<BackgroundAnimation />
				<main>
					<Search
						title="Candidates"
						setInputValue={setInputValue}
						inputValue={inputValue}
					/>
					<div className="card-wrapper">
						{searchCandidate.map((element, index) => (
							<Card
								info={element}
								isList={false}
								key={"search-card-" + index}
							/>
						))}
						{inputValue && !searchCandidate?.length && (
							<SearchError />
						)}
					</div>
				</main>
			</div>
		</>
	);
};

export default Homepage;
