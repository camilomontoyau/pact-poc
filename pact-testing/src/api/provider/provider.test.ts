import { Verifier } from '@pact-foundation/pact';

import { PROVIDER_NAME, pactFile } from '../pact';

import { app } from '../../server';




const HOST_NAME = '127.0.0.1';
const PORT = 3000;

describe('Pact verfication', ()=>{
  before(()=> {
    app.listen(PORT, HOST_NAME, ()=>{
      console.log(`Server is running on http://${HOST_NAME}:${PORT}`);
    })
  })  
  after(()=> {
    app.close();
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
    })
    .catch(e => {
      console.log('Pact Verification Failed!')
      console.log(e)
    })
  });
});
