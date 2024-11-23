import React from "react";
import PropTypes from "prop-types"; // Importando PropTypes para validação de props

function TaskList({ tasks, onDeleteTask }) {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {task.title}
          <button
            onClick={() => onDeleteTask(task.id)}
            className="btn btn-danger btn-sm"
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}



export default TaskList;
