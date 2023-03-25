import React from "react";
import "./WizardCard.css";

function WizardCard(props) {
  const select = function () {
    props.setCandidate({
      activeCandidate: props.id,
      candidateId: props.data.id,
      candidateName: props.data.name,
    });
  };
  return (
    <div
      onClick={select}
      className={
        props.candidate.activeCandidate == props.id
          ? `wizard-card wizard-card--selected bg-glass`
          : `wizard-card bg-glass`
      }
    >
      <img
        className="wizard-card--avatar"
        src="https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-1024.png"
        alt={props.data.name}
      />
      <div className="wizard-card--text">
        <span className="wizard-card--name">{props.data.name}</span>
        <span className="wizard-card--email">{props.data.email}</span>
      </div>
    </div>
  );
}

export default WizardCard;
