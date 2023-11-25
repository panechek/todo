// const apiPath = 'http://localhost:8000';
const apiPath = 'https://todo-lvvw.onrender.com/api';
const routers = {
    dataPath: () => [apiPath, 'db'].join('/'),
    listsPath: () => [apiPath, 'lists/'].join('/'),
    tasksPath: () => [apiPath, 'tasks/'].join('/'),
};

export default routers;