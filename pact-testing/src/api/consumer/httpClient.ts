type HttpClientArgs = {
  ROUTE: string
  method: string
  body?: any
  headers?: Record<string, string>
  PORT?: number
}

type HttpClientOptions = {
  method: string
  headers?: Record<string, string>
  body?: any
}

export const httpClient = async ({ ROUTE, method, body, headers, PORT }: HttpClientArgs) => {
  const options: HttpClientOptions = {
    method,
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  if (headers) {
    options.headers = {
      ...headers
    }
  }

  const url = `http://localhost:${PORT}${ROUTE}`;
  console.log('url: ', url);
  
  try {
    const response = await fetch(url, options);
    let finalResponse: string | Record<string, unknown>;
    try {
      finalResponse = await response.json();
    } catch (error) {
      finalResponse = await response.text();
    }

    return {
      status: response.status,
      body: finalResponse
    }
  } catch (error) {
    console.error('httpClient error: ', error);
    throw error;
  }
}