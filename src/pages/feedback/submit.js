import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PageLayout from '../../components/PageLayout';

function FeedbackSubmit() {
  const { isClient } = useDocusaurusContext();
  const { siteConfig } = useDocusaurusContext();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const api = axios.create({
    baseURL: siteConfig.customFields.infracostDashboardApiEndpoint,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async function submitFeedback() {
    setSubmitSuccess(false);
    setSubmitError(null);

    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get('value');

    try {
      await api.post(`/event`, {
        event: 'infracost-feedback-submitted',
        env: {
          value,
        }
      });
      setSubmitSuccess(true);
    } catch(err) {
      let msg = "Unknown error";
      if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error;
      }
      setSubmitError(msg);
    }
  }

  useEffect(() => {
    if (isClient) {
      submitFeedback();
    }
  }, [isClient]);

  return (
    <PageLayout
        title="Feedback"
        description="Infracost is open source and free for the community."
        pageClass="feedback"
        hideCTA={true}>

      <div className="default-page-header">
        <div className="container">
          <div className="intro">
            {submitSuccess && (
              <>
                <h1 className="tagline">Thank you!</h1>
                <p className="sub-tagline">Your feedback has been submitted.</p>
              </>
            )}
            {submitError && (
              <>
                <h1 className="tagline">Error submitting feedback!</h1>
                <p className="sub-tagline">{submitError}</p>
              </>
            )}
          </div>
        </div>
      </div>

    </PageLayout>
  );
}

export default FeedbackSubmit;
