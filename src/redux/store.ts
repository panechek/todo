import { configureStore } from '@reduxjs/toolkit';
import lists from './lists/listsSlice';
import tasks from './tasks/tasksSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        lists,
        tasks,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
