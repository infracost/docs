import React from "react";
import { GlossaryTermType } from "./GlossarySearch";
import "./GlossaryTerm.css";

const GlossaryTerm = ({ term }: { term: GlossaryTermType }) => {
  return (
    <div className="glossary-term__card">
      {term.key}: {term.description}
    </div>
  );
};
export default GlossaryTerm;
