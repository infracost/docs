import React, { ReactElement } from 'react';
import terms from './glossaryTerms.json';
import './GlossarySearch.css';
import SearchIcon from '../icons/SearchIcon';
import useSearch from '../utils/UseSearch';
import GlossaryTerm from './GlossaryCard';
import Kbd from '../Kbd';

type GlossaryPageSection = {
  title: string;
  paragraphs: string[];
};

export type GlossaryTermType = {
  termTitle: string;
  pageTitle: string;
  slug: string | null;
  definition: string;
  sections?: GlossaryPageSection[];
};

const GlossarySearch = () => {
  const { results, searchValue, setSearchValue } = useSearch<GlossaryTermType>({
    dataSet: terms,
    keys: ['termTitle', 'description'],
  });

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    // If there are no parameters, update the URL without the query string.
    // Otherwise, include the query string.
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname;

    // Update the browser URL without refreshing the page
    window.history.pushState({}, '', newUrl);
  };

  const SearchClearButton = (): ReactElement => {
    if (searchValue) {
      return (
        <button
          className="button flat glossary-search__clear-button"
          onClick={() => handleInputChange({ target: { value: '' } })}
        >
          Clear
          <Kbd keyName="Esc" />
        </button>
      );
    }
    return <></>;
  };

  return (
    <>
      <div className="intro">
        <div className="container glossary-search__intro-container">
          <h1 className="tagline">FinOps Glossary</h1>
          <div className="finops-glossary__search">
            <input
              value={searchValue.replace(/['"]+/g, '')}
              type="search"
              placeholder="Search FinOps Glossary"
              className="glossary-search__input"
              onChange={handleInputChange}
            />
            <SearchIcon />
            <SearchClearButton />
          </div>
        </div>
      </div>
      <div className="white-bg">
        <div className="container glossary-search__content-wrapper">
          {results.length > 0 ? (
            <div className="glossary-search__content-list">
              {sortTermsAlphabetically(results).map((term) => (
                <React.Fragment key={term.termTitle}>
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
      </div>
    </>
  );
};

function sortTermsAlphabetically(terms: GlossaryTermType[]): GlossaryTermType[] {
  return terms.slice().sort((a, b) => a.termTitle.localeCompare(b.termTitle));
}

export default GlossarySearch;
