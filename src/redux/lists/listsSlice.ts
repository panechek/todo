import { createSlice, createEntityAdapter, PayloadAction, EntityAdapter } from "@reduxjs/toolkit";
import { fetchData, postList, deleteList, patchList } from "../fetchData";
import { Color, List, ListNew, ListsSLiceState } from "./types";
import { RootState } from "../store";

const listAdapter: EntityAdapter<List> = createEntityAdapter<List>({
    selectId: (list: List) => list.id,
});
const initialState: ListsSLiceState = listAdapter.getInitialState({
    currentList: null,
    loading: false,
    error: false,
    colors: [],
});

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        changeCurrentList: (state, action: PayloadAction<number | null>) => {
            const storage = state;
            storage.currentList = action.payload;
        },
        removeError: (state) => {
            const storage = state;
            storage.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<{lists: List[], colors: Color[]}>) => {
                listAdapter.setAll(state, action.payload.lists);
                const storage = state;
                storage.colors = action.payload.colors;
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
            .addCase(postList.fulfilled, (state, action: PayloadAction<List>) => {
                listAdapter.addOne(state, action.payload);
                const storage = state;
                storage.currentList = action.payload.id;
                storage.loading = false;
            })
            .addCase(postList.pending, (state) => {
                const storage = state;
                storage.loading = true;
            })
            .addCase(postList.rejected, (state, action: PayloadAction<ListNew | undefined>) => {
                if(action.payload) {
                    const { name, colorId } = action.payload;
                    const listIds: (number | undefined)[] = (Object.values(state.entities).map((list) => list?.id));
                    const newId: number = listIds ? Number(listIds.pop()) + 1 : 1;
                    const newList = {
                        name,
                        colorId,
                        id: newId
                    }
                    listAdapter.addOne(state, newList);
                    const storage = state;
                    storage.currentList = newId;
                    storage.loading = false;
                    storage.error = true;
            }
            })
            .addCase(deleteList.fulfilled, (state, action: PayloadAction<number>) => {
                listAdapter.removeOne(state, action.payload);
                const storage = state;
                storage.currentList = null;
                storage.loading = false;
            })
            .addCase(deleteList.rejected, (state, action: PayloadAction<number | undefined>) => {
                if(action.payload) {
                    const id = action.payload;
                    listAdapter.removeOne(state, id);
                    const storage = state;
                    storage.currentList = null;
                    storage.loading = false;
                    storage.error = true;
                }
            })
            .addCase(patchList.fulfilled, (state, action: PayloadAction<{id: number, name: string}>) => {
                const { id, name } = action.payload;
                listAdapter.updateOne(state, { id, changes: {name: name}});
                const storage = state;
                storage.loading = false;
            })
            .addCase(patchList.rejected, (state, action: PayloadAction<{id: number, name: string} | undefined>) => {
                if(action.payload) {
                    const { id, name} = action.payload;
                    listAdapter.updateOne(state, { id, changes: {name: name}});
                    const storage = state;
                    storage.loading = false;
                    storage.error = true;
                }
            })
    },
});

export const listsSelectors = listAdapter.getSelectors((state: RootState) => state.lists);
export const colorsSelectors = (state: RootState) => state.lists.colors;
export const currentListSelector = (state: RootState) => state.lists.currentList;
export const listsErrorSelector = (state: RootState) => state.lists.error;
export const {
    changeCurrentList,
    removeError,
} = listsSlice.actions;

export default listsSlice.reducer;