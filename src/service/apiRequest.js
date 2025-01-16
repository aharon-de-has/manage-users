import store from '../redux/store';

const apiRequest = async (method, endpoint, body = null) => {
    const token = store.getState().auth.token;
    const apiUrl = process.env.REACT_APP_API_URL
    
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `${token}`;
    }
  
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
      return await response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default apiRequest;



  