import axios from "axios";

// Defaults to a locally running jiosaavn-api (see README). Override with
// VITE_API_HOST when building for a hosted API.
export const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:3001/api/';

const client = axios.create({
  baseURL: API_HOST,
  timeout: 15000,
});

interface ApiResponse<T> {
  success: boolean,
  data: T,
}

export async function GET<T>(url: string, params: Record<string, unknown> = {}): Promise<T> {
  const res = await client.get<ApiResponse<T>>(url, { params });
  if (!res.data?.success) {
    throw new Error(`Request to ${url} failed`);
  }
  return res.data.data;
}
