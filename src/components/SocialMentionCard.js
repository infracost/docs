import React from 'react';
import TwitterIcon from './icons/TwitterIcon';
import LinkedInIcon from './icons/LinkedInIcon';

function SocialMentionCard(props) {
  const { platform, link, name, subtitle, profileImage, profileUrl } = props;

  return (
    <div className="card">
      <div className="card-wrapper">
        <div className="heading">
          <a className="author" href={profileUrl} target="_blank" rel="noopener noreferrer">
            <div className="profile-image">
              <img src={`/img/social/${profileImage}`} alt="Author's profile image" />
            </div>
            <div className="author-details">
              <span className="name">{name}</span>
              <span className="subtitle">{subtitle}</span>
            </div>
          </a>
          <a
            className={`platform-icon ${platform}`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to Twitter/LinkedIn mention"
          >
            {platform === 'twitter' ? <TwitterIcon /> : ''}
            {platform === 'linkedin' ? <LinkedInIcon /> : ''}
          </a>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}

export default SocialMentionCard;
