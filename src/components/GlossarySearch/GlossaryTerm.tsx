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
          rel="noopener noreferrer"
        >
          Learn more
          <ArrowIcon />
        </a>
      )}
    </div>
  );
};
export default GlossaryTerm;
