import apiRequest from "./apiRequest";

export const login = async (username: string, password: string): Promise<Response> => {
    return apiRequest('POST', 'auth/login', {username, password});
};

export const getAllUsers = async (): Promise<Response> => {
    return apiRequest('GET', 'users');
};

export const addUser = async (userData: any): Promise<Response> => {
    return apiRequest('POST', 'users', userData);
};

export const editUser = async (id: string, userData: any): Promise<Response> => {
    return apiRequest('PUT', `users/${id}`, userData);
};

export const deleteUser = async (id: string): Promise<Response> => {
    return apiRequest('DELETE', `users/${id}`);
};

