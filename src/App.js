import React from "react";
import axios from "axios";

import { List, AddList, Tasks } from './components';

function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);


  React.useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({data}) => {
      setColors(data);
    });
  }, [])

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    setLists(newList);
  };

  const onRemoveList = (id) => {
    const newList = lists.filter((list) => list.id !== id);
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
          colors={colors}
          onAddList={onAddList}  
        />
      </div>
      <div className="todo__tasks">
        {lists && <Tasks lists={lists[1]} />}
      </div>
    </div>
  );
}

export default App;
