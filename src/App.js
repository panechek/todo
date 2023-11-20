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
  changeCurrentList,
  selectors as listsSelectors,
  removeError as removeListsError
} from "./redux/listsSlice";
import burger from './assets/img/burger.svg';
import './scss/index.scss';
import editServer from "./api";
import {
  removeError as removeTasksError,
  selectors as tasksSelectors
} from "./redux/tasksSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector(listsSelectors.selectAll);
  const tasks = useSelector(tasksSelectors.selectAll);

  const currentList = useSelector((state) => state.lists.currentList);
  const activeList = lists.find((i) => i.id === currentList);
  const tasksError = useSelector((state) => state.tasks.error);
  const listsError = useSelector((state) => state.lists.error);

  React.useEffect(() => {
    const savedLists = localStorage.getItem('lists');
    savedLists && editServer('lists', JSON.parse(savedLists));
    const savedTasks = localStorage.getItem('tasks');
    savedTasks && editServer('tasks', JSON.parse(savedTasks));
    localStorage.removeItem('lists');
    localStorage.removeItem('tasks');

    dispatch(fetchData());
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
        <List 
          onClickItem={() => {
            dispatch(changeCurrentList(null));
          }}
          items={[
            {
              active: true,
              icon: (<img
                src={burger}
                alt='Все задачи'
                />),
              name: "Все задачи",
             },
          ]}
        />
        <div className="todo__list">
          {lists && (<List 
            items={lists}
            onClickItem={
              list => {
                dispatch(changeCurrentList(list.id))
              }
            }
            isRemovable
          />) 
          }
        </div>
        <AddListForm
          />
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
