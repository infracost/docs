import React from "react";
import { GlossaryTermType } from "../GlossarySearch/GlossarySearch";

const GlossaryTermPageAside = ({ term }: { term: GlossaryTermType }) => {
  return (
    <aside className="glossary-term__aside">
      <h3>Definition</h3>
      <p>{term.description}</p>
    </aside>
  );
};

export default GlossaryTermPageAside;
