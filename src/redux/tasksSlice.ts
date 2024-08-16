import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../types/types';
import { getTasks, addTask, deleteTask, toggleTask } from '../service/apiService';

// Async thunks for API calls
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (query: string = '') => {
        const tasks = await getTasks(query);
        return tasks;
    }
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (title: string) => {
        const task = await addTask(title);
        return task;
    }
);

export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async (id: number) => {
        await deleteTask(id);
        return id;
    }
);

export const changeTaskStatus = createAsyncThunk(
    'tasks/changeTaskStatus',
    async (id: number) => {
        const task = await toggleTask(id);
        return task;
    }
);

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch tasks';
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
        })
        .addCase(removeTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        })
        .addCase(changeTaskStatus.fulfilled, (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
            state.tasks[index] = action.payload;
            }
        });
    },
});

export default tasksSlice.reducer;
