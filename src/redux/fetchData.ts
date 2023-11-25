import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import routers from "../api/routers";
import { List, ListNew, TodoData } from "./lists/types";
import { Task, TaskNew } from "./tasks/types";

export const fetchData = createAsyncThunk<TodoData>(
    'fetchData',
    async () => {
        const { data } = await axios.get<TodoData>(routers.dataPath());
        return data;
    }
);

export const postList = createAsyncThunk<List, ListNew, {
    rejectValue: ListNew
  }
  >(
    'lists/postList',
    async (listObj, thunkAPI) => {
        try {        
            const { data } = await axios.post(routers.listsPath(), listObj);
            return data;
         } catch(e) {
             return thunkAPI.rejectWithValue(listObj);
         }
    }
);

export const deleteList = createAsyncThunk<number, number, {
    rejectValue: number
}
>(
    'lists/deleteList',
    async (id, thunkAPI) => {
        try {
            await axios.delete(routers.listsPath() + id);
            return id;
        } catch(e) {
            return thunkAPI.rejectWithValue(id);

        }
    }
);

export const patchList = createAsyncThunk<{id: number, name: string}, {id: number, name: string}, {
    rejectValue: {id: number, name: string}
}
>(
    'lists/patchList',
    async ({id, name}, thunkAPI)=> {
        try {
            const { data } = await axios.patch(routers.listsPath() + id, {
                name: name
            });
            return data;
        } catch(e) {
            return thunkAPI.rejectWithValue({id, name});

        }
    }
);

export const postTask = createAsyncThunk<Task, TaskNew, {
    rejectValue: TaskNew
}
>(
    'tasks/postTask',
    async (taskObj, thunkAPI) => {
        try {
            const { data } = await axios.post<Task>(routers.tasksPath(), taskObj);
            return data;
        } catch(e) {
            return thunkAPI.rejectWithValue(taskObj);
        }
    }
);

export const deleteTask = createAsyncThunk<number, number, {
    rejectValue: number

}
>(
    'tasks/deleteTask',
    async (id, thunkAPI) => {
        try {
            await axios.delete(routers.tasksPath() + id);
            return id;
        } catch(e) {
            return thunkAPI.rejectWithValue(id);
        }
        
    }
);

export const patchTask = createAsyncThunk<{id: number, change: {text?: string, completed?: boolean}}, {id: number, change: {text?: string, completed?: boolean}}, {
    rejectValue: {id: number, change: {text?: string, completed?: boolean}}
}
>(
    'tasks/patchTasks',
    async ({id, change}, thunkAPI)=> {
        try {
            await axios.patch(routers.tasksPath() + id, change);
            return {id, change};
        } catch(e) {
            return thunkAPI.rejectWithValue({id, change});
        }
        
    }
);
