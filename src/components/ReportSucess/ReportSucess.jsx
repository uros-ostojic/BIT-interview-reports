import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { applicationContext } from "../../context";
import "./reportSuccess.css";

function ReportSucess(props) {
	const { token } = useContext(applicationContext);

	useEffect(() => {
		let entry = {
			id: 10000000 + Math.round(Math.random() * 89999999),
			candidateId: props.candidate.candidateId,
			candidateName: props.candidate.candidateName,
			companyId: props.company.companyId,
			companyName: props.company.companyName,
			interviewDate: props.interviewDate,
			phase: props.phase,
			status: props.status,
			note: props.note,
		};

		fetch("https://node-api-krmk.onrender.com/api/reports", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(entry),
		})
			.then((response) => response.json())
			.then((entry) => {
				console.log("Success:", entry);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	return (
		<>
			<div className="report-success-container">
				<div className="report-success-box">
					<h2 className="report-success-message">Report Created!</h2>
				</div>
				<Link className="link--back" to="/reports">
					Back
				</Link>
			</div>
		</>
	);
}

export default ReportSucess;
