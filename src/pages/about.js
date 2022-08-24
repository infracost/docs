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
            <h3>Team</h3>
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

              <div className="profile">
                <div className="profile-image">
                  <img src="/img/about/tim.jpg" alt="Tim" />
                </div>
                <span className="name">Tim McFadden</span>
                <div className="social">
                  <a className="linkedin" href="https://www.linkedin.com/in/tim-mcfadden-92672633/" target="_blank" aria-label="Tim's LinkedIn">
                    <span className="icon"><LinkedInIcon /></span>
                  </a>
                </div>
              </div>

              <div className="profile">
                <div className="profile-image">
                  <img src="/img/about/vadim.jpg" alt="Vadim" />
                </div>
                <span className="name">Vadim Golub</span>
                <div className="social">
                  <a className="twitter" href="https://twitter.com/vdmgolub" target="_blank" aria-label="Vadim's Twitter">
                    <span className="icon"><TwitterIcon /></span>
                  </a>
                  <a className="linkedin" href="https://www.linkedin.com/in/vdmgolub/" target="_blank" aria-label="Vadim's LinkedIn">
                    <span className="icon"><LinkedInIcon /></span>
                  </a>
                </div>
              </div>

              <div className="profile">
                <div className="profile-image">
                  <img src="/img/about/hugo.jpg" alt="Hugo" />
                </div>
                <span className="name">Hugo Rut</span>
                <div className="social">
                  <a className="twitter" href="https://twitter.com/hugo_rut" target="_blank" aria-label="Hugo's Twitter">
                    <span className="icon"><TwitterIcon /></span>
                  </a>
                  <a className="linkedin" href="https://www.linkedin.com/in/hugo-rut-13111680/" target="_blank" aria-label="Hugo's LinkedIn">
                    <span className="icon"><LinkedInIcon /></span>
                  </a>
                </div>
              </div>
            </div>

            <p>Hassan, Ali and Alistair have been working together in the cloud computing space since 2012. Their experience is wide-reaching from founding multiple startups and leading them through acquisitions, to creating highly scalable software used by enterprises including Sony, Samsung, PBS, Disney, Netflix and Forbes. Tim joined the team as the first Infracost engineer in 2021, soon followed by Vadim and Hugo.</p>

            <p className="contact">Contact us: <a href="mailto:hello@infracost.io" target="_blank">hello@infracost.io</a></p>
          </div>

          <div className="backers">
            <div className="container">
              <p className="tagline">Backed by</p>
              <div className="backer-list">
                <div className="backer-item">
                  <a href="https://www.ycombinator.com/companies/infracost" target="_blank" aria-label="Infracost's profile on Y Combinator's website"><img src="/img/investors/yc_aligned.svg" alt="Y Combinator logo" /></a>
                </div>
                <div className="backer-item">
                  <a href="https://www.sequoiacap.com/companies/infracost/" target="_blank" aria-label="Infracost's profile on Sequoia's website"><img src="/img/investors/sequoia_aligned.svg" alt="Sequoia logo" /></a>
                </div>
                <div className="backer-item">
                  <img src="/img/investors/mango_aligned.svg" alt="Mango Capital logo" />
                </div>
                <div className="backer-item">
                  <img src="/img/investors/sv_angel_aligned.svg" alt="SV Angel logo" />
                </div>
              </div>
            </div>
          </div>

          <div className="contributors">
            <div className="container">
              <p className="tagline">Some of our open source contributors</p>
              <img src="https://contrib.rocks/image?repo=infracost/infracost" alt="Infracost's contributors" />
            </div>
          </div>
        </div>

    </PageLayout>
  );
}

export default About;
