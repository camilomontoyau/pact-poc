import { httpClient } from "./httpClient";

import { provider } from '../pact';

describe('Pact with myProvider', () => {
  describe('API', () => {
    beforeEach(() => {
      /* 
        >>>>>>>>>>>>>>>>>>>>>> IMPORTANT <<<<<<<<<<<<<<<<<<<<<<<
        Don't create more than one interaction in a single test.
        >>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<
      */
      provider.given('there is a request to /api')
        .uponReceiving('a response from /api')
        .withRequest({
          method: 'GET',
          path: '/api',
        })
        .willRespondWith({
          headers: {
            "Content-Type": "application/json"
          },
          status: 200,
          body: { 
            message: 'Hello from API' 
          },
        });
    });


    it('sends a request to /api according to contract', () => {
      /* 
        >>>>>>>>>>>>>>>>>>>>>> IMPORTANT <<<<<<<<<<<<<<<<<<<<<<<
        Don't call the PACT mock server more than once in a test
        >>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<
      */
      return provider.executeTest(async (mockServer) => {
        const response = await httpClient({
          ROUTE: '/api',
          method: 'GET',
          PORT: mockServer.port,
        });
        console.log('response: ', response);
        return expect(response).toEqual({ 
          status: 200, 
          body: { 
            message: 'Hello from API' 
          } 
        });
      });
    });
  });
});
