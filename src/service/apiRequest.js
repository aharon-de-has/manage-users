const apiRequest = async (method, endpoint, body = null) => {
    const token = localStorage.getItem('authToken');
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
      console.log("🚀 ~ apiRequest ~ response:", response)
      // if (!response.ok) {
      //   throw new Error('Request failed');
      // }
  
      return await response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default apiRequest;



  