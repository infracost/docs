import React from 'react';
import PageLayout from '../components/PageLayout';
import Check from '../components/icons/Check';
import SocialMentionCard from '../components/SocialMentionCard';
import UsedBy from '../components/UsedBy';


function Home() {
  return (
    <PageLayout
        title="Cloud cost estimates for Terraform in pull requests"
        description="Infracost helps engineers see cloud costs before launching resources. Map costs to code directly in pull requests. Take action directly in your workflow."
        pageClass="home">

      <div className="home-hero">
        <div className="container">
        <div className="logo-wrapper">
            <img className="logo" src="/img/logo.svg" alt="Infracost logo" />
          </div>

          <div className="hero-content">
            <div className="left">
              <h1 className="tagline">Love your cloud bill! <span className="emojis">💰📉</span></h1>
              <p className="description">Cloud cost estimates for Terraform in pull requests</p>
              <a href="/docs/" className="button primary">Get started</a>
              <div className="labels">
                <p className="label"><span className="icon"><Check size={18} /></span>Open source</p>
                <p className="label"><span className="icon"><Check size={18} /></span>Backed by Y Combinator &amp; Sequoia</p>
              </div>
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

      <UsedBy />

      <div className="walkthrough">
        <div className="container">
          <div className="heading">
            <img src="/img/icons/product-walkthrough-icon.svg" alt="Product walkthrough icon" />
            <h2>Show the cloud cost of each Infrastructure change in CI/CD</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-content">
                <h3>Cost visibility for engineering</h3>
                <p>Infracost scans for Terraform code changes and checks over 3 million prices to create a simple, understandable cost estimate before any resources are launched.</p>
              </div>
              <div className="step-screenshot">
                <div className="image-wrapper">
                  <img src="/img/screenshots/pr-step-1.png" alt="Pull request showing code change to Terraform code" />
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-content">
                <h3>Directly in developer workflow</h3>
                <p>Infracost integrates into CI/CD so everyone knows the cost impact of changes without leaving the workflow.</p>
              </div>
              <div className="step-screenshot">
                <div className="image-wrapper">
                  <img src="/img/screenshots/pr-step-2.png" alt="Comment in pull request posted by Infracost" />
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-content">
                <h3>Cloud cost policies and guardrails</h3>
                <p>Infracost integrates with Open Policy Agent, Sentinel and Conftest, enabling DevOps teams to set best practices as policies.</p>
              </div>
              <div className="step-screenshot">
                <div className="image-wrapper">
                  <img src="/img/screenshots/pr-step-3.png" alt="Discussion about cost impact of pull request" />
                </div>
              </div>
            </div>

            <div className="step">
              <div className="step-content">
                <h3>Scenario modeling &amp; what-if analysis</h3>
                <p>Infracost automatically creates detailed, shareable cost estimates which can be sent to clients and managers with different scenarios.</p>
              </div>
              <div className="step-screenshot">
                <div className="image-wrapper">
                  <img src="/img/screenshots/pr-step-4.png" alt="Infracost cost shareable estimate report" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="supported-services">
        <div className="container">
          <ul>
            <li><img src="/img/services/hashicorp.svg" alt="HashiCorp logo"/></li>
            <li><img src="/img/services/aws.svg" alt="Amazon Web Services logo"/></li>
            <li><img src="/img/services/azure.svg" alt="Microsoft Azure logo"/></li>
            <li><img src="/img/services/google-cloud.svg" alt="Google Cloud logo"/></li>
            <li><img src="/img/services/github.svg" alt="GitHub logo"/></li>
            <li><img src="/img/services/gitlab.svg" alt="GitLab logo"/></li>
            <li><img src="/img/services/circleci.svg" alt="CircleCI logo"/></li>
            <li><img src="/img/services/bitbucket.svg" alt="Bitbucket logo"/></li>
            <li><img src="/img/services/jenkins.svg" alt="Jenkins logo"/></li>
            <li><img src="/img/services/terraform.svg" alt="HashiCorp Terraform logo"/></li>
          </ul>
        </div>
      </div>

      <div className="social-mentions">
        <div className="container">
          <div className="heading">
            <img src="/img/icons/social-icons.svg" alt="Twitter and LinkedIn logos" />
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

    </PageLayout>
  );
}

export default Home;
