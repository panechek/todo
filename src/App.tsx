import React from "react";
import { useSelector } from "react-redux";
import {
  Routes, 
  Route, 
  useNavigate,
  Link,
 } from "react-router-dom";
import { fetchData } from "./redux/fetchData";
import {
  List, 
  AddListForm,
  Tasks
} from './components';
import {
  currentListSelector,
  listsErrorSelector,
  listsSelectors,
  removeError as removeListsError
} from "./redux/lists/listsSlice";
import './scss/index.scss';
import { editListsServer, editTasksServer } from "./api";
import {
  removeError as removeTasksError,
  tasksErrorSelector,
  tasksSelectors
} from "./redux/tasks/tasksSlice";
import ListTitle from "./components/List/ListTitle";
import { List as ListType } from "./redux/lists/types";
import {Task as TaskType} from "./redux/tasks/types";
import { useAppDispatch } from "./redux/store";

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lists: ListType[] = useSelector(listsSelectors.selectAll);
  const tasks: TaskType[] = useSelector(tasksSelectors.selectAll);
  const [openMenu, setOpenMenu] = React.useState<boolean>(true);

  const currentList = useSelector(currentListSelector);
  const activeList = lists.find((i) => i.id === currentList);
  const tasksError = useSelector(tasksErrorSelector);
  const listsError = useSelector(listsErrorSelector);

  React.useEffect(() => {
    const checkData = async () => {
    const savedLists = localStorage.getItem('lists');
    savedLists && await editListsServer(JSON.parse(savedLists));
    const savedTasks = localStorage.getItem('tasks');
    savedTasks && await editTasksServer(JSON.parse(savedTasks));
    localStorage.removeItem('lists');
    localStorage.removeItem('tasks');
    dispatch(fetchData());
  } 
  checkData();
  
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if(listsError) {
       const isError = editListsServer(lists);
       if(!isError){
        localStorage.removeItem('lists')
        dispatch(removeListsError());
      } else {
        localStorage.setItem('lists', JSON.stringify(lists));
      }
    }
    if(tasksError) {
       const result = editTasksServer(tasks);
       if(!result) {
        localStorage.removeItem('tasks')
        dispatch(removeTasksError())
      } else {
        console.log('err')
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }, [tasksError, listsError, lists, tasks, dispatch])

  React.useEffect(() => {
    currentList ? navigate(`/lists/${currentList}`) : navigate('/')
   }, [currentList, navigate]);

   return (
    <div className="todo">
      <div className="todo__sidebar">
        <ListTitle setOpenMenu={() => setOpenMenu(!openMenu)} />
        <div className="todo__list">
          <List openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        </div>
        <AddListForm />
      </div>
      <div className="todo__tasks">
        <div className="todo__list">
          <Routes>
            <Route path="/" element=
              {lists &&
                lists.map((list) => (
                  <Tasks 
                    key={list.id}
                    list={list}
                    withoutEmpty
                  />
                ))
              }
            />
            <Route path='/lists/:id' element=
              {lists && activeList ? (
              <Tasks 
              list={activeList}
              />) : null}
              />
              <Route path='/*' element={<div>Not found, <Link to='/'>return</Link></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
