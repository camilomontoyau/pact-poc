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
  
  try {
    const response = await fetch(`http://localhost:${PORT}${ROUTE}`, options);
    let finalResponse: string | Record<string, unknown>;
    try {
      finalResponse = await response.json()
    } catch (error) {
      finalResponse = await response.text()
    }

    return {
      status: response.status,
      body: finalResponse
    }
  } catch (error) {
    throw error
  }
}