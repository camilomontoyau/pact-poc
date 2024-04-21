import { Verifier } from '@pact-foundation/pact';

import { PROVIDER_NAME, pactFile, CONSUMER_NAME, consumerVersion } from '../pact';

import { app } from '../../server';

const HOST_NAME = 'localhost';
const PORT = 3000;
const PACT_BROKER_URL = process.env.PACT_BROKER_URL ?? 'http://localhost:9292';
const PACT_BROKER_PASSWORD = process.env.PACT_BROKER_PASSWORD ?? 'password';
const PACT_BROKER_USERNAME = process.env.PACT_BROKER_USERNAME ?? 'user';

let server: any;


describe('Pact verfication', ()=>{
  beforeAll(()=> {
    server = app.listen(PORT, HOST_NAME, ()=>{
      console.log(`Server is running on http://${HOST_NAME}:${PORT}`);
    })
  })  
  afterAll(()=> {
    server.close();
  })

  it('should validate the pact', async () => {
    return await new Verifier({
      provider: PROVIDER_NAME,
      providerBaseUrl: `http://${HOST_NAME}:${PORT}`,
      pactUrls: ['http://localhost:9292/pacts/provider/myProvider/consumer/myConsumer/version/123456'],
      pactBrokerUrl: PACT_BROKER_URL,
      pactBrokerUsername: PACT_BROKER_USERNAME,
      pactBrokerPassword: PACT_BROKER_PASSWORD,
    }).verifyProvider()
    .then(output => {
      console.log('Pact Verification Complete!')
      console.log(output)
      expect(output).toBe('finished: 0')
    })
    .catch(e => {
      expect(e).toBeFalsy();
      console.log('Pact Verification Failed!')
      console.log(e)
    })
  });
});
