const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface RequestConfig extends RequestInit {
  data?: any
}

async function request(endpoint: string, { data, ...customConfig }: RequestConfig = {}) {
  const headers = {
    'Content-Type': 'application/json',
  }

  const config: RequestConfig = {
    method: data ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config)
    const data = await response.json()
    
    if (response.ok) {
      return data
    }
    throw new Error(data.message)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const api = {
  get: (endpoint: string, config = {}) => request(endpoint, { ...config, method: 'GET' }),
  post: (endpoint: string, data: any) => request(endpoint, { data, method: 'POST' }),
  put: (endpoint: string, data: any) => request(endpoint, { data, method: 'PUT' }),
  delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
} 