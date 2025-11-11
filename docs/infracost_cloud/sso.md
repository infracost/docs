---
slug: sso
title: Single sign-on (SSO)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Infracost Cloud supports authenticating with Enterprise SSO providers. It is important that **all steps** in this page are implemented to ensure users are automatically provisioned based on your SAML user groups, and they can login using your SSO provider.

## Step 1: Setup SSO

Assuming you have already purchased Infracost Cloud, you can setup SSO by following these steps. Email [support@infracost.io](mailto:support@infracost.io) if you would like to enable SSO for proof-of-concept projects where many people are involved.
1. Go to [Infracost Cloud](https://dashboard.infracost.io) and sign up with your email and a password. You will delete this user after SSO is enabled.
2. From the top dropdown menu, switch to your company organization or create a new organization for your company.
3. Follow the applicable sections below to setup SSO, each option ends with you emailing us your SSO details.
    <details>
      <summary>Microsoft Entra ID</summary>
      <ol style={{'list-style-type': 'decimal'}}>
        <li>In the <a href="https://dashboard.infracost.io" target="_blank" rel="noopener noreferrer">Infracost Cloud
            dashboard</a> go to <code>Org Settings</code> and copy your <code>Org ID</code>. You will need to
          provide this to Infracost in a future step.</li>
        <li>Login to the <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer">Azure portal</a></li>
        <li>Go to <code>Microsoft Entra ID &gt; Enterprise applications</code></li>
        <li>Click <code>New application</code></li>
        <li>Click <code>Create your own application</code></li>
        <li>For the name enter <code>Infracost Cloud</code></li>
        <li>Make sure 'Integrate any other application you don't find in the gallery (Non-gallery)' is selected.</li>
        <li>On the left select <code>Single sign-on</code> and select <code>SAML</code></li>
        <li>Click <code>Edit</code> in the Basic SAML Configuration section.</li>
        <li>Click <code>Add identifier</code> and enter <code>urn:auth0:infracost:YOUR_INFRACOST_ORG_ID</code></li>
        <li>Click <code>Add reply URL</code> and enter <code>https://login.infracost.io/login/callback?connection=YOUR_INFRACOST_ORG_ID</code></li>
        <li>Click <code>Save</code></li>
        <li>Download 'Certificate (Base64)'. You will need to provide this to Infracost.</li>
        <li>Copy the 'Login URL'. You will need to provide this to Infracost in the next step.</li>
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
        <li>
          For Single sign on URL enter
          <code>https://login.infracost.io/login/callback?connection=YOUR_INFRACOST_ORG_ID</code>
        </li>
        <li>For the Audience URL (SP Entity ID) enter <code>urn:auth0:infracost:YOUR_INFRACOST_ORG_ID</code><img
            loading="lazy" src="/docs/img/sso/okta-saml-settings.png" alt="Okta Attribute Statements form"
            class="img_ev3q" /></li>
        <li>Add the following for the <code>Attribute Statements</code> section and click <code>Next</code>.<img loading="lazy"
            src="/docs/img/sso/okta-attribute-statements.png" alt="Okta Attribute Statements form" class="img_ev3q" /></li>
        <li>Choose <code>I'm an Okta customer adding an internal app</code> and click <code>Finish</code></li>
        <li>In the <code>Sign on</code> tab, scroll down to the <code>SAML Signing Certificates</code> section. On the right-hand side click the
          button to <code>View SAML setup instructions</code>.</li>
        <li>Copy the <code>Identity Provider Single Sign-On URL</code> and download the certificate.</li>
        <li>In the Okta Admin dashboard assign any users to the Infracost Cloud app. You can also add an Infracost button or icon to your SSO portal as we support IdP-Initiated logins from Okta too, save the following image to use for that:</li>
        <img src={useBaseUrl("img/small-logo.png")} width="128px" />
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
          <code>https://login.infracost.io/login/callback?connection=YOUR_INFRACOST_ORG_ID</code></li>
        <li>In the Entity ID enter: <code>urn:auth0:infracost:YOUR_INFRACOST_ORG_ID</code></li>
        <li>Tick <code>Signed response</code></li>
        <li>For Name ID format choose <code>UNSPECIFIED</code> and for Name ID choose
          <code>Basic Information &gt; Primary email</code>. The form should look like the following:<img loading="lazy"
            src="/docs/img/sso/google-workspace-service-provider.png" alt="Google Workspace Service Provider form"
            class="img_ev3q" /></li>
        <li>Click Continue</li>
        <li>Add the following Attributes and click Finish:<img loading="lazy"
            src="/docs/img/sso/google-workspace-attributes.png" alt="Google Workspace Service Provider form"
            class="img_ev3q" /></li>
      </ol>
    </details>

#### SSO login notes

After SSO is configured:
- SSO is enabled on your company domain name(s), such as `acme-inc.com`. So anyone who enters an email address that contains your company domain names in the [Infracost log in page](https://dashboard.infracost.io) will be redirected to your SSO provider for authentication.
- Once SSO is enabled, it becomes the only login method for your organization. Users removed from your SSO system will automatically lose access to Infracost Cloud.
- You can invite users to your Infracost Cloud organization from the `Org Settings > Members` page. They will also need to be added to the corresponding group in your SSO provider so they can login.
- If a user had already logged-in prior to SSO being enabled, on their first login after SSO is enabled, they will be asked to confirm if they want to link their login accounts. They must click `Continue` do this to be able to access your company's Infracost Cloud organization, otherwise a new empty organization will be created for them. If they skip this step, email [support@infracost.io](mailto:support@infracost.io) so we can assist you.
    <img src={useBaseUrl("img/infracost-cloud/auth0-account-link.png")} alt="Linking login accounts" width="80%" />
- For organizations using Okta: If users see the error "User is not assigned to this application" when signing in, it means they need to be added to the Okta Infracost app.

## Step 2: SAML group mapping

Infracost uses SAML to **provision users automatically** based on your user groups. This allows you to manage access to Infracost Cloud by managing SAML groups in your SAML provider, instead of inviting users individually to your Infracost Cloud account. With SAML groups, users are automatically provisioned when they sign-in for the first time; their roles are updated every time they sign-in.

To enable this feature you should:

1. Create SAML user groups in your SAML provider and put users in those groups. Infracost supports [four roles](/docs/infracost_cloud/key_concepts/#team-management) (`Viewer`, `Editor`, `Admin`, `Owner`); we recommend **two user groups** to start with: `Owner` for people who manage Infracost, and `Viewer` for all engineers.

  If you already have a SAML group that most engineers are part of (e.g. for GitHub), you should re-use that for the Infracost Viewer role. This enables them to see their repo's pre-existing issues and fix them.

  Users that are part of multiple groups will get the highest role from their group. For example, if a user is part of the InfracostViewer and InfracostEditor groups, they'll get the Editor role.

  If you have multiple organizations under an Infracost enterprise, the SAML groups can also be treated as global roles that span all orgs in the enterprise. For example, your engineering user group can be given the Viewer role, and your central FinOps team can be given the Owner role in all organizations that are part of your enterprise.

  After enabling SAML, you can send us a custom support URL or email address. This will be shown to users who sign in with SSO but aren't part of your SAML user groups. It helps guide these users on how to follow your company's process to join the correct SAML group and access Infracost Cloud.

2. Configure group claims in your SAML provider: The SAML assertion must include the relevant groups that the user belongs to, and it must be the group names that are sent, not the group IDs. The group claim field typically has one of these names:
   - `groups`
   - `roles`
   - `memberOf`
   - `http://schemas.microsoft.com/ws/2008/06/identity/claims/groups`
   - `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`

   Note the exact field name you configure as you'll need to provide this to Infracost in the next step.

   <details>
     <summary>Microsoft Entra ID</summary>
     For Microsoft Entra ID, follow the <a href="https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-fed-group-claims#emit-cloud-only-group-display-name-in-token" target="_blank" rel="noopener noreferrer">Emit cloud-only group display name in token</a> section in the Microsoft documentation. Specifically:
     <ul>
       <li>Set the Group Claims to 'Groups assigned to the application'</li>
       <li>Set the Source Attribute to 'Cloud-only group display names'</li>
     </ul>
   </details>

   <details>
     <summary>Okta</summary>
     For Okta, follow the <a href="https://support.okta.com/help/s/article/How-to-pass-a-user-s-group-membership-in-a-SAML-Assertion-from-Okta" target="_blank" rel="noopener noreferrer">How to pass a user's group membership in a SAML Assertion from Okta</a> article in the Okta documentation to configure group membership passing in your SAML assertions.
   </details>

## Step 3: Email us key setup information

1. Email us the following information:

  <details>
    <summary>Email template</summary>
    <pre>
      To: support@infracost.io<br/>
      Subject: Enable SSO & SAML<br/>
      Body:<br/><br/>
      Please enable SSO & SAML groups for our organization.<br/><br/>
      - Company name or Infracost Org ID: xxx<br/><br/>
      - SSO service provider: [Microsoft Entra ID, Okta, Google Workspace, Other SAML Provider]<br/><br/>
      - Identity Provider Single Sign-On URL: xxx<br/>
      - SSO domains (comma separated list of domains to enable for this SSO connection): xxx<br/>
      - The public certificate is attached: **Don't forget to attach it ;) **<br/><br/>
      - SAML group role mapping:<br/>
        | SAML group name | Infracost Org slug | Infracost role |<br/>
        |-----------------|--------------------|----------------|<br/>
        | AllEngineers    | my_org             | Org Viewer     |<br/>
        | InfracostEditor | my_org             | Org Editor     |<br/>
        | InfracostAdmin  | my_org             | Org Admin      |<br/>
        | InfracostOwner  | all orgs           | Org Owner      |<br/><br/>
      - SAML Assertion Group attribute: [This typically has one of these names: `groups`, `roles`, `memberOf`, `http://schemas.microsoft.com/ws/2008/06/identity/claims/groups`, or `http://schemas.microsoft.com/ws/2008/06/identity/claims/role`]<br/><br/>
      - If possible, an example of the SAML assertion that will be sent.<br/><br/>
      - How I'd like this enabled (Select one):<br/>
        A. Let's schedule a 10 minute screenshare to test and enable together for the fastest setup. Here are a few convenient times: XXX<br/>
        B. Enable initial SSO to test, but continue to allow existing login methods while we confirm everything is working<br/>
        C. Fully enable now, then let me know it's ready to test (WARNING: If there's a misconfiguration in your settings, it could lock your users out temporarily)<br/>
      <br/>
      Thanks!
    </pre>
  </details>

2. Once we receive your email, we will enable the SAML groups and reply back to you so you can verify that users are automatically provisioned correctly.

  Org Admins and Owners will still be able to delete users from Infracost Cloud to cleanup old users from the `Org Settings > Members` page. However, if those users login again, their users will be auto-provisioned again. If users are removed from your SSO system, or SAML groups, they will not be able to login.

3. In Infracost Cloud, go to `Settings > Org Settings > Custom Support`, and add an email address or a link to your internal wiki or chat channel. This should explain how team members can request access.

  This message will appear to anyone who signs in with SSO but isn’t part of your SAML groups — so they won’t get access until you add them to the right group on your side.
