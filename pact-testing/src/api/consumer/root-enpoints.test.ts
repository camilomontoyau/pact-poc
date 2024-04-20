import { httpClient } from "./httpClient";

import { provider } from '../pact';

describe('Pact with myProvider', () => {
  describe('API', () => {
    beforeEach(() => {
      provider.given('there is a request to /')
        .uponReceiving('a response from /')
        .withRequest({
          method: 'GET',
          path: '/',
        })
        .willRespondWith({
          headers: {
            "Content-Type": "application/json"
          },
          status: 200,
          body: { message: 'Hello World' },
        });
    });

    it('sends a request to / according to contract', () => {
      return provider.executeTest(async (mockServer) => {
        const response = await httpClient({
          ROUTE: '/',
          method: 'GET',
          PORT: mockServer.port,
        });
        console.log('response: ', response);
        return expect(response).toEqual({ 
          status: 200, 
          body: {
            message: 'Hello World'
          }
        });
      });
    });
  });
});
