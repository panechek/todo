import { createSlice, createEntityAdapter, PayloadAction, EntityAdapter } from "@reduxjs/toolkit";
import { fetchData, postTask, deleteTask, patchTask, deleteList } from "../fetchData";
import { Task, TaskNew, TasksSLiceState } from "./types";
import { TodoData } from "../lists/types";
import { RootState } from "../store";

const taskAdapter: EntityAdapter<Task> = createEntityAdapter({
    selectId: (task: Task) => task.id,
});

const initialState: TasksSLiceState = taskAdapter.getInitialState({
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
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<TodoData>) => {
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
            .addCase(deleteList.fulfilled, (state, action: PayloadAction<number>) => {
                const id  = action.payload;
                const restEntities: (number | undefined)[] = Object.values(state.entities).filter((e) => e?.listId !== id ?? e?.id).map((e) => e?.id);
                restEntities ?? taskAdapter.removeMany(state, restEntities);
            })
            .addCase(deleteList.rejected, (state, action: PayloadAction<number | undefined>) => {
                if(action.payload) {
                    const id  = action.payload;
                    const restEntities: (number | undefined)[] = Object.values(state.entities).filter((e) => e?.listId !== id ?? e?.id).map((e) => e?.id);
                    restEntities ?? taskAdapter.setAll(state, restEntities);
                    const storage = state;
                    storage.error = true;
                }
            })
            .addCase(postTask.fulfilled, (state, action: PayloadAction<Task>) => {
                taskAdapter.addOne(state, action.payload);
                const storage = state;
                storage.loading = false;
            })
            .addCase(postTask.pending, (state) => {
                const storage = state;
                storage.loading = true;
            })
            .addCase(postTask.rejected, (state, action: PayloadAction<TaskNew | undefined>) => {
                if(action.payload) {
                    const data = action.payload;
                    const newTask: (number | undefined)[] = Object.values(state.entities).map((e) => e?.id);
                    const newId: number = newTask ? Number(newTask.pop()) + 1 : 1;
                    taskAdapter.addOne(state, {
                        ...data,
                        id: newId
                    });
                    const storage = state;
                    storage.loading = false;
                    storage.error = true;
            }
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
                const { payload } = action;
                taskAdapter.removeOne(state, payload);
                const storage = state;
                storage.loading = false;
            })
            .addCase(deleteTask.rejected, (state, action: PayloadAction<number | undefined>) => {
                if(action.payload) {
                    const id = action.payload;
                    taskAdapter.removeOne(state, id);
                    const storage = state;
                    storage.loading = false;
                    storage.error = true;
                }
            })
            .addCase(patchTask.fulfilled, (state, action: PayloadAction<{id: number, change: {text?: string, completed?: boolean}}>) => {
                const { id, change} = action.payload;
                taskAdapter.updateOne(state, { id, changes: change });
                const storage = state;
                storage.loading = false;
            })
            .addCase(patchTask.rejected, (state, action: PayloadAction<{id: number, change: {text?: string, completed?: boolean}} | undefined>) => {
                if(action.payload) {
                    const { id, change} = action.payload;
                    taskAdapter.updateOne(state, { id, changes: change});
                    const storage = state;
                    storage.loading = false;
                    storage.error = true;
                }
            });
    },
});

export const tasksSelectors = taskAdapter.getSelectors((state: RootState) => state.tasks);
export const tasksErrorSelector = (state: RootState) => state.tasks.error;

export const {
    removeError
} = tasksSlice.actions;

export default tasksSlice.reducer;