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
			setTasks(tasks.concat(newTask));
			setNewTask("");
			getTasks()
		}

		/* fetch('https://playground.4geeks.com/todo/todos/pedro-scc', {
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
					getTasks()
				}

				return response.json()
			})
			.then((data) => console.log(data))
			.catch((error) => console.log(error)) */
	}
	//event.preventDefault()



	function removeTask(index) {
		/* alert("Funciona"+id) */
		/* setTasks(tasks.filter((_, index) => index !== id)) */


		/* getTasks() */

		fetch('https://playground.4geeks.com/todo/todos/' + tasks[index].id, { method: "DELETE" })
			.then((response) => {
				return response.json()
			})
			/* .then((data) => console.log(data.todos)) */
			.then((data) => setTasks(data.todos))
			.catch((error) => console.log(error))

	}

	function getTasks() {

		/* console.log("Pidiendo info"); */

		fetch('https://playground.4geeks.com/todo/users/pedro-scc', { method: "GET" })
			.then((response) => {

				return response.json()
			})
			/* .then((data) => console.log(data)) */
			.then((data) => setTasks(data.todos))

			.catch((error) => console.log(error))
	}




	function createUser() {

		fetch('https://playground.4geeks.com/todo/users/pedro-scc', { method: "POST" })
			.then((response) => {

				if (response.status === 400) {
					getTasks();
				}

				return response.json()
			})
			.then((data) => console.log(data))
			.catch((error) => console.log(error))
	}




	// Llamando a funciones
	useEffect(() => {
		//codigo que queremos que se ejecute cuando se cargue el componente

		//createUser()
		getTasks()
	}, [])


	return (
		<div className="text-center">
			{/* Titulo todos */}
			<h3 className="text-center mt-5 text-dark">todos</h3>

			{/* contenedor central */}
			<div className="container">

				{/* Input */}
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

				{/* Lista */}

				<div className="row">
					<div className="col-3">
						{/* <button onClick={createUser}>Crear usuario</button> */}
					</div>
					<ul className="col-6 list-group">
						{/* Añadir que al hacer hover sobre el li, aparezca el botón de "eliminar" */}

						{/* {tasks.map((item) =>
							<li>{item.label}</li>)}
 						*/}
						{tasks.map((tasks, index) =>
							<li key={index} className="list-group-item d-flex align-items-center border border-2 py-1 my-1">
								<span>{tasks.label}</span>

								<div className="ms-auto d-flex gap-2">
									<button className="btn btn-sm btn-danger" onClick={() => removeTask(index)}>X</button>
								</div>

							</li>
						)}

					</ul></div>
				<div className="col-3"></div>




				{/* Contador de elementos en la lista */}
				<p>
					{`${tasks.length} items left`}
				</p>
			</div>
		</div>
	);


};

export default Home;