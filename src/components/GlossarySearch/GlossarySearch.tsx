import React, { ReactElement } from "react";
import terms from "./glossaryTerms.json";
import "./GlossarySearch.css";
import SearchIcon from "../icons/SearchIcon";
import useSearch from "../utils/UseSearch";
import GlossaryTerm from "./GlossaryTerm";

type GlossaryPageSection = {
  title: string;
  paragraphs: string[];
};

export type GlossaryTermType = {
  key: string;
  href: string | null;
  description: string;
  sections?: GlossaryPageSection[];
};

const GlossarySearch = () => {
  const { results, searchValue, setSearchValue } = useSearch<GlossaryTermType>({
    dataSet: terms,
    keys: ["key", "description"],
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    // If there are no parameters, update the URL without the query string.
    // Otherwise, include the query string.
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname;

    // Update the browser URL without refreshing the page
    window.history.pushState({}, "", newUrl);
  };

  return (
    <>
      <div className="intro">
        <div className="container glossary-search__intro-container">
          <h1 className="tagline">FinOps Glossary</h1>
          <div className="finops-glossary__search">
            <input
              defaultValue={searchValue.replace(/['"]+/g, "")}
              type="search"
              placeholder="Search FinOps Glossary"
              className="glossary-search__input"
              onChange={handleInputChange}
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
