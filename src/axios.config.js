// src/lib/axios.js
import axios from 'axios';
import {
  getAuthenticationToken,
  setAuthenticationToken,
  clearAllSession,
} from '@/utils/authentication.util';
import toasty from '@/utils/toast.util.jsx'; // replace with your toast helper

/* -------------------------------------------------------------------------- */
/*                               Axios Instance                               */
/* -------------------------------------------------------------------------- */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

/* ----------------------------- Request Interceptor ------------------------ */
api.interceptors.request.use((config) => {
  config.headers.Authorization = getAuthenticationToken();
  return config;
});


const redirectMessage = 'Request redirected – following new location.';

function extractErrorMessage(err) {
  // Prefer server‑supplied message
  const apiMsg =
    err.response &&
    err.response.data &&
    typeof err.response.data === 'object' &&
    err.response.data.message;

  if (apiMsg) return apiMsg;

  // Fallback to predefined map

  return err.response?.data?.error || 'Network error – please check connection.';
}

/* ---------------------------- Response Interceptor ------------------------ */
api.interceptors.response.use(
  (response) => {
    // Refresh token if sent in headers
    const newVault = response.headers['vault'];
    if (newVault) setAuthenticationToken(newVault);

    const { status } = response;

    // 2xx success
    if (status >= 200 && status < 300) {
      const msg =
        response.data.message ||
        (typeof response.data === 'object' && response.data.message);
      if (response.data.message)
        toasty.success(msg);
    }

    // 3xx redirect / informational
    if (status >= 300 && status < 400) {
      toasty.info(redirectMessage);
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const msg = extractErrorMessage(error);
    console.log(msg);
    
    // Force logout
    if (status === 401) {
      toasty.error(msg);
      clearAllSession(true);
      return Promise.reject(error);
    }

    toasty.error(msg);

    // Attach friendlyMessage so callers can use it if needed
    return Promise.reject({
      ...error,
      friendlyMessage: msg,
    });
  }
);

export default api;
