import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { tasksSelectors } from '../../redux/tasks/tasksSlice';
import { patchTask, deleteTask } from '../../redux/fetchData';

import { isValidText } from '../../utils/isValidName';

export type TaskProps = {
  id: number,
  text: string,
  completed?: boolean,
  key: number
}

const penSvg: string = require("../../assets/img/pen.svg").default;
const removeSvg: string = require("../../assets/img/remove.svg").default;
const checkSvg: string = require("../../assets/img/check.svg").default;

const Task: React.FC<TaskProps> = ({
  id,
  text,
  completed,
}) => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(tasksSelectors.selectAll);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCompleteTask(id, e.target.checked);
  };

  const onEditTask = ({id, text}: {id: number, text: string}) => {
    const textNew: string | null = window.prompt('Текст задачи', text);
    if (!textNew) {
      alert('Введите название задачи');
      return;
    }
    if (isValidText(textNew, tasks)) {
      alert('Задача уже существует');
      return;
    }
    dispatch(patchTask({id: id, change: {text: textNew}}))
   
  };

    const onCompleteTask = (taskId: number, completed: boolean) => {
      dispatch(patchTask({id: taskId, change: {completed: completed}}));
  };

  const onRemoveTask = (taskId: number) => {
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
          <img src={checkSvg} alt="Check task" />
        </label>
      </div>
      <p>{text}</p>
      <div className="tasks__items-row-actions">
        <div onClick={() => onEditTask({ id, text })}>
          <img src={penSvg} alt="Edit task" />
        </div>
        <div onClick={() => onRemoveTask(id)}>
          <img src={removeSvg} alt="Remove task" />
        </div>
      </div>
    </div>
  )
};
export default Task;
