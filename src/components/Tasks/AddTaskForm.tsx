import React from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../redux/store';
import { TaskNew } from "../../redux/tasks/types"
import { List as ListType } from '../../redux/lists/types';
import { tasksSelectors } from '../../redux/tasks/tasksSlice';
import { postTask } from '../../redux/fetchData';

import { isValidText } from '../../utils/isValidName';

type AddTaskProps = {
    list: ListType
}
const plusSvg: string = require("../../assets/img/add.svg").default;

const AddTaskForm: React.FC<AddTaskProps> = React.memo(({ list }) => {
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch();
    const tasks = useSelector(tasksSelectors.selectAll);
    
    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
        inputRef.current?.focus();
    };

    const onAddTask = () => {
        if (!inputValue) {
            alert('Введите название задачи');
            return;
        }
        if (isValidText(inputValue, tasks)) {
            alert('Задача уже существует');
            return;
        }
        setIsLoading(true);
        const data: TaskNew = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        };

        dispatch(postTask(data));
        setInputValue('');
        setIsLoading(false);
        toggleFormVisible();
    };

  return (
    <div className="tasks__form">
        {!visibleForm ? (
            <div onClick={toggleFormVisible} className="tasks__form-new">
            <img src={plusSvg} alt="Add icon" />
            <span>Новая задача</span>
        </div>
        ) : (
            <div className="tasks__form-block">
            <input 
                className="field" 
                type="text" 
                placeholder="Текст задачи"
                value={inputValue}
                ref={inputRef}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
                className='button'
                onClick={onAddTask} 
                disabled={isLoading}
            >
                {isLoading ? 'Добавление...' : 'Добавить задачу'}
                </button>
            <button 
                className='button button--grey'
              onClick={toggleFormVisible}
                >Отмена</button>
        </div>
        )}
    </div>
  )
});

export default AddTaskForm;
