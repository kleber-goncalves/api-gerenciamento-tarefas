import React, { useState } from 'react';

function TaskForm({ onCreateTask }) {
    const [title, setTitle] = useState('');

    const handLeSubmit = (e) => {
        e.preventDefault();
        onCreateTask({ title });
        setTitle(''); // limpar o campo apos o envio
    };
}
