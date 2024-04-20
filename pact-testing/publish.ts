import publisher from '@pact-foundation/pact-node';
import path from 'path';
const tags = ['dev'];

// config for pact broker
const PACT_BROKER_URL = process.env.PACT_BROKER_URL;
const PACT_BROKER_PASSWORD = process.env.PACT_BROKER_PASSWORD;
const PACT_BROKER_USERNAME = process.env.PACT_BROKER_USERNAME;
const PACT_SHA = process.env.PACT_SHA;
const PACT_BRANCH = process.env.PACT_BRANCH;
const PACT_TAG = process.env.PACT_TAG;

if (PACT_BRANCH) {
  tags.push(PACT_BRANCH);
}

if (PACT_TAG) {
  tags.push(PACT_TAG);
}

let opts = {
  providerBaseUrl: 'http://localhost:8080',
  pactFilesOrDirs: [
    path.resolve(process.cwd(), 'pacts')
  ],
  pactBroker: PACT_BROKER_URL,
  consumerVersion: PACT_SHA,
  pactBrokerUsername: PACT_BROKER_USERNAME,
  pactBrokerPassword: PACT_BROKER_PASSWORD,
  tags
};
publisher
  .publishPacts(opts)
  .then(() => console.log('Pact contract publishing complete!'))
  .catch(e => console.log('Pact contract publishing failed: ', e));
