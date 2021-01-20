import React from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import LayoutHead from '@theme/LayoutHead';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SocialMentionCard from '../components/SocialMentionCard';


function Home() {
  return (
    <LayoutProviders>
      <LayoutHead
        title="Cloud cost estimates for Terraform in pull requests"
        description="Infracost shows cloud cost estimates for Terraform projects. It integrates into pull requests and allows developers and DevOps to see cost breakdowns and compare options upfront." />

      <AnnouncementBar />
      <div className="home">
        <Navbar />

        <div className="home-hero">
          <div className="container">
          <div className="logo-wrapper">
              <img className="logo" src="/img/logo.svg" alt="Infracost logo" />
            </div>

            <div className="hero-content">
              <div className="left">
                <h1 className="tagline">Cloud cost estimates for Terraform in pull requests</h1>
                <p className="description">Infracost is an open-source tool that helps DevOps and developers continuously reduce their cloud costs.</p>
                <a href="/docs/" className="button primary">Get started</a>
              </div>
              <div className="right">
                <div className="screenshot-wrapper">
                  <div className="image-wrapper">
                    <img src="/img/screenshots/pr-step-2.png" alt="Comment in pull request posted by Infracost" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="supported-services">
          <div className="container">
            <ul>
              <li><img src="/img/services/terraform.svg" alt="HashiCorp Terraform logo"/></li>
              <li><img src="/img/services/aws.svg" alt="Amazon Web Services logo"/></li>
              <li><img src="/img/services/google-cloud.svg" alt="Google Cloud logo"/></li>
              <li><img src="/img/services/github.svg" alt="GitHub logo"/></li>
              <li><img src="/img/services/gitlab.svg" alt="GitLab logo"/></li>
              <li><img src="/img/services/circleci.svg" alt="CircleCI logo"/></li>
              <li><img src="/img/services/bitbucket.svg" alt="Bitbucket logo"/></li>
            </ul>
          </div>
        </div>

        <div className="walkthrough">
          <div className="container">
            <div className="heading">
              <img src="/img/product-walkthrough-icon.svg" alt="Product walkthrough icon" />
              <h2>See the cost of each pull request</h2>
              <span className="subtitle">Infracost easily integrates into your CI/CD pipeline</span>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-content">
                  <span className="step-number">Step one</span>
                  <h3>Developer proposes a change to the infrastructure</h3>
                  <p>A developer makes changes to the infrastructure as code file, and creates a pull/merge request.</p>
                </div>
                <div className="step-screenshot">
                  <div className="image-wrapper">
                    <img src="/img/screenshots/pr-step-1.png" alt="Pull request showing code change to Terraform code" />
                  </div>
                </div>
              </div>

              <div className="step">
                <div className="step-content">
                  <span className="step-number">Step two</span>
                  <h3>Infracost calculates the cost of the change</h3>
                  <p>Infracost looks at the changes made to the Terraform file and shows the pre and post-change costs as a comment in the pull request: “This change will increase your bill by 27%”</p>
                </div>
                <div className="step-screenshot">
                  <div className="image-wrapper">
                    <img src="/img/screenshots/pr-step-2.png" alt="Comment in pull request posted by Infracost" />
                  </div>
                </div>
              </div>

              <div className="step">
                <div className="step-content">
                  <span className="step-number">Step three</span>
                  <h3>Team discusses the cost implication</h3>
                  <p>This enables engineering teams to see how much each pull request costs, and to peer review costs alongside the code.</p>
                </div>
                <div className="step-screenshot">
                  <div className="image-wrapper">
                    <img src="/img/screenshots/pr-step-3.png" alt="Discussion about cost impact of pull request" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="problems">
          <div className="container">
            <div className="heading">
              <img src="/img/problem-icon.svg" alt="Problem icon" />
              <h2>Cloud cost optimization for DevOps</h2>
              <span className="subtitle">How Infracost helps your team</span>
            </div>

            <div className="row gaps">
              <div className="column">
                <div className="box full-height">
                  <h3>Cloud costs are complex</h3>
                  <p>AWS alone has over 2 million prices. Infracost makes these prices understandable for engineering teams.</p>
                </div>
              </div>

              <div className="column">
                <div className="box full-height">
                  <h3>Costs are hidden from developers</h3>
                  <p>Infracost links the costs directly to lines of code so engineers can continuously reduce their cloud costs.</p>
                </div>
              </div>

              <div className="column">
                <div className="box full-height">
                  <h3>Analyzing cloud bills is too late</h3>
                  <p>Infracost shows costs upfront before resources are deployed so you don't need to wait for the cloud bill.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="social-mentions">
          <div className="container">
            <div className="heading">
              <img src="/img/social-icons.svg" alt="Twitter and LinkedIn logos" />
              <h2>We love what people are saying about Infracost</h2>
              <span className="subtitle">Don't just take our word for it…</span>
            </div>
            <div className="cards">
            <SocialMentionCard
                platform="twitter"
                name="Alexey Shabanov"
                subtitle="@ShabanovAlexey"
                profileUrl="https://twitter.com/ShabanovAlexey"
                profileImage="ShabanovAlexey.jpg"
                link="https://twitter.com/ShabanovAlexey/status/1305550128162496512"
              >
                This tool aims to calculate costs impact based on a terraform change. An amazing addition for your SRE process if you want to keep your costs under control. Only AWS for now.
              </SocialMentionCard>
              <SocialMentionCard
                platform="twitter"
                name="Hinnerk Haardt"
                subtitle="@HinnerkHaardt"
                profileUrl="https://twitter.com/HinnerkHaardt"
                profileImage="HinnerkHaardt.jpg"
                link="https://twitter.com/HinnerkHaardt/status/1291054512560627712"
              >
                I love this code quality metric:<br />
                »infracost GitHub action […] automatically adds a pull request comment showing the cost estimate diff«
              </SocialMentionCard>
              <SocialMentionCard
                platform="linkedin"
                name="Matthew Tovbin"
                subtitle="Mechanizing Minds…"
                profileImage="MatthewTovbin.jpg"
                profileUrl="https://www.linkedin.com/in/mttov/"
                link="https://www.linkedin.com/posts/activity-6751942384017383424-JgUL/"
              >
                Infracost is an outstanding tool and a must have for every Terraform project. It’s great to see it grow!
              </SocialMentionCard>
              <SocialMentionCard
                platform="twitter"
                name="Ayrton"
                subtitle="@ayrtonfreeman"
                profileImage="ayrtonfreeman.jpg"
                profileUrl="https://twitter.com/ayrtonfreeman"
                link="https://twitter.com/ayrtonfreeman/status/1334493975387004930"
              >
                Thank you very much to  <a href="https://twitter.com/infracost" target="_blank">@infracost</a> team who implemented an awesome terragrunt report from feedbacks in Github. :-)
              </SocialMentionCard>
              <SocialMentionCard
                platform="linkedin"
                name="Keith Baker"
                subtitle="DevOps and Cloud, …"
                profileImage="KeithBaker.jpg"
                profileUrl="https://www.linkedin.com/in/keefbaker/"
                link="https://www.linkedin.com/feed/update/urn:li:activity:6701174060807667713/?updateEntityUrn=urn%3Ali%3Afs_feedUpdate%3A%28V2%2Curn%3Ali%3Aactivity%3A6701174060807667713%29"
              >
                Ha! Very cool. Estimating your aws costs from a terraform plan.
              </SocialMentionCard>
              <SocialMentionCard
                platform="twitter"
                name="Jérémy DERUSSÉ"
                subtitle="@jderusse"
                profileImage="jderusse.jpg"
                profileUrl="https://twitter.com/jderusse"
                link="https://twitter.com/jderusse/status/1303828273747628032"
              >
                Just discovered <a href="https://github.com/infracost/infracost" target="_blank">https://github.com/infracost/infr…</a><br /><br />
                Shows hourly and monthly cost estimates for a Terraform project. <br /><br />
                Can also be used to automatically add a PR comment showing the cost estimate diff 😍
              </SocialMentionCard>
            </div>
          </div>
        </div>

        <div className="cta">
          <div className="container">
            <img src="/img/icon-primary.svg" alt="Infracost icon" />
            <p className="action">Download and try Infracost now</p>
            <a href="/docs" className="button primary">Get started</a>
          </div>
        </div>
      </div>

      <Footer />
    </LayoutProviders>
  );
}

export default Home;
