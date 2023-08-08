import React from "react";
import terms from "./glossaryTerms.json";
import "./GlossarySearch.css";
import SearchIcon from "../icons/SearchIcon";
import useSearch from "../utils/UseSearch";
import GlossaryTerm from "./GlossaryTerm";

export type GlossaryTermType = {
  key: string;
  href: string | null;
  description: string;
};

const GlossarySearch = () => {
  const { results, searchValue, setSearchValue } = useSearch<GlossaryTermType>({
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
          <div className="glossary-search__content-list">
            {sortTermsAlphabetically(results).map((term) => (
              <React.Fragment key={term.key}>
                <GlossaryTerm term={term} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div>
            <p className="finops-glossary__search-no-results">
              No results found for <strong>{searchValue}</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

function sortTermsAlphabetically(
  terms: GlossaryTermType[]
): GlossaryTermType[] {
  return terms.slice().sort((a, b) => a.key.localeCompare(b.key));
}


export default GlossarySearch;
