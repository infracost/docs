import React from "react";
import terms from "./glossaryTerms.json";
import "./GlossarySearch.css";
import SearchIcon from "../icons/SearchIcon";

const GlossarySearch = () => {
  return (
    <>
      <div className="intro ">
        <div className="container glossary-search__intro-container">
          <h1 className="tagline">FinOps Glossary</h1>
          <div className="finops-glossary__search">
            <input
              type="search"
              placeholder="Search FinOps Glossary"
              className="glossary-search__input"
            />
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="container">
        {terms.map((term) => (
          <li key={term.key}>
            {term.key}: {term.description}
          </li>
        ))}
      </div>
    </>
  );
};

export default GlossarySearch;
