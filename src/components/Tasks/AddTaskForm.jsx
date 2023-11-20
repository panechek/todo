import React from 'react';
import addSvg from '../../assets/img/add.svg';
import { selectors as tasksSelectors } from '../../redux/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import isValidName from '../../utils/isValidName';
import { postTask } from '../../redux/fetchData';

const AddTaskForm = ({ list }) => {
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const tasks = useSelector(tasksSelectors.selectAll);
    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    };

    const onAddTask = () => {
        if (!inputValue) {
            alert('Введите название задачи');
            return;
        }
        if (isValidName(inputValue, tasks)) {
            alert('Задача уже существует');
            return;
        }
        setIsLoading(true);
        const data = {
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
            <img src={addSvg} alt="Add icon" />
            <span>Новая задача</span>
        </div>
        ) : (
            <div className="tasks__form-block">
            <input 
                className="field" 
                type="text" 
                placeholder="Текст задачи"
                value={inputValue}
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
};

export default AddTaskForm;
