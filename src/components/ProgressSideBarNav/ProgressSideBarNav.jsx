import React from "react";
import ProgressStep from "../ProgressStep/ProgressStep";
import "./progressSideBarNav.css";

function ProgressSideBarNav(props) {
	const stages = [
		`Select Candidate`,
		`Select Company`,
		`Fill Report Details`,
	];
	return (
		<aside className="progress--side-bar">
			<section className="progress--steps">
				{stages.map((el, i) => {
					return (
						<ProgressStep
							stepName={el}
							step={props.step}
							stage={i + 1}
							key={"step-" + i}
						/>
					);
				})}
			</section>
			<section className="progress--completed">
				<div
					className={
						props.candidate.candidateName ? `` : `step-hidden`
					}
				>
					<div className="progress--detail-title">Candidate</div>
					<div className="progress--detail">
						{props.candidate.candidateName}
					</div>
				</div>{" "}
				<div className={props.company.companyName ? `` : `step-hidden`}>
					<div className="progress--detail-title">Company</div>
					<div className="progress--detail">
						{props.company.companyName}
					</div>
				</div>
			</section>
		</aside>
	);
}

export default ProgressSideBarNav;
