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
          status: 200,
          body: 'Hello World',
        }).given('there is a request to /api')
        .uponReceiving('a response from /api')
        .withRequest({
          method: 'GET',
          path: '/api',
        })
        .willRespondWith({
          status: 200,
          body: { 
            message: 'Hello from API' 
          },
        });
    });

    it('sends a request to / according to contract', () => {
      return provider.executeTest((mockServer) => {
        return expect(httpClient({
          ROUTE: '/',
          method: 'GET',
          PORT: mockServer.port,
        })).resolves.toEqual({ 
          status: 200, 
          body: 'Hello World' 
        });
      });
    });

    it('sends a request to /api according to contract', () => {
      return provider.executeTest(async (mockServer) => {
        return expect(httpClient({
          ROUTE: '/api',
          method: 'GET',
          PORT: mockServer.port,
        })).resolves.toEqual({ 
          status: 200, 
          body: { 
            message: 'Hello from API' 
          } 
        });
      });
    });
  });
});
