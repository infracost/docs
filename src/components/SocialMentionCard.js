import React from 'react';

function SocialMentionCard(props) {
  const { platform, link, name, subtitle, profileImage, profileUrl } = props;

  const twitterIcon = (
    <svg alt="TwitterIcon" width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="main" d="M7.54752 20C16.6042 20 21.5578 12.3047 21.5578 5.63144C21.5578 5.41287 21.5578 5.19529 21.5434 4.97869C22.507 4.26381 23.3389 3.37867 24 2.3647C23.1013 2.77309 22.148 3.04092 21.1718 3.15923C22.1998 2.52812 22.9691 1.53548 23.3366 0.366057C22.3701 0.954283 21.3126 1.36884 20.2099 1.59182C19.4675 0.782212 18.4856 0.246107 17.4162 0.0664704C16.3468 -0.113166 15.2494 0.0736804 14.294 0.598096C13.3385 1.12251 12.5782 1.95526 12.1307 2.96748C11.6833 3.9797 11.5735 5.11495 11.8186 6.19756C9.86088 6.09691 7.94572 5.57516 6.19741 4.66618C4.4491 3.7572 2.90672 2.48131 1.6704 0.921344C1.04073 2.03306 0.847872 3.34911 1.1311 4.60154C1.41433 5.85397 2.15234 6.9486 3.19488 7.66257C2.41127 7.63876 1.64475 7.42196 0.96 7.03049C0.96 7.05117 0.96 7.07283 0.96 7.09449C0.960311 8.26041 1.35385 9.39034 2.07387 10.2926C2.79389 11.1949 3.79606 11.8139 4.9104 12.0448C4.18547 12.2476 3.42488 12.2772 2.68704 12.1315C3.00169 13.1349 3.61427 14.0124 4.43911 14.6412C5.26395 15.27 6.25979 15.6186 7.28736 15.6384C5.54375 17.0438 3.38982 17.8067 1.17216 17.8044C0.780387 17.8037 0.388996 17.7793 0 17.7316C2.25181 19.2136 4.87192 19.9997 7.54752 19.9961" fill="#C0B9C9"/>
    </svg>
  );

  const linkedInIcon = (
    <svg alt="LinkedIn icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="main" d="M0 1.71921C0 0.769972 0.794024 0 1.77355 0H22.2264C23.2059 0 24 0.769972 24 1.71921V22.2808C24 23.2303 23.2059 24 22.2264 24H1.77355C0.794024 24 0 23.2303 0 22.2808V1.71921Z" fill="#C0B9C9"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.27512 20.0905V9.25314H3.65014V20.0905H7.27512ZM5.46262 7.77349C6.72672 7.77349 7.51352 6.9413 7.51352 5.90131C7.48996 4.8379 6.72672 4.02881 5.4866 4.02881C4.2466 4.02881 3.43585 4.8379 3.43585 5.90131C3.43585 6.9413 4.22248 7.77349 5.43899 7.77349H5.46255H5.46262Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.28094 20.0905H12.9059V14.0385C12.9059 13.7146 12.9295 13.391 13.0252 13.1594C13.2872 12.5123 13.8837 11.8421 14.8851 11.8421C16.1968 11.8421 16.7215 12.8359 16.7215 14.2928V20.0905H20.3462V13.8765C20.3462 10.5478 18.5578 8.99884 16.1729 8.99884C14.2173 8.99884 13.3588 10.085 12.8818 10.8248H12.906V9.25314H9.28104C9.32861 10.27 9.28104 20.0905 9.28104 20.0905H9.28094Z" fill="white"/>
    </svg>
  );

  return (
    <div className="card">
      <div className="card-wrapper">
        <div className="heading">
          <a className="author" href={profileUrl} target="_blank">
            <div className="profile-image"><img src={`/img/social/${profileImage}`} alt="Author's profile image" /></div>
            <div className="author-details">
              <span className="name">{name}</span>
              <span className="subtitle">{subtitle}</span>
            </div>
          </a>
          <a className={`platform-icon ${platform}`} href={link} target="_blank" aria-label="Link to Twitter/LinkedIn mention" >
            {platform === 'twitter' ? twitterIcon : ''}
            {platform === 'linkedin' ? linkedInIcon : ''}
          </a>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default SocialMentionCard;
