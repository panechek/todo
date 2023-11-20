import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import routers from "../api/routers";

export const fetchData = createAsyncThunk(
    'fetchData',
    async () => {
        const { data } = await axios.get(routers.dataPath());
        return data;
    }
);

export const postList = createAsyncThunk(
    'lists/postList',
    async (listObj) => {
        const { data } = await axios.post(routers.listsPath(), listObj);
        return data;
    }
);

export const deleteList = createAsyncThunk(
    'lists/deleteList',
    async (id) => {
        await axios.delete(routers.listsPath() + id);
        return id;
    }
);

export const patchList = createAsyncThunk(
    'lists/patchList',
    async ({id, name})=> {
        const { data } = await axios.patch(routers.listsPath() + id, {
            name: name
        });
        return data;
    }
);

export const postTask = createAsyncThunk(
    'tasks/postTask',
    async (taskObj) => {
        const { data } = await axios.post(routers.tasksPath(), taskObj);
        return data;
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id) => {
        await axios.delete(routers.tasksPath() + id);
        return id;
    }
);

export const patchTask = createAsyncThunk(
    'tasks/patchTasks',
    async ({id, change})=> {
        const { data } = await axios.patch(routers.tasksPath() + id, change);
        return data;
    }
);
