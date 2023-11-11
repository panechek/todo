import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';

import penSvg from '../../assets/img/pen.svg';

import './Tasks.scss';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import { JSON_API } from '../../assets/Constants';

const Tasks = ({ 
    list, 
    onEditTitle, 
    onAddTask, 
    onRemoveTask,
    onEditTask,
    onCompleteTask,
    withoutEmpty }) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch(`${JSON_API}/lists/` + list.id, {
                name: newTitle
            })
            .catch(() => {
                alert('Не удалось обновить название списка');
            });
        }
    };

    return (
        <div className="tasks">
            <NavLink to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img onClick={editTitle} src={penSvg} alt="Edit icon" />
                </h2>
            </NavLink>
            <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map(task => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
