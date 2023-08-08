import React from "react";
import terms from "./glossaryTerms.json";
import "./GlossarySearch.css";
import SearchIcon from "../icons/SearchIcon";
import useSearch from "../utils/UseSearch";

interface GlossaryItem {
  key: string;
  href: string | null;
  description: string;
}

const GlossarySearch = () => {
  const { results, searchValue, setSearchValue } = useSearch<GlossaryItem>({
    dataSet: terms,
    keys: ["key", "description"],
  });

  return (
    <>
      <div className="intro">
        <div className="container glossary-search__intro-container">
          <h1 className="tagline">FinOps Glossary</h1>
          <div className="finops-glossary__search">
            <input
              type="search"
              placeholder="Search FinOps Glossary"
              className="glossary-search__input"
              onChange={(e) => setSearchValue(e.currentTarget.value)}
            />
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="container glossary-search__content-wrapper">
        {results.length > 0 ? (
          results.map((term) => (
            <li key={term.key}>
              {term.key}: {term.description}
            </li>
          ))
        ) : (
          <div className="">
            <p className="finops-glossary__search-no-results">
              No results found for <strong>{searchValue}</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default GlossarySearch;
