import store from '../redux/store';
import { checkTokenExpiration } from '../utils/checkToken';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const apiRequest = async <T>(
  method: HttpMethod,
  endpoint: string,
  body: Record<string, unknown> | null = null
): Promise<T> => {
  const token = store.getState().auth.token; 
  const apiUrl = process.env.REACT_APP_API_URL;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token && !checkTokenExpiration(token)) {
    throw new Error('Token has expired');
  }

  if (token) {
    headers['Authorization'] = `${token}`;
  }

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    return response as T; 
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default apiRequest;



  