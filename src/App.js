import React, { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { List, AddList, Tasks } from './components';
import { JSON_API } from "./assets/Constants";

function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    axios.get(`${JSON_API}/lists?_expand=color&_embed=tasks`).then(({data}) => {
      setLists(data);
    });
    axios.get(`${JSON_API}/colors`).then(({data}) => {
      setColors(data);
    });
  }, [])

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onRemoveList = (id) => {
    const newList = lists.filter((list) => list.id !== id);
    setLists(newList);
  };

  const onEditTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    })
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch(`${JSON_API}/tasks/` + taskObj.id, {
        text: newTaskText
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      const newList = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      axios.delete(`${JSON_API}/tasks/` + taskId).catch(() => {
        alert('Не удалось удалить задачу');
      });
    }
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch(`${JSON_API}/tasks/` + taskId, {
        completed
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === (Number(listId)));
      setActiveItem(list);
    }
    
  }, [lists, location.pathname])
  
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List 
        onClickItem={
          () => {navigate(`/`)}
        }
        items={[
          {
            active: true,
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                className="bi bi-list" 
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd" 
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            ),
            name: "Все задачи",
          },
        ]} />
        {lists ? (<List 
          items={lists}
          onRemove={onRemoveList}
          onClickItem={
            list => {navigate(`/lists/${list.id}`)}
            // onClickItem
          }
          activeItem={activeItem}
          isRemovable
        />) : (
          'Загрузка...'
        )}
        <AddList 
          colors={colors}
          onAddList={onAddList}  
        />
      </div>
      <div className="todo__tasks">
        <Routes>
        <Route exact path="/" element=
          {lists &&
            lists.map((list) => (
              <Tasks 
                key={list.id}
                list={list}
                onEditTitle={onEditTitle}
                onAddTask={onAddTask} 
                onRemoveTask={onRemoveTask}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
                withoutEmpty
               />
            ))
          }

        />
        <Route path='/lists/:id' element=
          {lists && activeItem && (
          <Tasks 
            list={activeItem}
            onEditTitle={onEditTitle}
            onAddTask={onAddTask} 
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}
          />)}
       />
        </Routes>
      </div>
    </div>
  );
}

export default App;
