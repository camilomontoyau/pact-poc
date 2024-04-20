type HttpClientArgs = {
  ROUTE: string
  method: string
  body?: any
  headers?: Record<string, string>
  PORT?: number
}

export const httpClient = async ({ ROUTE, method, body, headers, PORT }: HttpClientArgs) => {
  try {
    const response = await fetch(`http://localhost:${PORT}${ROUTE}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    })
    let finalResponse: string | Record<string, unknown>
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