import pact from '@pact-foundation/pact';
import path from 'path';

const Pact = pact.PactV3;

export const CONSUMER_NAME = 'myConsumer';
export const PROVIDER_NAME = 'myProvider';

export const pactFile = path.resolve(`./pacts/${CONSUMER_NAME}-${PROVIDER_NAME}.json`);

export const provider = new Pact({
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info',
  consumer: CONSUMER_NAME,
  provider: PROVIDER_NAME
});

export const consumerVersion = '1.0.0';
