import { Verifier } from '@pact-foundation/pact';

import { PROVIDER_NAME, pactFile } from '../pact';

import { app } from '../../server';

const HOST_NAME = 'localhost';
const PORT = 3000;

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
      pactUrls: [pactFile],
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
