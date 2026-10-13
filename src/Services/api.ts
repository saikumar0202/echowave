import axios from "axios";

// Audius public API (https://docs.audius.org). No key or backend needed.
// Override with VITE_API_HOST to use a specific discovery node.
export const API_HOST = import.meta.env.VITE_API_HOST || 'https://api.audius.co/v1/';

// Audius asks every request to identify the app.
export const APP_NAME = 'echowave';

const client = axios.create({
  baseURL: API_HOST,
  timeout: 15000,
  params: { app_name: APP_NAME },
});

interface ApiResponse<T> {
  data: T,
}

export async function GET<T>(url: string, params: Record<string, unknown> = {}): Promise<T> {
  const res = await client.get<ApiResponse<T>>(url, { params });
  if (res.data?.data === undefined) {
    throw new Error(`Request to ${url} failed`);
  }
  return res.data.data;
}

// Audio element source; the API redirects to a content node that serves it.
export const streamUrl = (trackId: string) =>
  `${API_HOST.replace(/\/?$/, '/')}tracks/${encodeURIComponent(trackId)}/stream?app_name=${APP_NAME}`;
