const agregarTarea = async () => {
    const descripcion = document.querySelector('#nuevaTarea').value;
    if (descripcion.trim() === '') {
        alert('Por favor, ingresa una descripción para la tarea');
        return;
    }
    const response = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descripcion }),
    });
    const tarea = await response.json();
    agregarTareaALista(tarea);
};

const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    data.tareas.forEach((tarea) => agregarTareaALista(tarea));
};

const agregarTareaALista = (tarea) => {
    const lista = document.querySelector('#listaTareas');
    const li = document.createElement('li');
    li.textContent = tarea.descripcion;

    // Crear botón de eliminar
    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.onclick = () => eliminarTarea(tarea.id); // Llamar a la función para eliminar tarea

    // Agregar el botón de eliminar a la tarea
    li.appendChild(eliminarBtn);
    lista.appendChild(li);
};

// Función para eliminar tarea
const eliminarTarea = async (id) => {
    const response = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        // Eliminar la tarea de la interfaz
        const lista = document.querySelector('#listaTareas');
        const li = Array.from(lista.children).find(item => item.textContent.includes(id));
        lista.removeChild(li);
        alert('Tarea eliminada correctamente');
    } else {
        alert('Error al eliminar la tarea');
    }
};

document.addEventListener('DOMContentLoaded', obtenerTareas);
