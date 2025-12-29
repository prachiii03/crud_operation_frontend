import axios from 'axios';
import type { User } from '../types/user';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET all users
export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// GET single user
export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// POST create user
export const createUser = async (user: User) => {
  const response = await api.post('/users', user);
  return response.data;
};

// PUT update user
export const updateUser = async (id: number, user: User) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
};

// DELETE user
export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export default api;