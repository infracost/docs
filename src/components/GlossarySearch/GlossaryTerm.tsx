import React from "react";
import { GlossaryTermType } from "./GlossarySearch";
import "./GlossaryTerm.css";
import ArrowIcon from "../icons/ArrowIcon";
import BookIcon from "../icons/BookIcon";

const GlossaryTerm = ({ term }: { term: GlossaryTermType }) => {
  return (
    <div className="glossary-term__card">
      <div className="glossary-term__card-header">
        <h2 className="glossary-term__card-title">
          <BookIcon />
          {term.key}
        </h2>
      </div>

      <div>{term.description}</div>

      {term.slug && (
        <a
          href={`/glossary/${term.slug}`}
          className="glossary-term__card-link"
          rel="noopener noreferrer"
        >
          More about {term.key}
          <ArrowIcon />
        </a>
      )}
    </div>
  );
};
export default GlossaryTerm;
