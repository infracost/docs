import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
  const {isClient} = useDocusaurusContext();
  const {isDarkTheme} = useThemeContext();
  const imgUrl = useBaseUrl(isDarkTheme ? darkImageUrl : imageUrl);
  return (
    <div className="col col--4">
      {imgUrl && (
        <div className="text--center">
          <img className="supported-service-image" key={isClient} src={imgUrl} alt={title} />
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
                  to={useBaseUrl('docs/')}>
                  Get Started
                </Link>
                </div>
                <p class="open-source-label">Infracost is <strong>free</strong> and <strong>open-source</strong></p>
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
                <img src={useBaseUrl("img/screenshot-hero.png")} alt="Infracost screenshot" />
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

        <section className="home-section steps">
          <div class="container">
            <h2>Bringing costs into system development</h2>
            <div className="row step">
              <div class="col col--4 step-text">
                <h3><span class="step-no">1.</span> Developer proposes a change to the infrastructure</h3>
              </div>
              <div class="col col--8 screenshot-col">
                <img src={useBaseUrl("img/pr-step-1.png")} class="step-screenshot" alt="Infracost pull request step 1" />
              </div>
            </div>
            <div className="row step">
              <div class="col col--4 step-text">
                <h3><span class="step-no">2.</span> Infracost shows the cost estimate of the change as a comment in the pull request</h3>
              </div>
              <div class="col col--8 screenshot-col">
                <img src={useBaseUrl("img/pr-step-2.png")} class="step-screenshot" alt="Infracost pull request step 2" />
              </div>
            </div>
            <div className="row step">
              <div class="col col--4 step-text">
                <h3><span class="step-no">3.</span> Team discusses the cost implications</h3>
              </div>
              <div class="col col--8 screenshot-col last">
                <img src={useBaseUrl("img/pr-step-3.png")} class="step-screenshot" alt="Infracost pull request step 3" />
              </div>
            </div>
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
