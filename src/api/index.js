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

const getId = (i) => i.id; 

const editServer = async (type, dataApp) => {
    let error = false;
    try {
    const { data } = await axios.get(type === 'lists'? routers.listsPath() : routers.tasksPath());
    const idsServer = data.map(getId);
    const idsApp = dataApp.map(getId);

    const idsUniq = Array.from(new Set([...idsServer, ...idsApp]));

    await idsUniq.forEach(element => {
        const serverElem = data.find((i) => i.id === element);
        const appElem = dataApp.find((i) => i.id === element);
        if(serverElem && appElem) {
            if(type === 'list') {
                return serverElem.name !== appElem.name ? editList(appElem) : null;
            } else {
               return serverElem.completed !== appElem.completed ? editTask(appElem) : null;
            }
        } else if (!appElem) {
            return type === 'lists' ? deleteList(element): deleteTask(element);
        }
        return type === 'lists' ? addList(appElem) : addTask(appElem);
    });
} catch(e) {
    error = true
    }
    return error
}

export default editServer;