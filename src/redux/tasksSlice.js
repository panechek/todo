import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchData, postTask, deleteTask, patchTask, deleteList } from "./fetchData";

const taskAdapter = createEntityAdapter({
    selectedTask: (task) => task.id,
});

const initialState = taskAdapter.getInitialState({
    tasks: [],
    loading: false,
    error: false,
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeError: (state) => {
            const storage = state;
            storage.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                const { tasks }  = action.payload;
                taskAdapter.setAll(state, tasks);
                const storage = state;
                storage.loading = false;
            })
            .addCase(fetchData.pending, (state) => {
                const storage = state;
                storage.loading = true;
            })
            .addCase(fetchData.rejected, (state) => {
                const storage = state;
                storage.loading = false;
            })
            .addCase(deleteList.fulfilled, (state, { payload }) => {
                const restEntities = Object.values(state.entities).filter((e) => e.listId !== payload);
                taskAdapter.setAll(state, restEntities);
            })
            .addCase(deleteList.rejected, (state, action) => {
                const { id } = action.meta.arg;
                const restEntities = Object.values(state.entities).filter((e) => e.listId !== id);
                taskAdapter.setAll(state, restEntities);
                const storage = state;
                storage.error = true;
            })
            .addCase(postTask.fulfilled, (state, action) => {
                const { payload } = action;
                taskAdapter.addOne(state, payload);
                const storage = state;
                storage.loading = false;
            })
            .addCase(postTask.pending, (state) => {
                const storage = state;
                storage.loading = true;
            })
            .addCase(postTask.rejected, (state, action) => {
                const data = action.meta.arg;
                const newId = Object.values(state.entities).map((e) => e.id).pop() + 1;
                taskAdapter.addOne(state, {
                    ...data,
                    id: newId
                });
                const storage = state;
                storage.loading = false;
                storage.error = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const { payload } = action;
                taskAdapter.removeOne(state, payload);
                const storage = state;
                storage.loading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                const id = action.meta.arg;
                taskAdapter.removeOne(state, id);
                const storage = state;
                storage.loading = false;
                storage.error = true;
            })
            .addCase(patchTask.fulfilled, (state, action) => {
                const { id, change} = action.meta.arg;
                taskAdapter.updateOne(state, { id, changes: change });
                const storage = state;
                storage.loading = false;
            })
            .addCase(patchTask.rejected, (state, action) => {
                const { id, change} = action.meta.arg;
                taskAdapter.updateOne(state, { id, changes: change});
                const storage = state;
                storage.loading = false;
                storage.error = true;
            });
    },
});

export const selectors = taskAdapter.getSelectors((state) => state.tasks);

export const {
    removeError
} = tasksSlice.actions;

export default tasksSlice.reducer;