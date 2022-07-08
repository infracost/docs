import React from 'react';
import PageLayout from '../components/PageLayout';
import Check from '../components/icons/Check';


function UseCases() {
  return (
    <PageLayout
        title="Use Cases"
        description="Infracost is used by organizations to gain cost visibility for engineering teams, set proactive cloud cost policies and help build budget scenarios"
        pageClass="use-cases">

      <div className="use-cases-background"></div>

      <div className="use-cases-wrapper">
        <div className="intro">
          <div className="container">
            <h1 className="tagline">How companies are using Infracost</h1>
          </div>
        </div>

        <div className="use-cases-list">
          <div className="container">
            <div className="use-case">
              <h3>
                <img src="/img/icons/visibility-icon.svg" />
                <span>Understand cost changes before any resources are launched</span>
              </h3>
              <div className="box">
                <div className="use-case-content">
                  <div>
                    <p>As organizations scale, it becomes hard to have a single DevOps team managing all the infrastructure requirements of all product teams. Instead, they opt for using Infrastructure as Code (IaC) to create a set of easy to use modules which are managed by the central operations/platform team and used by the rest of the organization as and when infrastructure is needed.</p>
                    <p>The problem they face is that the lack of cost visibility and understanding of what infrastructure is about to be launched and its cost implications cause high cloud bills and ballooning budgets.</p>
                  </div>
                  <div className="screenshot">
                    <div className="image-wrapper">
                      <img src="/img/screenshots/pr-step-2.png" alt="Comment in pull request posted by Infracost" />
                    </div>
                  </div>
                </div>
                <div className="benefits">
                  <h4>Infracost benefits:</h4>
                  <ul>
                  <li>
                    <span className="icon primary"><Check size={18} /></span>
                    <span>
                      <span className="benefit-label">Cost visibility for team leads, managers &amp; FinOps:</span>
                      <span>You can see all pull requests that increase/decrease costs the most, how much by, and who made the change. This helps you better understand when & where cost changes were introduced as well as upcoming changes.</span>
                    </span>
                  </li>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Increased cost awareness:</span>
                        <span>Engineers are shown the estimated cost of infrastructure upfront, before any resources are launched or changed. They can make economical choices while keeping software delivery speeds up.</span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Reduced infrastructure re-work:</span>
                        <span>Infracost sits in the workflow (CI/CD) and provides the information needed to make the right decisions. Budgets are not broken and less re-work is required to fix infrastructure to align with budgets post launch.</span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Aligned budgets and costs:</span>
                        <span>If the changes to infrastructure or the launch of a new product break budgets, communication can happen in advance, not after the bill arrives.</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="use-case">
              <h3>
                <img src="/img/icons/approval-icon.svg" />
                <span>Proactive cloud cost policies</span>
              </h3>
              <div className="box">
                <div className="use-case-content">
                  <div>
                    <p>The central DevOps and platform teams have built up a lot of knowledge and best practices as they have created and scaled infrastructure. Although self service has enabled quick launch of infrastructure for all product and engineering teams, setting up guardrails and policies from a central place, will help them to stay within these guidelines.</p>
                  </div>
                  <div className="screenshot">
                    <div className="image-wrapper">
                      <img src="/img/screenshots/pr-step-3.png" alt="Discussion about cost impact of pull request" />
                    </div>
                  </div>
                </div>
                <div className="benefits">
                  <h4>Infracost benefits:</h4>
                  <ul>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Team lead awareness:</span>
                        <span>All changes can happen as and when needed, however when a budget breaking change comes up, the change is paused till a team lead or a senior member of the team has reviewed and approved it.</span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Knowledge transfer:</span>
                        <span>Best practices which might be nuanced but important can be written into policies and scaled to all teams. For example, a policy can say: the cost of Input/Output operations should not be higher than the cost of the virtual machine.</span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Clear communication:</span>
                        <span>There is automated and clear communication between engineering, product and managers, who can then relay it to finance when budgets are going to be breached for good reason.</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            <div className="use-case">
              <h3>
                <img src="/img/icons/choices-icon.svg" />
                <span>Consultants helping clients adopt and scale on cloud</span>
              </h3>
              <div className="box">
                <div className="use-case-content">
                  <div>
                    <p>Consultants are usually tasked with helping clients navigate the multitude of cloud services available, and to design, implement and maintain cloud strategies on behalf of their clients. A significant part of this work is the cost-benefit analysis.</p>
                  </div>
                  <div className="screenshot">
                    <div className="image-wrapper">
                      <img src="/img/screenshots/pr-step-4.png" alt="Infracost cost shareable estimate report" />
                    </div>
                  </div>
                </div>
                <div className="benefits">
                  <h4>Infracost benefits:</h4>
                  <ul>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Scenario modeling and what-if analysis:</span>
                        <span>A client can be given multiple options and what-if scenarios with a detailed cost estimate breakdown. The clients can make cost aware decisions, and keep within their budgets.</span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Faster delivery:</span>
                        <span>As Infrastructure as Code is written, the cost estimation and forecasting of the project is automated and delivered with no overhead. As changes are proposed, cost estimates are kept up to date and live.</span>
                      </span>
                    </li>
                    <li>
                      <span className="icon primary"><Check size={18} /></span>
                      <span>
                        <span className="benefit-label">Enable cost understanding:</span>
                        <span>Clients understand what levers they can pull to reduce costs, and the impact of those decisions. For example, how much would a Highly Available setup cost.</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </PageLayout>
  );
}

export default UseCases;
