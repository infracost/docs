import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageLayout from '../../components/PageLayout';

// There's a redirect in Amplify for this, so this is just a backup incase that gets changed.
function FeedbackSubmit() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    window.location.replace(`${siteConfig.customFields.infracostDashboardEndpoint}/feedback/redirect${window.location.search}`)
  }, []);

  return (
    <PageLayout
      title="Feedback"
      description="Your voice matters to us! Infracost is an open-source platform and free for the community. Share your feedback and contribute to our continuous growth and improvement."
      pageClass="feedback"
      hideCTA={true}
      noIndex={true}
    />
  );
}

export default FeedbackSubmit;
