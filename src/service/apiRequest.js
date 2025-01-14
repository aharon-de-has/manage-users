const apiRequest = async (method, endpoint, body = null) => {
    const token = localStorage.getItem('authToken');
    
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `${token}`;
    }
  
    try {
      const response = await fetch(`https://server-n42x.onrender.com/api/${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default apiRequest;



  