import { jwtDecode } from 'jwt-decode';

export const checkTokenExpiration = (token: string) => {
  try {
    const decoded: { exp?: number } = jwtDecode(token); 
    if (!decoded?.exp) {
      throw new Error('No expiration found in token');
    }

    const expirationTime = decoded.exp * 1000; 
    const currentTime = Date.now(); 

    return currentTime <= expirationTime; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return false; 
  }
};

