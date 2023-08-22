import React from 'react';
import { GlossaryTermType } from '../GlossarySearch';

const GlossaryTermPageAside = ({ term }: { term: GlossaryTermType }) => (
  <aside className="glossary-term__aside">
    <h3 className="glossary-term__header">
      {term.termTitle}
      <span className="glossary-term__def">(definition)</span>
    </h3>
    <span className="glossary-term__definition">{term.definition}</span>
  </aside>
);

export default GlossaryTermPageAside;
