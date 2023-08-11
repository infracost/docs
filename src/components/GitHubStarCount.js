import React, { useState, useEffect } from 'react';

function GitHubStarCount() {
  const [stars, setStars] = useState(null);

  const cacheKey = 'githubStarCount';
  const cacheTtl = 300 * 1000;

  function getCachedValue() {
    const s = localStorage.getItem(cacheKey);
    if (!s) {
      return null;
    }

    const j = JSON.parse(s);

    if (!j.value || !j.expiry || new Date().getTime() > j.expiry) {
      return null;
    }

    return j.value;
  }

  function setCacheValue(value) {
    const item = {
      value,
      expiry: new Date().getTime() + cacheTtl,
    };

    localStorage.setItem(cacheKey, JSON.stringify(item));
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchStars() {
      const stars = getCachedValue();
      if (stars) {
        setStars(stars);
        return;
      }

      const resp = await fetch('https://api.github.com/repos/infracost/infracost');
      const data = await resp.json();

      if (!abortController.signal.aborted) {
        const stars = data.stargazers_count;
        setStars(stars);
        setCacheValue(stars);
      }
    }

    fetchStars();

    return () => abortController.abort();
  }, []);

  return (
    <div className="github-stars">
      <img
        className="star-icon"
        src="/img/icons/star.svg"
        alt="GitHub star icon"
        width={14}
        height={14}
      />
      <span className="star-count">{stars}</span>
    </div>
  );
}

export default GitHubStarCount;
