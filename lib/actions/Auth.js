'use server';
import { cookies as serverCookies } from 'next/headers';
import { loginSchema } from '../schemas';
import axios from 'axios';
import { redirect } from 'next/navigation';

// Create API Client
export const createApiClient = async (post = false, data = null, file = false) => {
  const api = axios.create({ baseURL: process.env.BASE_URL });

  api.interceptors.request.use(
    async (config) => {
      const cookieStore = serverCookies();
      const accessToken = cookieStore.get('accessToken')?.value;
      const jwtToken = cookieStore.get('jwtToken')?.value;

      if (accessToken && jwtToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.JWTAUTH = `Bearer ${jwtToken}`;
        if (post) {
          config.headers['Content-Type'] = file ? 'multipart/form-data' : 'application/json';
          config.data = file ? data : JSON.stringify(data);
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};

// Login Function
export const login = async (state, formData) => {
  // Validate Input
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { username, password } = result.data;
  try {
    const apiClient = axios.create({ baseURL: process.env.BASE_URL, headers: { 'Content-Type': 'application/json' } });

    const response = await apiClient.post('/auth/login', { username, password });
    const { details } = response.data;
    const { access_token, refresh_token, jwt_token, expires_in } = details;

    // Set Cookies
    const cookieStore = serverCookies();
    const setCookie = (name, token, expires_in = 60 * 60 * 24 * 7) => {
      cookieStore.set(name, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: expires_in, path: '/' });
    };

    setCookie('accessToken', access_token, expires_in);
    setCookie('jwtToken', jwt_token, expires_in);
    setCookie('refreshToken', refresh_token);

    return { success: true, message: 'Login successful' };
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return { errors: { server: [error.response?.data?.message || 'An unexpected error occurred. Please try again.'] } };
  }
};

// Logout Function
export const logout = async () => {
  try {
    const apiClient = await createApiClient();
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error.message);
  } finally {
    const cookieStore = serverCookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('jwtToken');
    cookieStore.delete('refreshToken');
    redirect('/');
  }
};
