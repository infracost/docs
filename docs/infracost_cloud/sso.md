---
slug: sso
title: Single sign-on (SSO)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud supports authenticating with Enterprise SSO providers.

## Setup SSO

Assuming you have already purchased Infracost Cloud, you can setup SSO by following these steps. Email [hello@infracost.io](mailto:hello@infracost.io) if you would like to enable SSO for proof-of-concept projects where many people are involved.
1. Go to [Infracost Cloud](https://dashboard.infracost.io) and sign up with your email and a password. You will delete this user after SSO is enabled.
2. From the top dropdown menu, switch to your company organization or create a new organization for your company.
3. Follow the applicable sections below to setup SSO, each option ends with a form where you enter your SSO details.
    <details>
      <summary>Microsft Entra ID</summary>
      <ol style={{'list-style-type': 'decimal'}}>
        <li>In the <a href="https://dashboard.infracost.io" target="_blank" rel="noopener noreferrer">Infracost Cloud
            dashboard</a> go to <code>Org Settings</code> and copy your <code>Org ID</code>. You will need to
          provide this to Infracost in a future step.</li>
        <li>Login to the <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer">Azure portal</a>
        </li>
        <li>Go to <code>Microsoft Entra ID &gt; Enterprise applications</code></li>
        <li>Click <code>New application</code></li>
        <li>Click <code>Create your own application</code></li>
        <li>For the name enter <code>Infracost Cloud</code></li>
        <li>Make sure 'Integrate any other application you don't find in the gallery (Non-gallery)' is selected.</li>
        <li>On the left select <code>Single sign-on</code> and select <code>SAML</code></li>
        <li>Click <code>Edit</code> in the Basic SAML Configuration section.</li>
        <li>Click <code>Add identifier</code> and enter <code>urn:auth0:infracost:&lt;YOUR INFRACOST ORG ID&gt;</code></li>
        <li>Click <code>Add reply URL</code> and enter <code>https://login.infracost.io/login/callback?connection=&lt;YOUR INFRACOST ORG ID&gt;</code></li>
        <li>Click <code>Save</code></li>
        <li>Download 'Certificate (Base64)'. You will need to provide this to Infracost in a future step.</li>
        <li>Copy the 'Login URL'. You will need to provide this to Infracost in the next step.</li>
        <li>Fill out the <a href="https://forms.gle/W9Hjm8xBgqQEtnwd7" target="_blank" rel="noopener noreferrer">SSO
            setup form here</a>, providing the Login URL, certificate and the domains you want
          enabled for SSO.</li>
      </ol>
    </details>
    <details>
      <summary>Okta</summary>
      <ol style={{'list-style-type': 'decimal'}}>
        <li>In the <a href="https://dashboard.infracost.io" target="_blank" rel="noopener noreferrer">Infracost Cloud
            dashboard</a> go to <code>Org Settings</code> and copy your <code>Org ID</code>. You will need to
          provide this to Infracost in a future step.</li>
        <li>Login to the Okta Admin dashboard</li>
        <li>Go to <code>Applications &gt; Applications</code></li>
        <li>Click <code>Create App Integration</code></li>
        <li>Select <code>SAML 2.0</code> and click Next.</li>
        <li>For the App name enter <code>Infracost Cloud</code> and click Next.</li>
        <li>For Single sign on URL enter
          <code>https://login.infracost.io/login/callback?connection=&lt;YOUR INFRACOST ORG ID&gt;</code>
        </li>
        <li>For the Audience URL (SP Entity ID) enter <code>urn:auth0:infracost:&lt;YOUR INFRACOST ORG ID&gt;</code><img
            loading="lazy" src="/docs/img/sso/okta-saml-settings.png" alt="Okta Attribute Statements form"
            class="img_ev3q" /></li>
        <li>Add the following for the Attribute Statements section and click Next.<img loading="lazy"
            src="/docs/img/sso/okta-attribute-statements.png" alt="Okta Attribute Statements form" class="img_ev3q" /></li>
        <li>Choose 'I'm an Okta customer adding an internal app' and click Finish</li>
        <li>In the Sign on tab, scroll down to the SAML Signing Certificates section. On the right-hand side click the
          button to View SAML setup instructions.</li>
        <li>Copy the Identity Provider Single Sign-On URL and download the certificate.</li>
        <li>Fill out the <a href="https://forms.gle/W9Hjm8xBgqQEtnwd7" target="_blank" rel="noopener noreferrer">SSO
            setup form here</a>, providing the Identity Provider Single Sign-On URL, certificate and the domain you
          want enabled for SSO.</li>
        <li>In the Okta Admin dashboard assign any users to the Infracost Cloud app. You can also add an Infracost
          button to your SSO portal as we support IdP-Initiated logins from Okta too.</li>
      </ol>
    </details>
    <details>
      <summary>Google Workspace</summary>
      <ol style={{'list-style-type': 'decimal'}}>
        <li>In the <a href="https://dashboard.infracost.io" target="_blank" rel="noopener noreferrer">Infracost Cloud
            dashboard</a> go to <code>Org Settings</code> and copy your <code>Org ID</code>. You will need this when
          setting up the SAML app in Google Workspace.</li>
        <li>Login to <a href="https://admin.google.com" target="_blank" rel="noopener noreferrer">Google Workspace
            admin</a></li>
        <li>Go to <code>Apps &gt; Web and mobile apps</code></li>
        <li>Click <code>Add app &gt; Add custom SAML app</code></li>
        <li>For the App name enter <code>Infracost Cloud</code></li>
        <li>Copy the SSO URL and download the Certificate. You will need to supply these to Infracost in a future step.
          Click Continue.</li>
        <li>In the ACS URL enter:
          <code>https://login.infracost.io/login/callback?connection=&lt;YOUR INFRACOST ORG ID&gt;</code>
        </li>
        <li>In the Entity ID enter: <code>urn:auth0:infracost:&lt;YOUR INFRACOST ORG ID&gt;</code></li>
        <li>Tick <code>Signed response</code></li>
        <li>For Name ID format choose <code>UNSPECIFIED</code> and for Name ID choose
          <code>Basic Information &gt; Primary email</code>. The form should look like the following:<img loading="lazy"
            src="/docs/img/sso/google-workspace-service-provider.png" alt="Google Workspace Service Provider form"
            class="img_ev3q" />
        </li>
        <li>Click Continue</li>
        <li>Add the following Attributes and click Finish:<img loading="lazy"
            src="/docs/img/sso/google-workspace-attributes.png" alt="Google Workspace Service Provider form"
            class="img_ev3q" /></li>
        <li>Fill out the <a href="https://forms.gle/W9Hjm8xBgqQEtnwd7" target="_blank" rel="noopener noreferrer">SSO
            setup form here</a>, providing the SSO URL, Certificate and the domain you want enabled for SSO.</li>
      </ol>
    </details>
    <details>
      <summary>Other SAML providers</summary>
      <ol style={{'list-style-type': 'decimal'}}>
        <li>In the <a href="https://dashboard.infracost.io" target="_blank" rel="noopener noreferrer">Infracost Cloud
            dashboard</a> go to <code>Org Settings</code> and copy your <code>Org ID</code>. You will need to
          provide this in the next step.</li>
        <li>Fill out the <a href="https://forms.gle/W9Hjm8xBgqQEtnwd7" target="_blank" rel="noopener noreferrer">SSO
            setup form here</a>, providing the SSO URL, certificate and the domain you want enabled for SSO.</li>
      </ol>
    </details>
4. Once we receive the form, we will email you to schedule a quick screenshare call to enable SSO. On the call, we will verify your SSO connection is configured correctly and delete the initial user that was created without SSO.

## SAML group mapping

Infracost Enterprise supports SAML group mapping, which allows you to map SAML groups to Infracost Cloud groups. This allows you to manage access to Infracost Cloud by managing SAML groups in your SAML provider.

To enable this feature you will need to provide the following information:
1. The full list of group names set up in your SAML provider, and how they should map to Infracost organizations and roles, e.g:

  | SAML group | Infracost organization slug | Infracost role |
  |------------|-----------------------------|----------------|
  | InfracostViewer | my-org | Org Viewer |
  | InfracostEditor | my-org | Org Editor |
  | InfracostAdmin | my-org | Org Admin |
  | InfracostOwner | my-org | Enterprise Admin |

  This supports all the Infracost roles listed in the [roles documentation](/docs/infracost_cloud/key_concepts/#team-management), as well as a special role `Enterprise Admin` which has access to all organizations in your enterprise account.
2. The attribute name in the SAML assertion that will contain the group names, for example `memberOf`.
3. If possible, an example of the SAML assertion that will be sent.

To enable SAML group mapping, please reach out to [hello@infracost.io](mailto:hello@infracost.io).

## SSO login notes

After SSO is configured:
- Anyone who enters an email address that contains your company domain name(s) in the [usual log in page](https://dashboard.infracost.io) will be redirected to your SSO provider for authentication.
- You can invite users to your Infracost Cloud organization from the Org Settings > Members page. They will also need to be added to the corresponding group in your SSO provider so they can login.
- If a user had already logged-in prior to SSO being enabled, on their first login after SSO is enabled, they will be asked to confirm if they want to link their login accounts. They must click "Continue" do this to be able to access your company's Infracost Cloud organization, otherwise a new empty organization will be created for them. If they skip this step, email [hello@infracost.io](mailto:hello@infracost.io) so we can assist you.
    <img src={useBaseUrl("img/infracost-cloud/auth0-account-link.png")} alt="Linking login accounts" width="80%" />
