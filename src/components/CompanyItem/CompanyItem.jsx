import "./companyItem.css";

import React from "react";

function CompanyItem(props) {
  return (
    <div
      onClick={() => {
        props.setCompany({
          activeCompany: props.id,
          companyId: props.data.id,
          companyName: props.data.name,
        });
      }}
      className={
        props.company.activeCompany == props.id
          ? `company-item company-item--selected`
          : `company-item`
      }
    >
      {props.data.name}
    </div>
  );
}

export default CompanyItem;
