import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [needsFetch,setNeedsFetch]=useState(true)

  useEffect(() => {
    if(needsFetch){
      //Fetch data section
      fetch("https://assets.breatheco.de/apis/fake/todos/user/jossvo")
      .then(resp =>resp.json())
      .then(data=> setTodoList(data));
      setNeedsFetch(false)
    }
  },[needsFetch]);

  const [newTask, setNewTask] = useState("");
  const addTodoItem = (event) => {
    if (event.key === "Enter" && newTask != "") {
      var todos =[...todoList];
      todos.push({"label":newTask,"done":false})

      //Update data with fetch
      fetch('https://assets.breatheco.de/apis/fake/todos/user/jossvo', {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {
        if(resp.ok){
          setNewTask("");
          setNeedsFetch(true);
        }
      })
    }
  };

  const deleteTodoItem = (index) => {
    if(todoList.length>1){
      let newTodo = [...todoList];
      newTodo.splice(index, 1);
    //Update data with deleted list
      fetch('https://assets.breatheco.de/apis/fake/todos/user/jossvo', {
        method: "PUT",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => {if(resp.ok)setNeedsFetch(true)})
    }else alert("Sorry! The list must have AT LEAST 1 item")
  };

  return (
    <div className="container">
      <div className="todoListTitle">todos</div>
      <ul className="list-group">
        <li className="todoInput">
          <input
            className="list-group-item"
            type="text"
            onKeyDown={addTodoItem}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What needs to be done?"
          />
        </li>
        {todoList.map((activity, index) => {
          return (
            <li className="list-group-item list-item" key={index}>
              <div className="activity">{activity.label}</div>
              <div className="deleteItems">
                <i
                  className="fa-regular fa-x"
                  onClick={() => deleteTodoItem(index)}
                ></i>
              </div>
            </li>
          );
        })}
        <li
          className="list-group-item"
          style={{ fontSize: ".9em", color: "grey" }}
        >
          {todoList.length === 0
            ? "Well done! No items left"
            : todoList.length + " items left"}
        </li>
      </ul>
      <div className="first page"></div>
      <div className="second page"></div>
    </div>
  );
};

export default Home;
