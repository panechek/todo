import { configureStore } from '@reduxjs/toolkit';
import lists from './listsSlice';
import tasks from './tasksSlice';

export const store = configureStore({
    reducer: {
        lists,
        tasks,
    },
});
