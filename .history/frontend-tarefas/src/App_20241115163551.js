import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import api from "./axiosConfig";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Função para buscar tarefas da API
  const fetchTask = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setErrorMessage("Erro ao buscar tarefa.");
    }
  };

  // Função para criar uma nova tarefa
  const createTask = async (task) => {
    try {
      const response = await api.post("/tasks", task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Erro ao criar uma tarefa:", error);
      setErrorMessage("Erro ao criar a tarefa.");
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error ao deletar tarefa:", error);
    }
  };

  // Buscar tarefa ao carregar o componete
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Gerenciador de Tarefas</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div className="container mt-5">
        <TaskForm onCreateTask={createTask} />
        <TaskList tasks={tasks} onDeleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
