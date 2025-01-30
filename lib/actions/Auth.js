'use server';
import { cookies } from 'next/headers';
import { loginSchema } from '../schemas';
import axios from 'axios';
import { redirect } from 'next/navigation';

export const createApiClient = async (
  post = false,
  data = null,
  file = false
) => {
  const api = axios.create({
    baseURL: process.env.BASE_URL,
  });
  // Add headers with an interceptor
  api.interceptors.request.use(
    async (config) => {
      const accessToken = cookies().get('accessToken')?.value;
      const jwtToken = cookies().get('jwtToken')?.value;

      if (accessToken && jwtToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.JWTAUTH = `Bearer ${jwtToken}`;
        if (post) {
          if (file) {
            config.headers['Content-Type'] = 'multipart/form-data';
            config.data = data;
          } else {
            config.headers['Content-Type'] = 'application/json';
            config.data = JSON.stringify(data);
          }
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
export const login = async (state, formData) => {
  // Validate the form data
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;

  try {
    // Fetch user details from the endpoint
    const apiUrl = `${process.env.BASE_URL}/auth/login`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    // Send the request
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      return {
        errors: {
          password: ['Invalid username or password'],
        },
      };
    }

    // Parse the response
    const { details } = await response.json();
    const { access_token, refresh_token, jwt_token, expires_in } = details;

    const setCookie = (name, token, expires_in = 60 * 60 * 24 * 7) => {
      cookies().set(name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in,
        path: '/',
      });
    };

    setCookie('accessToken', access_token, expires_in);
    setCookie('jwtToken', jwt_token, expires_in);
    setCookie('refreshToken', refresh_token);
    // Return success message or user details
    return { success: true, message: 'Login successful' };
  } catch (error) {
    console.error('Login failed:', error);
    return {
      errors: {
        server: ['An unexpected error occurred. Please try again later.'],
      },
    };
  }
};

export const logout = async () => {
  const apiClient = await createApiClient();
  try {
    const response = await apiClient.post('/auth/logout');
    if (response.status === 200) {
      cookies().delete('accessToken');
      cookies().delete('jwtToken');
      cookies().delete('refreshToken');
      redirect('/');
    } else {
      return {
        errors: {
          password: ['Unsuccessful logout'],
        },
      };
    }
  } catch (error) {
    return {
      errors: {
        server: ['An unexpected error occurred. Please try again later.'],
      },
    };
  }
};
