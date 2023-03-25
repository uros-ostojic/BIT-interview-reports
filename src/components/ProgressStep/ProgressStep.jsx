import React from "react";
import "./progressStep.css";

function ProgressStep(props) {
  return (
    <div className={props.step >= props.stage ? `step step-active` : `step`}>
      <span className="step--number"> {props.stage}</span>{" "}
      <span className="step--name">{props.stepName}</span>
    </div>
  );
}

export default ProgressStep;
