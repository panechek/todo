import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { tasksSelectors } from '../../redux/tasks/tasksSlice';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import isValidName from '../../utils/isValidName';
import { colorsSelectors, listsSelectors } from '../../redux/lists/listsSlice';
import { patchList } from '../../redux/fetchData';
import { List as ListType} from '../../redux/lists/types';
import { useAppDispatch } from '../../redux/store';

type TasksProps = {
  list: ListType,
  withoutEmpty?: boolean
}


const Tasks: React.FC<TasksProps> = ({ 
  list, 
  withoutEmpty,
}) => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(tasksSelectors.selectAll).filter((i) => i.listId === list.id);
  const color = useSelector(colorsSelectors).find((i) => i.id === list.colorId);
  const lists = useSelector(listsSelectors.selectAll);
  const penSvg: string = React.useMemo(() => require("../../assets/img/pen.svg").default, []);

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
          <h2 style={{ color: color?.hex }} className="tasks__title">
            {list.name}
            <div onClick={editTitle}>          
              <img src={penSvg} alt="Edit list" />
            </div>
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
