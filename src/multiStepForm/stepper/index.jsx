import React from "react";

import "./stepper.css";

const Stepper = ({ steps, activeIndex }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index <= activeIndex ? "active" : ""}`}
        >
          <div className="step-content">
            <div className="step-circle"></div>
            <div>{step}</div>
          </div>
          {index < steps.length - 1 && <div className="separator"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
