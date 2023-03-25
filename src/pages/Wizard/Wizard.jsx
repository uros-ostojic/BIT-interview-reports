import React, { useState } from "react";
import ProgressSideBarNav from "../../components/ProgressSideBarNav/ProgressSideBarNav";
import Candidate from "../../components/Candidate/Candidate";
import Company from "../../components/Company/Company";
import ReportDetails from "../../components/ReportDetails/ReportDetails";
import ReportSuccess from "../../components/ReportSucess/ReportSucess";
import BackgroundAnimation from "./../../components/BackgroundAnimation/BackgroundAnimation";
import "./Wizard.css";

function Wizard(props) {
	const [step, setStep] = useState(1);

	const [candidate, setCandidate] = useState({});
	const [company, setCompany] = useState({});

	const [interviewDate, setInterviewDate] = useState();
	const [phase, setPhase] = useState(`CV`);
	const [status, setStatus] = useState(false);
	const [note, setNote] = useState(``);

	const stepNext = function () {
		setStep(step + 1);
	};

	const stepPrev = function () {
		setStep(step - 1);
	};

	const wizardStep = function (step) {
		let output;
		if (step === 1) {
			output = (
				<Candidate
					next={stepNext}
					step={step}
					candidate={candidate}
					setCandidate={setCandidate}
				/>
			);
		} else if (step === 2) {
			output = (
				<Company
					next={stepNext}
					prev={stepPrev}
					step={step}
					company={company}
					setCompany={setCompany}
				/>
			);
		} else if (step === 3) {
			output = (
				<ReportDetails
					next={stepNext}
					prev={stepPrev}
					step={step}
					interviewDate={interviewDate}
					setInterviewDate={setInterviewDate}
					setPhase={setPhase}
					setStatus={setStatus}
					setNote={setNote}
				/>
			);
		} else if (step === 4) {
			output = (
				<ReportSuccess
					candidate={candidate}
					company={company}
					interviewDate={interviewDate}
					phase={phase}
					status={status}
					note={note}
				/>
			);
		}
		return output;
	};

	return (
		<>
			<BackgroundAnimation />
			<article className="wizard-container">
				<ProgressSideBarNav
					step={step}
					candidate={candidate}
					company={company}
				/>
				<main className="wizard--panel">{wizardStep(step)}</main>
			</article>
		</>
	);
}

export default Wizard;
