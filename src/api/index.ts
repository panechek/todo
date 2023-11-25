import axios from 'axios';
import {
    addList,
    addTask,
    editList,
    editTask,
    deleteList,
    deleteTask,
} from './api';
import routers from './routers';
import { List } from '../redux/lists/types';
import { Task } from '../redux/tasks/types';

const getId = (i: List|Task) => i.id; 


export const editListsServer = async (dataApp: List[]) => {
    let error = false;
    try {
        const { data } = await axios.get<List[]>(routers.listsPath());
        const idsServer = data.map(getId);
        const idsApp = dataApp.map(getId);

        const idsUniq = Array.from(new Set([...idsServer, ...idsApp]));

        idsUniq.forEach(element => {
            const serverElem: List | undefined= data.find((i) => i.id === element);
            const appElem: List | undefined = dataApp.find((i) => i.id === element);
            if(serverElem && appElem) {
                return serverElem.name !== appElem.name ? editList(appElem) : null;

            } else if (!appElem) {
                return deleteList(element);
            }
            return addList(appElem);
        });
    } catch(e) {
        error = true;
    }
    return error
};

export const editTasksServer = async (dataApp: Task[]) => {
    let error = false;
    try {
        const { data } = await axios.get<Task[]>(routers.tasksPath());
        const idsServer = data.map(getId);
        const idsApp = dataApp.map(getId);

        const idsUniq = Array.from(new Set([...idsServer, ...idsApp]));

        idsUniq.forEach(element => {
            const serverElem: Task | undefined = data.find((i) => i.id === element);
            const appElem: Task | undefined = dataApp.find((i) => i.id === element);
            if (serverElem && appElem) {
                if (serverElem.text !== appElem.text) {
                    return editTask(appElem);
                } else if (serverElem.completed !== appElem.completed) {
                    return editTask(appElem);
                }
            } else if (!appElem) {
                return deleteTask(element);
            }
            return addTask(appElem);
        });
    } catch(e) {
    error = true;
    }
    return error
};
