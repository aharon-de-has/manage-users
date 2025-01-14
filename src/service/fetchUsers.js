import apiRequest from "./apiRequest";

export const login = async (username, password) => {
    return apiRequest('POST', 'auth/login', {username, password})
};

export const getAllUsers = async () => {
    return apiRequest('GET', 'users')
};

export const addUser = async (username, fullName, email, password) => {
    return apiRequest('POST', 'users', {username, fullName, email, password})
};

export const editUser = async (id, userData) => {
    return apiRequest('PUT', `users/${id}`, userData)
};

export const deleteUser = async (id) => {
    return apiRequest('DELETE', `users/${id}`)
};

