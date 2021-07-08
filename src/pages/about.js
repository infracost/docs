import React from 'react';
import PageLayout from '../components/PageLayout';
import TwitterIcon from '../components/icons/TwitterIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';


function About() {
  return (
    <PageLayout
        title="About"
        description="Infracost exists to empower engineering teams to use cloud infrastructure economically and efficiently."
        pageClass="about">

        <div className="intro">
          <div className="container">
            <h1 className="tagline">Infracost exists to empower engineering teams to use cloud infrastructure economically and efficiently</h1>
          </div>
        </div>

        <div className="team">
          <div className="container">
            <div className="profiles">
              <div className="profile">
                <div className="profile-image">
                  <img src="/img/about/hassan.jpg" alt="Hassan" />
                </div>
                <span className="name">Hassan Khajeh-Hosseini</span>
                <div className="social">
                  <a className="twitter" href="https://twitter.com/hassankhosseini" target="_blank" aria-label="Hassan's Twitter">
                    <span className="icon"><TwitterIcon /></span>
                  </a>
                  <a className="linkedin" href="https://www.linkedin.com/in/hassanhosseini/" target="_blank" aria-label="Hassan's LinkedIn">
                    <span className="icon"><LinkedInIcon /></span>
                  </a>
                </div>
              </div>

              <div className="profile">
                <div className="profile-image">
                  <img src="/img/about/ali.jpg" alt="Ali" />
                </div>
                <span className="name">Ali Khajeh-Hosseini</span>
                <div className="social">
                  <a className="twitter" href="https://twitter.com/alikhajeh" target="_blank" aria-label="Ali's Twitter">
                    <span className="icon"><TwitterIcon /></span>
                  </a>
                  <a className="linkedin" href="https://www.linkedin.com/in/alikhajeh1/" target="_blank" aria-label="Ali's LinkedIn">
                    <span className="icon"><LinkedInIcon /></span>
                  </a>
                </div>
              </div>

              <div className="profile">
                <div className="profile-image">
                  <img src="/img/about/alistair.jpg" alt="Alistair" />
                </div>
                <span className="name">Alistair Scott</span>
                <div className="social">
                  <a className="twitter" href="https://twitter.com/aliscott" target="_blank" aria-label="Alistair's Twitter">
                    <span className="icon"><TwitterIcon /></span>
                  </a>
                  <a className="linkedin" href="https://www.linkedin.com/in/aiscott/" target="_blank" aria-label="Alistair's LinkedIn">
                    <span className="icon"><LinkedInIcon /></span>
                  </a>
                </div>
              </div>
            </div>

            <p>Hassan, Ali and Alistair have been working together in the cloud computing space since 2012. Their experience is wide-reaching from founding multiple startups and leading them through acquisitions, to creating highly scalable software used by enterprises including Sony, Samsung, PBS, Disney, Netflix and Forbes.</p>

            <p><a href="https://www.notion.so/infracost/Join-the-team-6512e4f4a89d4fc5b7a112583c0a1c3c">Join us</a> on our mission to help developers fall in love with their cloud bills! </p>

            <p className="contact">Contact us: <a href="mailto:hello@infracost.io" target="_blank">hello@infracost.io</a></p>

          </div>

          <div className="backers">
            <div className="container">
              <p className="tagline">Backed by</p>
              <span className="backer">
                <img src="/img/yc.svg" alt="Y Combinator logo" />
                <span>Combinator</span>
              </span>
            </div>
          </div>
        </div>

    </PageLayout>
  );
}

export default About;
