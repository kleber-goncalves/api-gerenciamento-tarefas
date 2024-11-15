import React, { useState } from 'react';

function TaskForm({ onCreateTask }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateTask({ title });
        setTitle(''); // limpar o campo apos o envio
    };


    return (
        <form onSubmit={handleSubmit} className='mb-4'>
            
        </form>
    )
}
