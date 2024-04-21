import pact from '@pact-foundation/pact-node';

// config env vars for pact broker
const PACT_BROKER_URL = process.env.PACT_BROKER_URL ?? 'http://localhost:9292';
const PACT_BROKER_PASSWORD = process.env.PACT_BROKER_PASSWORD ?? 'password';
const PACT_BROKER_USERNAME = process.env.PACT_BROKER_USERNAME ?? 'user';
const CONSUMER = process.env.CONSUMER ?? 'myConsumer' ;
const CONSUMER_VERSION = process.env.CONSUMER_VERSION ?? '123456';
const PROVIDER = process.env.PROVIDER ?? 'myProvider';
const PROVIDER_VERSION = process.env.PROCESS_VERSION ?? 'abcdef'

console.log('here');
pact.canDeploy({
  pacticipants: [
    {
      name: CONSUMER,
      version: CONSUMER_VERSION,
    },
    {
      name: PROVIDER,
      version: PROVIDER_VERSION,
    }
  ],
  pactBroker: PACT_BROKER_URL,
  pactBrokerUsername: PACT_BROKER_USERNAME,
  pactBrokerPassword: PACT_BROKER_PASSWORD,
  output: 'json',
  retryWhileUnknown: 5,
  retryInterval: 10,
  verbose: true
}).then((result) => {
  console.log(JSON.stringify({ result }, null, 2));
  console.log('it succeeded');
}).catch((error) => {
  console.error(error);
  console.log('it failed');
  process.exit(1);
});
