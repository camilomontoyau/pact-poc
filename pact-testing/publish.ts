import publisher from '@pact-foundation/pact-node';
import path from 'path';
const tags = ['dev'];

// config for pact broker
const PACT_BROKER_URL = process.env.PACT_BROKER_URL ?? 'http://localhost:9292';
const PACT_BROKER_PASSWORD = process.env.PACT_BROKER_PASSWORD ?? 'password';
const PACT_BROKER_USERNAME = process.env.PACT_BROKER_USERNAME ?? 'user';
const PACT_SHA = process.env.PACT_SHA ?? '123456';
const PACT_BRANCH = process.env.PACT_BRANCH ?? 'main';
const PACT_TAG = process.env.PACT_TAG ?? 'latest';
const PROVIDER_VERSION = process.env.PROVIDER_VERSION ?? 'abcde';

if (PACT_BRANCH) {
  tags.push(PACT_BRANCH);
}

if (PACT_TAG) {
  tags.push(PACT_TAG);
}

let opts = {
  providerBaseUrl: 'http://localhost:3000',
  pactFilesOrDirs: [
    path.resolve(process.cwd(), 'pacts')
  ],
  pactBroker: PACT_BROKER_URL,
  consumerVersion: PACT_SHA,
  providerVersion: PROVIDER_VERSION,
  pactBrokerUsername: PACT_BROKER_USERNAME,
  pactBrokerPassword: PACT_BROKER_PASSWORD,
  tags
};
publisher
  .publishPacts(opts)
  .then(() => console.log('Pact contract publishing complete!'))
  .catch(e => console.log('Pact contract publishing failed: ', e));
