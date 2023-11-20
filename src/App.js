import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes, 
  Route, 
  useNavigate,
 } from "react-router-dom";
import { fetchData } from "./redux/fetchData";
import {
  List, 
  AddListForm,
  Tasks
} from './components';
import {
  selectors as listsSelectors,
  removeError as removeListsError
} from "./redux/listsSlice";
import './scss/index.scss';
import editServer from "./api";
import {
  removeError as removeTasksError,
  selectors as tasksSelectors
} from "./redux/tasksSlice";
import ListTitle from "./components/List/ListTitle";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector(listsSelectors.selectAll);
  const tasks = useSelector(tasksSelectors.selectAll);
  const [openMenu, setOpenMenu] = React.useState(true);

  const currentList = useSelector((state) => state.lists.currentList);
  const activeList = lists.find((i) => i.id === currentList);
  const tasksError = useSelector((state) => state.tasks.error);
  const listsError = useSelector((state) => state.lists.error);

  React.useEffect(() => {
    const checkData = async () => {
    const savedLists = localStorage.getItem('lists');
    savedLists && await editServer('lists', JSON.parse(savedLists));
    const savedTasks = localStorage.getItem('tasks');
    savedTasks && await editServer('tasks', JSON.parse(savedTasks));
    localStorage.removeItem('lists');
    localStorage.removeItem('tasks');
    await dispatch(fetchData());
  } 
  checkData();
  
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if(listsError) {
      
       const isError = editServer('lists', lists);
       if(!isError){
        localStorage.removeItem('lists')
        dispatch(removeListsError());
      } else {
        localStorage.setItem('lists', JSON.stringify(lists));
      }
    }
    if(tasksError) {
     
       const result = editServer('tasks', tasks);
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
            <Route exact path="/" element=
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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
