import React from "react";


function TaskList({ tasks, onDeleteTask }) {
    return (
        <ul className="list-group">
            {tasks.map((tasks) => (
            <li key={tasks.id} className="list-group-item d-flex justify-content-between aling-items-center">
                {task.title}
                <button onClick={() => onDeleteTask(task.id)} className="btn btn-danger btn-sm">Excluir</button>
            </li>))}
        </ul>
    )
}