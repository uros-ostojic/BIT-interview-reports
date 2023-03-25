import React from "react";
import "./search.css";
import "./search.svg";

const Search = ({ title, inputValue, setInputValue }) => {
	return (
		<div className="search-wrapper">
			<span>{title}</span>
			<input
				type="search"
				id="search"
				placeholder="Search..."
				autoComplete="off"
				onChange={(event) => setInputValue(event.target.value)}
				value={inputValue}
			/>
		</div>
	);
};

export default Search;
