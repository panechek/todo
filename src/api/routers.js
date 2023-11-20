const apiPath = 'http://localhost:8000';
// export const JSON_API = 'https://todo-lvvw.onrender.com/api';
// export const JSON_API = 'http://localhost:8000';
const routers = {
    dataPath: () => [apiPath, 'db'].join('/'),
    listsPath: () => [apiPath, 'lists/'].join('/'),
    tasksPath: () => [apiPath, 'tasks/'].join('/'),
};

export default routers;