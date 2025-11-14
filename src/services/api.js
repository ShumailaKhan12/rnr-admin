import axios from 'axios';

// 🔧 Base URL setup
// const ApiURL = 'https://77bd06fc9527.ngrok-free.app'; // Replace with your actual API base URL
// const ApiURL = 'https://269479db5721.ngrok-free.app'; // Replace with your actual API base URL
const ApiURL = 'https://45eb634ceab1.ngrok-free.app'

// 🌐 Axios instance
const api = axios.create({
  baseURL: ApiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ GET Request: with optional query parameters
export const getData = async (endpoint, query = {}) => {
  try {
    const response = await api.get(endpoint, { params: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ POST Request: with payload (body)
export const postData = async (endpoint, payload = {}) => {
  try {
    const response = await api.post(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ PUT Request: with payload (body)
export const putData = async (endpoint, payload = {}) => {
  try {
    const response = await api.put(endpoint, payload);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ DELETE Request: with optional parameters
export const deleteData = async (endpoint, params = {}) => {
  try {
    const response = await api.delete(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;

// Example usage:

// ✅ GET with query

// const users = await getData('/users', { page: 2, limit: 10 });
// console.log(users);

// ✅ POST with payload

// const newUser = await postData('/users', { name: 'John', email: 'john@example.com' });
// console.log(newUser);

// ✅ PUT with payload

// const updatedUser = await putData('/users/123', { name: 'Jane' });
// console.log(updatedUser);

// ✅ DELETE with parameters

// await deleteData('/users/123');
// console.log('User deleted successfully');

// OR with query

// await deleteData('/users', { email: 'john@example.com' });
// console.log('User deleted successfully');
