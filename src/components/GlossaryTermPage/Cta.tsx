import React from "react";
import "./Cta.css";

const Cta = () => {
  return (
    <div className="glossary-cta">
      <div className="glossary-cta__wrapper">
        <div className="glossary-cta__text-wrapper">
          <p className="glossary-cta__header">Shifting FinOps Left 👈</p>
          <p className="glossary-cta__text">
            Optimize Your Cloud Spending with Strategic Financial Management –
            Join the FinOps Revolution!
          </p>
        </div>
        <a
          href="https://dashboard.infracost.io/"
          className="button medium flat primary"
        >
          Signup and get started now
        </a>
      </div>
    </div>
  );
};
export default Cta;
