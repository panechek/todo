import React from "react";
import List from "./components/List";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon:  (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>),
          name: "Все задачи",
          active: true,
          },
        ]} />
        <List items={[
          {
            color: 'green',
            name: "Покупки",
          },
          {
            color: 'blue',
            name: "Уборка",
          },
          {
            color: 'pink',
            name: "Учеба",
          },
        ]} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default App;
