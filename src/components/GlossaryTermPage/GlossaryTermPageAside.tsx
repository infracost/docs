import React from 'react';
import { GlossaryTermType } from '../GlossarySearch';

const GlossaryTermPageAside = ({ term }: { term: GlossaryTermType }) => (
  <aside className="glossary-term__aside">
    {term.imgUrl && (
      <div>
        <img className="glossary-term__aside--img" src={term.imgUrl} alt="" />
      </div>
    )}
    <div className="glossary-term__aside-content">
      <h3 className="glossary-term__header">
        {term.termTitle}
        <span className="glossary-term__def">(definition)</span>
      </h3>
      <span className="glossary-term__definition">{term.definition}</span>
    </div>
  </aside>
);

export default GlossaryTermPageAside;
