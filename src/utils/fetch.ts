/* eslint-disable @typescript-eslint/no-explicit-any */
import { stringify } from 'query-string'

export interface ResponseApi {
  payload: any
  status: number
}

interface Fetch {
  url: string
  body?: any
  method?: string
  params?: any
  headers?: {
    [name: string]: string
  }
}

const {
  REACT_APP_API,
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRETS,
} = process.env

const defaultHeaders = {
  'Content-Type': 'application/json',
}
const esc = encodeURIComponent

export async function request({
  url,
  body,
  params,
  method = 'GET',
  headers = defaultHeaders,
}: Fetch): Promise<ResponseApi> {
  const response = await fetch(
    `${REACT_APP_API}${url}?${stringify({
      ...params,
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRETS,
    })}`,
    {
      method,
      body: JSON.stringify(body),
      headers,
    }
  )
  const data = await response.json()

  return response?.ok
    ? {
        payload: data,
        status: response.status,
      }
    : Promise.reject(response)
}
