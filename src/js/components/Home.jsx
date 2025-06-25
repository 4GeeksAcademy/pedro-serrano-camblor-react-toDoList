import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	//Declarar estados
	const [newTask, setNewTask] = useState("")
	const [tasks, setTasks] = useState([])

	//Funciones
	function addTask(event) {

		if (event.key === "Enter") {
			//agregar tarea a la lista de tareas
			/* setTasks(tasks.concat(newTask)); */

			fetch('https://playground.4geeks.com/todo/todos/pedro-sc', {
				method: "POST",
				body: JSON.stringify({
					"label": newTask,
					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then((response) => {
					console.log(response);
					if (response.status === 201) {
						getTasks();
						setNewTask("");
					}

					return response.json()
				})
				.then((data) => console.log(data))
				.catch((error) => console.log(error))
		}
	}

	function removeTask(id) {

		fetch('https://playground.4geeks.com/todo/todos/' + id, { method: "DELETE" })

			.then((response) => {
				if (response.ok) {
					getTasks();
				}
			})
			.then((data) => setTasks(data.todos))
			.catch((error) => console.log(error))
	}

	function getTasks() {

		fetch('https://playground.4geeks.com/todo/users/pedro-sc', { method: "GET" })
			.then((response) => {

				return response.json()
			})
			.then((data) => setTasks(data.todos))
			.catch((error) => console.log(error))
	}

	function createUser() {

		fetch('https://playground.4geeks.com/todo/users/pedro-sc', { method: "POST" })
			.then((response) => {
				if (response.status === 400) {
					getTasks();
				}
				return response.json()
			})
			.then((data) => console.log(data))
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		createUser()
	}, [])


	return (
		<div className="text-center">

			<h3 className="text-center mt-5 text-dark">pedro-sc tareas</h3>

			<div className="container">

				<div className="row">
					<div className="col-3"></div>
					<input className="col-6"
						type="text"
						placeholder="texto aqui"
						value={newTask}
						onChange={(event) => setNewTask(event.target.value)}
						onKeyDown={addTask} />
					<div className="col-3"></div>
				</div>

				<div className="row">
					<div className="col-3"></div>
					<ul className="col-6 list-group">

						{tasks.map((task, index) =>
							<li key={index} className="list-group-item d-flex align-items-center border border-2 py-1 my-1">
								<span>{task.label}</span>

								<div className="ms-auto d-flex gap-2">
									<button className="btn btn-sm btn-danger" onClick={() => removeTask(task.id)}>X</button>
								</div>

							</li>
						)}

					</ul>
					<div className="col-3"></div>
				</div>


				<p>
					{`${tasks.length} items left`}
				</p>
			</div>
		</div>
	);


};

export default Home;