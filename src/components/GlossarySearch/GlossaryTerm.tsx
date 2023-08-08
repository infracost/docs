import React from "react";
import { GlossaryTermType } from "./GlossarySearch";
import "./GlossaryTerm.css";
import ArrowIcon from "../icons/ArrowIcon";

const GlossaryTerm = ({ term }: { term: GlossaryTermType }) => {
  return (
    <div className="glossary-term__card">
      <div className="glossary-term__card-header">
        <h2 className="glossary-term__card-title">{term.key}</h2>
      </div>

      <div>{term.description}</div>

      {term.href && (
        <a
          href={term.href}
          className="glossary-term__card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
          <ArrowIcon size={{ width: "16px", height: "16px" }} />
        </a>
      )}
    </div>
  );
};
export default GlossaryTerm;
