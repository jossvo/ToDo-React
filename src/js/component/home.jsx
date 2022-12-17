import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todoList,setTodoList]=useState([
		"Make the bed",
		"Wash my hands",
		"Eat",
		"Walk the dog"])
	const [newTask,setNewTask]=useState("")
	const addTodoItem = (event)=>{
		if(event.key === 'Enter' && newTask!=""){
			setTodoList([...todoList,newTask]);
			setNewTask("");
		};
	};

	const deleteTodoItem = (index)=>{
		let newTodo =[...todoList];
		newTodo.splice(index,1);
		setTodoList(newTodo);
	};

	return (
		<div className="container">
			<div className="todoListTitle">todos</div>
			<ul className="list-group">
				<li className="todoInput">
					<input className="list-group-item" 
					type="text" 
					onKeyDown={addTodoItem} 
					value={newTask}
					onChange={e=>setNewTask(e.target.value)}
					placeholder="What needs to be done?"/>
				</li>
				{todoList.map((activity,index)=>{
					return( 
						<li className="list-group-item list-item" key={index}>
							<div className="activity">{activity}</div>
							<div className="deleteItems">
								<i class="fa-regular fa-x" 
								onClick={()=>deleteTodoItem(index)}
								></i>
							</div>
						</li>
					)
				})}
				<li className="list-group-item" style={{fontSize:".9em",color:"grey"}}>
					{todoList.length===0?"Well done! No items left": todoList.length+" items left"}
				</li>
			</ul>
				<div className="first page"></div>
				<div className="second page"></div>
		</div>
	);
};

export default Home;
