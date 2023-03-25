import React, { useContext } from "react";
import { applicationContext } from "../../context";
import { formattedDate } from "../../utils/utils";


import "./card.css";
import { Link } from "react-router-dom";
import eye from "./eye icon.png";
import X from "./X.png";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Card = ({ info, isList }) => {
	const date = info?.interviewDate && formattedDate(info?.interviewDate, ".");
	const { setModalIsOpen, setModalInfo, token, apiUrl, setRerender } =
		useContext(applicationContext);

	const deleteReport = async () => {
		await fetch(apiUrl + "/reports/" + info.id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => res.json())
			.then((res) =>
				MySwal.fire(
					"Deleted!",
					"Your report has been deleted.",
					"success"
				)
			)
			.catch((error) =>
				MySwal.fire(
					"Error!",
					"Your report has not been deleted.",
					"error"
				)
			);

		setRerender(new Date().getTime()); // random vrednost, da bi mogao dependency da menja
	};

	const showSwal = () => {
		// sweet alert library
		MySwal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteReport();
			}
		});
	};

	return (
		<>
			{isList ? (
				<div className="singleReport bg-glass">
					<div className="companyName">
						<h2>{info.companyName}</h2>
						<p>Company</p>
					</div>
					<div className="candidateName">
						<h2>{info.candidateName}</h2>
						<p>Candidate</p>
					</div>
					<div className="interviewDate">
						<h2>{date}</h2>
						<p>Interview Date</p>
					</div>
					<div className="status">
						<h2>{info.status}</h2>
						<p>Status</p>
					</div>
					<div className="eye">
						<figure>
							<img
								src={eye}
								onClick={() => {
									setModalIsOpen(true);
									setModalInfo(info);
								}}
								alt="eye"
							/>
						</figure>
						<figure>
							<img
								className="X"
								src={X}
								onClick={showSwal}
								alt="X"
							/>
						</figure>
					</div>
				</div>
			) : (
				<Link to={`/details/${info.id}`} className="card bg-glass">
					<img
						src="https://commentpara.de/img/anonymous.svg"
						alt="candidate"
					/>
					<p>{info.name}</p>
					<p>{info.email}</p>
				</Link>
			)}
		</>
	);
};

export default Card;
