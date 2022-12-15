import React from "react";
import AddList from "./components/AddList";
import List from "./components/List";
import Tasks from "./components/Tasks";

import DB from './assets/db.json';

function App() {
  const [lists, setLists] = React.useState(DB.lists.map(item => {
    item.color = DB.colors.filter(color => color.id === item.colorId)[0].name;
    return item;
  }));

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    setLists(newList);
  };

  const onRemoveList = (item) => {
    const newList = lists.filter((list) => list.id !== item.id);
    setLists(newList);
  };
  
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
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
            active: true,
          },
        ]} />
        <List 
          items={lists}
          onRemove={onRemoveList}
          isRemovable
        />
        <AddList 
          colors={DB.colors}
          onAddList={onAddList}  
        />
      </div>
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>
  );
}

export default App;
