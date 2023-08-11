import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageLayout from '../../components/PageLayout';

// There's a redirect in Amplify for this, so this is just a backup incase that gets changed.
function FeedbackSubmit() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    window.location.replace(
      `${siteConfig.customFields.infracostDashboardEndpoint}/feedback/redirect${window.location.search}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout
      title="Feedback"
      description="Infracost is open source and free for the community."
      pageClass="feedback"
      hideCTA={true}
      noIndex={true}
    />
  );
}

export default FeedbackSubmit;
