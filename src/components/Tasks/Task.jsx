import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Pen } from '../../assets/img/pen.svg';
import { ReactComponent as Remove } from '../../assets/img/remove.svg';
import { ReactComponent as Check } from '../../assets/img/check.svg';
import isValidName from '../../utils/isValidName';
import { selectors as tasksSelectors } from '../../redux/tasksSlice';
import { patchTask, deleteTask } from '../../redux/fetchData';

const Task = ({
  id,
  text,
  completed
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(tasksSelectors.selectAll);

  const onChangeCheckbox = (e) => {
    onCompleteTask(id, e.target.checked);
  };
  const onEditTask = (taskObj) => {
    const text = window.prompt('Текст задачи', taskObj.text);
    if (!text) {
      alert('Введите название задачи');
      return;
    }
    if (isValidName(text, tasks)) {
      alert('Задача уже существует');
      return;
    }
    dispatch(patchTask({id: taskObj.id, change: {text: text}}))
   
  };

    const onCompleteTask = (taskId, completed) => {
      dispatch(patchTask({id: taskId, change: {completed: completed}}));
  };

  const onRemoveTask = (taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      dispatch(deleteTask(taskId));
  }
  };

  return (
    <div key={id} className="tasks__items-row">
      <div className="checkbox">
        <input 
          id={`task-${id}`} 
          type="checkbox"
          onChange={onChangeCheckbox}
          checked={completed}
        />
        <label htmlFor={`task-${id}`}>
          <Check />
        </label>
      </div>
      <p>{text}</p>
      <div className="tasks__items-row-actions">
        <div onClick={() => onEditTask({ id, text })}>
          <Pen />
        </div>
        <div onClick={() => onRemoveTask(id)}>
          <Remove />
        </div>
      </div>
    </div>
  )
};
export default Task;
