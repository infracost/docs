import React from "react";
import { GlossaryTermType } from "../GlossarySearch";
import BookIcon from "../icons/BookIcon";

const GlossaryTermPageAside = ({ term }: { term: GlossaryTermType }) => {
  return (
    <aside className="glossary-term__aside">
      <h3 className="glossary-term__header">
        <BookIcon />
        Definition
      </h3>
      <p>{term.description}</p>
    </aside>
  );
};

export default GlossaryTermPageAside;
