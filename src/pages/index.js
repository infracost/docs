import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
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
  return (
    <Layout
      title="Cost estimates for Terraform"
      description="Cost estimates for Terraform - in your pull requests">
      <header className="hero hero--dark">
        <div className="container">
          <div className="row">
            <div className="col col--4">
              <p className="hero__title">Cost estimates for Terraform</p>
              <p className="hero__subtitle">In your pull requests</p>
              <div className="buttons">
                <Link
                  className="button button--primary button--lg"
                  to={useBaseUrl('getting_started')}>
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
                <img src={useBaseUrl("img/screenshot_hero.png")} alt="Infracost screenshot" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="home-section">
          <div class="container">
            <h2>AWS has over 300,000 prices 🤯</h2>
            <p>
              Developers don't know how much their cloud resources cost until they get the invoice at the end of the month.
              <br />
              We integrate with developers' existing workflows to show them costs as they code.
            </p>
          </div>
        </section>
        {supportedServices && supportedServices.length > 0 && (
          <section className="supported-services">
            <div className="container">
              <h3>Currently supports</h3>
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
