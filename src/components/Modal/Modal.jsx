import React, { useContext } from "react";
import { applicationContext } from "../../context";
import "./modal.css";
import { formattedDate } from "../../utils/utils";

const Modal = () => {
	const { modalIsOpen, setModalIsOpen, modalInfo, setModalInfo } =
		useContext(applicationContext);

	const date =
		modalInfo?.interviewDate &&
		formattedDate(modalInfo?.interviewDate, ".");
	return (
		<>
			<div className={`modal ${modalIsOpen ? "show" : ""}`}>
				<div className="modal-card">
					<button
						onClick={() => {
							setModalIsOpen(false);
							setModalInfo({});
						}}
					>
						X
					</button>

					<h2>{modalInfo?.candidateName}</h2>
					<div className="info-modal">
						<div className="info-left">
							<div className="info">
								<p>Company</p>
								<h2>{modalInfo?.companyName}</h2>
							</div>
							<div className="info">
								<p>Interview Date</p>
								<h2>{date}</h2>
							</div>
							<div className="info">
								<p>Phase</p>
								<h2>{modalInfo?.phase}</h2>
							</div>
							<div className="info">
								<p>Status</p>
								<h2>{modalInfo?.status}</h2>
							</div>
						</div>
						<div className="notes-right">
							<div className="notes">
								<h4>Notes</h4>
								<p>{modalInfo?.note}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
