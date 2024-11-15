import React from "react";


function TaskList({ tasks, onDeleteTask }) {
    return (
        <ul className="list-group">
            {tasks.map((tasks) => (
            <li key={tasks.id} className="list-gr"))}
        </ul>
    )
}