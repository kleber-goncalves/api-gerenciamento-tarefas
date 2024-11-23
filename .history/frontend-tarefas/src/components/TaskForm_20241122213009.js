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
        <label className="form-label">titulo da Tarefa</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Criar Tarefa
      </button>
    </form>
  );
}

export default TaskForm;
