import React from 'react';
import WorksWithSection from './WorksWithSection';
import { ColourCoding } from '../../pages/products';

import './WorksWith.css';

const WorksWith = () => {
  const Separator = () => (
    <div className="works-with__sections-separator-wrapper">
      <div className="works-with__sections-separator"></div>
    </div>
  );

  const ComingSoon = () => (
    <div className="works-with__coming-soon">Coming soon</div>
  );
  return (
    <div className="works-with">
      <div className="works-with__sections">
        <WorksWithSection
          label="Supported Clouds"
          colourCoding={ColourCoding.cloud}
        >
          <div className="works-with__logos-row">
            <img
              src="/img/services/aws.svg"
              width="60"
              height="36.5"
              alt="AWS"
            />
          </div>
          <div className="works-with__logos-row">
            <img
              src="/img/services/google-cloud.svg"
              width="180"
              height="28"
              alt="Google Cloud Platform"
            />
          </div>
          <div className="works-with__logos-row">
            <img
              src="/img/services/azure.svg"
              width="100"
              height="32"
              alt="Microsoft Azure"
            />
          </div>
        </WorksWithSection>
        <Separator />
        <WorksWithSection
          label="Supported CI/CD systems"
          colourCoding={ColourCoding['ci-cd']}
        >
          <div className="works-with__logos-row">
            <img
              src="/img/services/github.svg"
              width="72"
              height="32"
              alt="Github"
            />
            <img
              src="/img/services/gitlab.svg"
              width="104"
              height="32"
              alt="Gitlab"
            />
            <img
              src="/img/services/bitbucket.svg"
              width="130"
              height="32"
              alt="BitBucket"
            />
          </div>
          <div className="works-with__logos-row">
            <img
              src="/img/services/azure-pipelines.png"
              width="150"
              height="32"
              alt="Microsoft Azure Pipelines"
            />
            <img
              src="/img/services/jenkins.svg"
              width="133"
              height="32"
              alt="Jenkins"
            />
          </div>
          <div className="works-with__logos-row">
            <img
              src="/img/services/circleci.svg"
              width="110"
              height="36"
              alt="Circle CI"
            />
            <img
              src="/img/services/atlantis.png"
              width="122"
              height="36"
              alt="Atlantis"
            />
          </div>
        </WorksWithSection>
        <Separator />
        <WorksWithSection
          label="Supported IaC Providers"
          colourCoding={ColourCoding.providers}
        >
          <div className="works-with__logos-row">
            <img
              src="/img/services/terraform.svg"
              width="145"
              height="35"
              alt="Terraform"
            />
          </div>
          <div
            className="works-with__logos-row "
            // reduce the white space to make the logo appear evenly spaced
            style={{ marginTop: '-0.75rem' }}
          >
            <img
              src="/img/services/aws-cloud-formation.svg"
              width="224"
              height="50"
              alt="AWS CloudFromation"
            />
            <ComingSoon />
          </div>
          <div
            className="works-with__logos-row"
            // reduce the white space to make the logo appear evenly spaced
            style={{ marginTop: '-0.25rem' }}
          >
            <img
              src="/img/services/pulumi.svg"
              width="114"
              height="28"
              alt="Pulumi"
            />
            <ComingSoon />
          </div>
        </WorksWithSection>
      </div>
    </div>
  );
};

export default WorksWith;
