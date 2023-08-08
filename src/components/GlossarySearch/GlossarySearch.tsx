import React from "react";
import terms from "./glossaryTerms.json";

const GlossarySearch = () => {

	
  return (
    <div className="container">
      Search FinOps Glossary
      {terms.map((term) => (
        <li key={term.key}>
          {term.key}: {term.description}
        </li>
      ))}
    </div>
  );
};

export default GlossarySearch;
