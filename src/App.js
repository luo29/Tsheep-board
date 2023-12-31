import "./App.css";
import React, { useState } from "react";

const KanbanBoard = ({ children }) => (
  <main className="kanban-board">{children}</main>
);
const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};
const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};
const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const handleChange = (ev) => {
    setTitle(ev.target.value);
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      onSubmit(title);
    }
  };
  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </li>
  );
};
function App() {
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: "开发任务-1", status: "22-05-22 18:15" },
    { title: "开发任务-3", status: "22-05-22 18:15" },
    { title: "开发任务-5", status: "22-05-22 18:15" },
    { title: "测试任务-3", status: "22-05-22 18:15" },
    { title: "开发任务-1", status: "22-05-22 18:15" },
    { title: "开发任务-3", status: "22-05-22 18:15" },
    { title: "开发任务-5", status: "22-05-22 18:15" },
    { title: "测试任务-3", status: "22-05-22 18:15" },
  ]);
  const [ongoingList, setOngoingList] = useState([
    { title: "开发任务-4", status: "22-05-22 18:15" },
    { title: "开发任务-6", status: "22-05-22 18:15" },
    { title: "测试任务-2", status: "22-05-22 18:15" },
  ]);
  const [doneList, setDoneList] = useState([
    { title: "开发任务-2", status: "22-05-22 18:15" },
    { title: "测试任务-1", status: "22-05-22 18:15" },
  ]);
  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    // todoList.unshift({ title, status: new Date().toDateString() });
    setTodoList((currentTodoList) => [
      { title, status: new Date().toDateString() },
      ...currentTodoList,
    ]);
    setShowAdd(false);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
      <KanbanBoard>
        <KanbanColumn
          className="column-todo"
          title={
            <>
              待处理
              <button onClick={handleAdd} disabled={showAdd}>
                &#8853; 添加新卡片
              </button>
            </>
          }
        >
          {/* <h2>
            待处理{" "}
            <button onClick={handleAdd} disabled={showAdd}>
              &#8853;添加新卡片
            </button>
          </h2> */}
          {/* <ul> */}
          {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
          {todoList.map((props) => (
            <KanbanCard {...props} />
          ))}
          {/* </ul> */}
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title="进行中">
          {/* <h2>进行中</h2> */}
          {/* <ul> */}
          {ongoingList.map((props) => (
            <KanbanCard {...props} />
          ))}
          {/* </ul> */}
        </KanbanColumn>

        <KanbanColumn className="column-done" title="已完成">
          {/* <h2>已完成</h2> */}
          {/* <ul> */}
          {doneList.map((props) => (
            <KanbanCard {...props} />
          ))}
          {/* </ul> */}
        </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
