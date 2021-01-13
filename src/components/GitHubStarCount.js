import React, { useState, useEffect } from 'react';

function GitHubStarCount() {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchStars() {
      const resp = await fetch('https://api.github.com/repos/infracost/infracost');
      const data = await resp.json();
      if (!abortController.signal.aborted) {
        setStars(data.stargazers_count);
      }
    }

    fetchStars();

    return () => abortController.abort();
  }, []);

  return (
    <div className="github-stars">
      <img className="star-icon" src="/img/icons/star.svg" alt="GitHub star icon" />
      <span className="star-count">{stars}</span>
    </div>
  )
}

export default GitHubStarCount;
