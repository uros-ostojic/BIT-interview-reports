import React from "react";
import "./ReportDetails.css";
import Button from "../Button/Button";

function ReportDetails(props) {
  return (
    <>
      <section>
        <div className="report-input-fields">
          <div className="report-input-container">
            <span
              className={
                !props.interviewDate ||
                Date.parse(props.interviewDate) < Date.parse(new Date())
                  ? `report-input-label`
                  : `report-input-warning report-input-label`
              }
            >
              Interview Date:
            </span>
            <input
              className={
                !props.interviewDate ||
                Date.parse(props.interviewDate) < Date.parse(new Date())
                  ? ``
                  : `report-input-warning report-input-warning-shadow`
              }
              onFocus={(e) => {}}
              onChange={(e) => {
                props.setInterviewDate(e.target.value);
              }}
              type="date"
            ></input>
            <span
              className={
                !props.interviewDate ||
                Date.parse(props.interviewDate) < Date.parse(new Date())
                  ? `btn-hidden `
                  : `report-input-label report-input-warning`
              }
            >
              Date cannot be in the future.
            </span>
          </div>{" "}
          <div className="report-input-container">
            <span className="report-input-label">Phase:</span>
            <select
              id="phase"
              onChange={(e) => {
                props.setPhase(e.target.value);
              }}
            >
              <option value="CV">CV</option>
              <option value="HR">HR</option>
              <option value="Tech">Tech</option>
              <option value="Final">Final</option>
            </select>{" "}
          </div>{" "}
          <div className="report-input-container">
            <span className="report-input-label">Status:</span>
            <select
              id="status"
              onChange={(e) => {
                props.setStatus(e.target.value);
              }}
            >
              <option value={true}>Passed</option>
              <option value={false}>Declined</option>
            </select>{" "}
          </div>{" "}
        </div>
        <div className="report-input-comment">
          <span className="report-input-label">Notes:</span>
          <textarea
            onChange={(e) => {
              props.setNote(e.target.value);
            }}
            className="report-textarea"
            placeholder="Comment here..."
          ></textarea>
        </div>
      </section>
      <div className="company--next-prev">
        <Button do={props.prev} name="Back"></Button>

        <div
          className={
            props.interviewDate &&
            Date.parse(props.interviewDate) < Date.parse(new Date())
              ? ``
              : `btn-hidden`
          }
        >
          <Button do={props.next} name="Submit"></Button>
        </div>
      </div>
    </>
  );
}

export default ReportDetails;
