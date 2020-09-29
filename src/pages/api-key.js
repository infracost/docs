import React from 'react';
import { Redirect } from '@docusaurus/router';

function ApiKey() {
  return <Redirect push to="/docs/#api-key" />;
}

export default ApiKey;
