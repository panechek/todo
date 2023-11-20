import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchData, postList, deleteList, patchList } from "./fetchData";

const listAdapter = createEntityAdapter({
    selectedList: (list) => list.id,
});
const initialState = listAdapter.getInitialState({
    currentList: null,
    loading: false,
    error: false,
    lists: [],
    colors: [],
});

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        changeCurrentList: (state, { payload }) => {
            const storage = state;
            storage.currentList = payload;
        },
        removeError: (state) => {
            const storage = state;
            storage.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                const { lists, colors }  = action.payload;
                listAdapter.setAll(state, lists);
                const storage = state;
                storage.colors = colors;
                storage.currentList = null;
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
            .addCase(postList.fulfilled, (state, action) => {
                const { payload } = action;
                listAdapter.addOne(state, payload);
                const storage = state;
                storage.currentList = payload.id;
                storage.loading = false;
            })
            .addCase(postList.pending, (state) => {
                const storage = state;
                storage.loading = true;
            })
            .addCase(postList.rejected, (state, action) => {
                const data = action.meta.arg;
                const newId = Object.values(state.entities).map((e) => e.id).pop() + 1;
                listAdapter.addOne(state, {
                    ...data,
                    id: newId
                });
                const storage = state;
                storage.currentList = newId;
                storage.loading = false;
                storage.error = true;
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                const { payload } = action;
                listAdapter.removeOne(state, payload);
                const storage = state;
                storage.currentList = null;
                storage.loading = false;
            })
            .addCase(deleteList.rejected, (state, action) => {
                const id = action.meta.arg;
                listAdapter.removeOne(state, id);
                const storage = state;
                storage.currentList = null;
                storage.loading = false;
                storage.error = true;
            })
            .addCase(patchList.fulfilled, (state, action) => {
                const { id, name } = action.payload;
                console.log(action.payload);
                listAdapter.updateOne(state, { id, changes: {name: name}});
                const storage = state;
                storage.loading = false;
            })
            .addCase(patchList.rejected, (state, action) => {
                const { id, name} = action.meta.arg;
                listAdapter.updateOne(state, { id, changes: {name: name}});
                const storage = state;
                storage.loading = false;
                storage.error = true;
            })
    },
});

export const selectors = listAdapter.getSelectors((state) => state.lists);
// export const setColors = useSelector((state) => state.color);

export const {
    changeCurrentList,
    removeError,
} = listsSlice.actions;

export default listsSlice.reducer;