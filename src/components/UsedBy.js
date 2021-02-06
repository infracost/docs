import React from 'react';

function UsedBy() {
  return (
    <div className="used-by">
      <div className="container">
        <p className="tagline">Used by teams at</p>
        <ul>
          <li><img src="/img/users/gitlab.svg" alt="GitLab logo"/></li>
          <li><img src="/img/users/hpe.svg" alt="HPE logo"/></li>
          <li><img src="/img/users/dazn.svg" alt="DAZN logo"/></li>
          <li><img src="/img/users/hellofresh.png" height="48px" alt="HelloFresh logo"/></li>
          <li><img src="/img/users/accenture.svg" alt="Accenture logo"/></li>
        </ul>
      </div>
    </div>
  )
}

export default UsedBy;
