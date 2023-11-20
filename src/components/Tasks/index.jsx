import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectors as tasksSelectors } from '../../redux/tasksSlice';
import penSvg from '../../assets/img/pen.svg';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import isValidName from '../../utils/isValidName';
import { selectors as listsSelector } from '../../redux/listsSlice';
import { patchList } from '../../redux/fetchData';

const Tasks = ({ 
  list, 
  withoutEmpty,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelectors.selectAll).filter((task) => task.listId === list.id);
  const color = useSelector((state) => state.lists.colors).find((i) => i.id === list.colorId);
  const lists = useSelector(listsSelector.selectAll);

  const editTitle = () => {
    const name = window.prompt('Название списка', list.name);
    if (!name) {
      alert('Введите название списка');
      return;
    }
    if (isValidName(name, lists)) {
      alert('Список уже существует');
      return;
    }
    dispatch(patchList({id: list.id, name: name}));
  };

  return (
    <>
      {list ? (
        <div className="tasks">
        <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={penSvg} alt="Edit icon" />
        </h2>
      </Link>
        <div className="tasks__items">
          {!withoutEmpty && tasks && !tasks.length && (
            <h2>Задачи отсутствуют</h2>
          )}
          {tasks &&
            tasks.map(task => (
              <Task
                key={task.id}
                list={list}
                {...task}
              />
            ))
            }
        <AddTaskForm key={list.id} list={list} />
      </div>
      </div>
      ) : null}
      
    </>
  );
};

export default Tasks;
