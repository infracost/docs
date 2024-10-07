---
slug: sso
title: Single sign-on (SSO)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud supports authenticating with Enterprise SSO providers; furthermore, users can automatically be provisioned based on your SAML user groups and permissions.

## Setup SSO

Assuming you have already purchased Infracost Cloud, you can setup SSO by following these steps. Email [hello@infracost.io](mailto:hello@infracost.io) if you would like to enable SSO for proof-of-concept projects where many people are involved.
1. Go to [Infracost Cloud](https://dashboard.infracost.io) and sign up with your email and a password. You will delete this user after SSO is enabled.
2. From the top dropdown menu, switch to your company organization or create a new organization for your company.
3. Follow the applicable sections below to setup SSO, each option ends with you emailing us your SSO details.
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
        <li>Download 'Certificate (Base64)'. You will need to provide this to Infracost.</li>
        <li>Copy the 'Login URL'. You will need to provide this to Infracost in the next step.</li>
        <li>Email us the following information with the certificate attached:
          <pre>
            To: hello@infracost.io<br/>
            Subject: Enable SSO<br/>
            Body:<br/><br/>
            Please enable SSO for our organization.<br/><br/>
            - Company name or Infracost Org ID: xxx<br/>
            - SSO provider: Microsoft Entra ID<br/>
            - Login URL: xxx<br/>
            - Tenant domains, either the email domain (example.com) or Microsoft tenant domain (example.onmicrosoft.com): xxx<br/>
            - The certificate is attached.<br/><br/>
            Thanks!
          </pre>
        </li>
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
        <li>Email us the following information with the certificate attached:
          <pre>
            To: hello@infracost.io<br/>
            Subject: Enable SSO<br/>
            Body:<br/><br/>
            Please enable SSO for our organization.<br/><br/>
            - Company name or Infracost Org ID: xxx<br/>
            - SSO provider: Okta<br/>
            - Identity Provider Single Sign-On URL: xxx<br/>
            - SSO domains (comma separated list of domains to enable for this SSO connection): xxx<br/>
            - The public certificate is attached.<br/><br/>
            Thanks!
          </pre>
          </li>
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
        <li>Email us the following information with the certificate attached:
          <pre>
            To: hello@infracost.io<br/>
            Subject: Enable SSO<br/>
            Body:<br/><br/>
            Please enable SSO for our organization.<br/><br/>
            - Company name or Infracost Org ID: xxx<br/>
            - SSO provider: Google Workspace<br/>
            - SSO URL: xxx<br/>
            - SSO domains (comma separated list of domains to enable for this SSO connection): xxx<br/>
            - The certificate is attached.<br/><br/>
            Thanks!
          </pre>
        </li>
      </ol>
    </details>
    <details>
      <summary>Other SAML providers</summary>
      <ol style={{'list-style-type': 'decimal'}}>
        <li>In the <a href="https://dashboard.infracost.io" target="_blank" rel="noopener noreferrer">Infracost Cloud
            dashboard</a> go to <code>Org Settings</code> and copy your <code>Org ID</code>. You will need to
          provide this in the next step.</li>
        <li>Email us the following information with the certificate attached:
          <pre>
            To: hello@infracost.io<br/>
            Subject: Enable SSO<br/>
            Body:<br/><br/>
            Please enable SSO for our organization.<br/><br/>
            - Company name or Infracost Org ID: xxx<br/>
            - SSO service provider: xxx<br/>
            - SSO URL: xxx<br/>
            - SSO domains (comma separated list of domains to enable for this SSO connection): xxx<br/>
            - The SSO certificate is attached.<br/><br/>
            Thanks!
          </pre>
        </li>
      </ol>
    </details>
4. Once we receive your email, we will email you to schedule a quick screenshare call to enable SSO. On the call, we will verify your SSO connection is configured correctly and delete the initial user that was created without SSO.

### SSO login notes

After SSO is configured:
- SSO is enabled on your company domain name(s), such as acme-inc.com. So anyone who enters an email address that contains your company domain names in the [Infracost log in page](https://dashboard.infracost.io) will be redirected to your SSO provider for authentication.
- Once SSO is enabled, users logging-in with Github/Google can continue to use those methods until you request us to enable the "Enforce SSO login" option. After that point, SSO will be the only way to login; thus when a user is removed from your SSO system, they will lose their access to Infracost Cloud.
- You can invite users to your Infracost Cloud organization from the Org Settings > Members page. They will also need to be added to the corresponding group in your SSO provider so they can login.
- If a user had already logged-in prior to SSO being enabled, on their first login after SSO is enabled, they will be asked to confirm if they want to link their login accounts. They must click "Continue" do this to be able to access your company's Infracost Cloud organization, otherwise a new empty organization will be created for them. If they skip this step, email [hello@infracost.io](mailto:hello@infracost.io) so we can assist you.
    <img src={useBaseUrl("img/infracost-cloud/auth0-account-link.png")} alt="Linking login accounts" width="80%" />
- For organizations using Okta: If users see the error "User is not assigned to this application" when signing in, it means they need to be added to the Okta Infracost app.

## SAML group mapping

Infracost can also **provision users automatically** based on your SAML user groups. This allows you to manage access to Infracost Cloud by managing SAML groups in your SAML provider, instead of inviting users individually to your Infracost Cloud account. With SAML groups, users are automatically provisioned when they sign-in for the first time; their roles are updated every time they sign-in.

To enable this feature you should:
1. Follow the above instructions to [Setup SSO](#setup-sso) first.
2. Create SAML user groups in your SAML provider and put users in those groups. Infracost supports [four roles](/docs/infracost_cloud/key_concepts/#team-management) (Viewer, Editor, Admin, Owner) so we recommend four user groups.

  If you already have a SAML group that most engineers are part of, you should consider re-using that for the Infracost Viewer role. This enables them to see their repo's pre-existing issues and fix them.

  Users that are part of multiple groups will get the highest role from their group. For example, if a user is part of the InfracostViewer and InfracostEditor groups, they'll get the Editor role.

  If you have multiple organizations under an Infracost enterprise, the SAML groups can also be treated as global roles that span all orgs in the enterprise. For example, your engineering user group can be given the Viewer role, and your central FinOps team can be given the Owner role in all organizations that are part of your enterprise.
3. Email us the following information

  <details>
    <summary>Email template</summary>
    <pre>
      To: hello@infracost.io<br/>
      Subject: Enable SAML groups<br/>
      Body:<br/><br/>
      Please enable SAML groups for our organization.<br/><br/>
      - Company name or Infracost Org ID: xxx<br/><br/>
      - SSO service provider: [Microsoft Entra ID, Okta, Google Workspace, Other SAML Provider]<br/><br/>
      - SAML group role mapping:<br/>
        | SAML group name | Infracost Org slug | Infracost role |<br/>
        |-----------------|--------------------|----------------|<br/>
        | AllEngineers    | my_org             | Org Viewer     |<br/>
        | InfracostEditor | my_org             | Org Editor     |<br/>
        | InfracostAdmin  | my_org             | Org Admin      |<br/>
        | InfracostOwner  | all orgs           | Org Owner      |<br/><br/>
      - The attribute name in the SAML assertion that will contain the group names, for example `memberOf`.<br/><br/>
      - If possible, an example of the SAML assertion that will be sent.<br/><br/>
      Thanks!
    </pre>
  </details>
4. Once we receive your email, we will email you to schedule a quick screenshare call to enable the SAML groups. On the call, we will verify that users are automatically provisioned correctly.

  On the call, if you choose to enable the "Enforce SSO login" option, Org Owners can still delete users from Infracost Cloud to cleanup old users from the Org Settings > Members page. However, if those users login again, their users will be auto-provisioned again.
5. After enabling SAML, you can send us a custom support URL. This URL will be shown to users who sign in with SSO but aren’t part of your SAML user groups. It helps guide these users on how to follow your company’s process to join the correct SAML group and access Infracost Cloud.
