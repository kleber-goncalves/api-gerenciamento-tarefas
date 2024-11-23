import React from 'react';
import PropTypes from 'prop-types'; // Importando PropTypes para validação de props

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

// Validação de propriedades usando PropTypes
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Definindo que o id da tarefa deve ser uma string
      title: PropTypes.string.isRequired, // Definindo que o título deve ser uma string
    })
  ).isRequired, // tasks deve ser um array de objetos com a forma definida acima e é obrigatório
  onDeleteTask: PropTypes.func.isRequired, // Assegura que onDeleteTask seja uma função obrigatória
};

export default TaskList;
