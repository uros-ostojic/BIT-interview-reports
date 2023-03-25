import React from "react";
import { useState, useContext, useEffect } from "react";

import { applicationContext } from "../../context";
import openModal from "./../../assets/open-modal.png";

import "./table.css";

const Table = ({ id }) => {
	const [reports, setReports] = useState([]);
	const { allReports, setModalIsOpen, setModalInfo } =
		useContext(applicationContext);

	const findReports = () => {
		const tmp = !allReports.length
			? []
			: allReports.filter(
					(element) => element.candidateId === Number(id)
			  );
		setReports(tmp);
	};

	useEffect(() => {
		findReports();
	}, [allReports]);

	return (
		<>
			<table id="candidateReports">
				<tbody>
					{reports.map((element) => (
						<tr className="bg-glass" key={element?.id}>
							<td>
								<small>company</small>
								<h3>{element?.companyName}</h3>
							</td>
							<td>
								<small>interview date</small>
								<h3>
									{element.interviewDate &&
										new Date(element?.interviewDate)
											.toISOString()
											.split("T")[0]}
								</h3>
							</td>
							<td>
								<small>status</small>
								<h3>{element.status}</h3>
							</td>
							<td>
								<img
									src={openModal}
									alt="Open modal"
									width="30"
									height="30"
									onClick={() => {
										setModalIsOpen(true);
										setModalInfo(element);
									}}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export default Table;
