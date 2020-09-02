import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useThemeContext from '@theme/hooks/useThemeContext';

const supportedServices = [
  {
    title: 'Terraform',
    imageUrl: 'img/terraform-light.svg',
    darkImageUrl: 'img/terraform-dark.svg'
  },
  {
    title: 'AWS',
    imageUrl: 'img/aws-light.svg',
    darkImageUrl: 'img/aws-dark.svg'
  },
];

function SupportedService({imageUrl, darkImageUrl, title}) {
  const {isDarkTheme} = useThemeContext();
  const imgUrl = useBaseUrl(isDarkTheme ? darkImageUrl : imageUrl);
  return (
    <div className="col col--4">
      {imgUrl && (
        <div className="text--center">
          <img className="supported-service-image" src={imgUrl} alt={title} />
        </div>
      )}
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title="Cloud costs for developers"
      description="Description will go into a meta tag in <head />">
      <header className="hero hero--dark">
        <div className="container">
          <div className="row">
            <div className="col col--4">
              <p className="hero__title">Cloud costs<br />for developers</p>
              <p className="hero__subtitle">Integrated into your workflow</p>
              <div className="buttons">
                <Link
                  className="button button--primary button--lg"
                  to={useBaseUrl('docs/')}>
                  Get Started
                </Link>
                </div>
                <iframe
                  className="display--mobile-only"
                  src={`https://ghbtns.com/github-btn.html?user=infracost&repo=infracost&type=star&count=true&size=small`}
                  frameBorder="0"
                  scrolling="0"
                  width="92"
                  height="20"
                  title="Star Infracost on GitHub">  
                </iframe>
                <iframe
                  className="display--tablet"
                  src={`https://ghbtns.com/github-btn.html?user=infracost&repo=infracost&type=star&count=true&size=large`}
                  frameBorder="0"
                  scrolling="0"
                  width="135"
                  height="30"
                  title="Star Infracost on GitHub">  
                </iframe>
            </div>
            <div className="col col--8">
              <div className="hero__screenshot">
                <img src={useBaseUrl("img/screenshot.png")} alt="Infracost screenshot" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {supportedServices && supportedServices.length > 0 && (
          <section className="supported-services">
            <div className="container">
              <h3>Infracost is the missing checkout screen for developers buying cloud resources.<br></br>It analyzes your code and shows cost forecasts.</h3>
              <h4>Currently supports</h4>
              <div className="row">
                <div className="col col--2"></div>
                {supportedServices.map((props, idx) => (
                  <SupportedService key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
