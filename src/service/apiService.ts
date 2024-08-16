import axios from 'axios';
import { Task } from '../types/types';

const BackendUrl = process.env.REACT_APP_API_URL;

// Create an Axios instance
const api = axios.create({
    baseURL: BackendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get the list of tasks
export const getTasks = async (searchQuery: string = ''): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks', {
        params: { query: searchQuery },
    });
    return response.data;
};

// Function to add a new task
export const addTask = async (title: string): Promise<Task> => {
    const response =  await api.post<Task>('/tasks', { title });
    return response.data;
};

// Function to delete a task
export const deleteTask = async (id: number): Promise<void> => {
    return await api.delete(`/tasks/${id}`);
};

// Function to toggle the status of a task
export const toggleTask = async (id: number): Promise<Task> => {
    const response =  await api.put<Task>(`/tasks/${id}`);
    return response.data;
};

export default api;
