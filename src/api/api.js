import axios from "axios";
import routers from "./routers";

export const editList = async (data) => {
    const result = await axios.patch(routers.listsPath(), + data.id, {
        name: data.name,
    });
    return result;
};
export const editTask = async (data) => {
    const result = await axios.patch(routers.tasksPath() + data.id, {
        text: data.text,
        completed: data.completed
    });
    return result;
}
export const addList = async (data) => {
    const result = await axios.post(routers.listsPath(), data);
    return result;
}

export const addTask = async (data) => {
    const result = await axios.post(routers.tasksPath(), data);
    return result;
}
export const deleteList = async (data) => {
    const result = await axios.delete(routers.listsPath() + data);
    return result;
}
export const deleteTask = async (data) => {
    const result = await axios.delete(routers.tasksPath() + data);
    return result;
}