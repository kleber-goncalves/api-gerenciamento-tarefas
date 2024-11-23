import React, { useState } from "react";
import PropTypes from "prop-types"; // Importando PropTypes para validação de props

function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask({ title });
    setTitle(""); // limpar o campo apos o envio
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
       {/* Associa o rótulo ao campo de entrada usando o atributo htmlFor */}
        <label  className="form-label">titulo da Tarefa</label>
        <input
          id="taskTitle" // Adiciona um ID para associar ao rótulo
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Campo para digitar o título da tarefa" // Aumenta a acessibilidade
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Criar Tarefa
      </button>
    </form>
  );
}

// Validação de propriedades usando PropTypes
TaskForm.propTypes = {
  onCreateTask: PropTypes.func.isRequired, // Assegura que onCreateTask seja uma função obrigatória
};

export default TaskForm;
