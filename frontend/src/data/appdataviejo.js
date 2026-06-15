const estadoApp = {
    pacientes: [],
    citas: [],
    tareas: []
};
let idAnimacionCanvas = null;

function login(event) {
    event.preventDefault();
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('nav-sistema').classList.remove('hidden');
    inicializarCanvasRespiracion();
}

function logout() {
    document.getElementById('form-login').reset();
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('nav-sistema').classList.add('hidden');
    if (idAnimacionCanvas) cancelAnimationFrame(idAnimacionCanvas);
}

function registrarPaciente(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const curp = document.getElementById('curp').value.trim().toUpperCase();
    
    estadoApp.pacientes.push({ id: Date.now(), nombre, curp });
    actualizarSelectoresPacientes();
    document.getElementById('form-paciente').reset();
    alert(`Expediente creado para: ${nombre}`);
}

function actualizarSelectoresPacientes() {
    const selectCita = document.getElementById('select-paciente');
    const selectTarea = document.getElementById('tarea-paciente');
    selectCita.innerHTML = '<option value="">-- Seleccione un paciente --</option>';
    selectTarea.innerHTML = '<option value="">-- Seleccione --</option>';

    estadoApp.pacientes.forEach(paciente => {
        const optionElement = document.createElement('option');
        optionElement.value = paciente.nombre;
        optionElement.textContent = `${paciente.nombre} (${paciente.curp.substring(0, 4)}...)`;
        selectCita.appendChild(optionElement.cloneNode(true));
        selectTarea.appendChild(optionElement);
    });
}

function agendarCita(event) {
    event.preventDefault();
    const paciente = document.getElementById('select-paciente').value;
    const fecha = document.getElementById('fecha-cita').value;
    const hora = document.getElementById('hora-cita').value;
    const modalidad = document.getElementById('modalidad').value;
    const observaciones = document.getElementById('observaciones').value.trim();

    estadoApp.citas.push({
        id: Date.now(),
        paciente,
        fechaHora: `${fecha} a las ${hora}`,
        modalidad,
        observaciones: observaciones || "Sin observaciones",
        estado: 'Agendada'
    });

    document.getElementById('form-cita').reset();
    renderizarTablaCitas();
}

function renderizarTablaCitas() {
    const tbody = document.getElementById('tabla-citas-body');
    tbody.innerHTML = '';

    estadoApp.citas.forEach(cita => {
        const fila = document.createElement('tr');
        let acciones = `<span style="color:gray; font-size:0.85rem;">Historial cerrado</span>`;
        if (cita.estado === 'Agendada') {
            acciones = `
                <div class="actions-btns">
                    <button class="btn-status btn-pospone" onclick="modificarEstadoCita(${cita.id}, 'Pospuesta')">Posponer</button>
                    <button class="btn-status btn-cancel" onclick="modificarEstadoCita(${cita.id}, 'Cancelada')">Cancelar</button>
                </div>
            `;
        }
        fila.innerHTML = `
            <td><strong>${cita.paciente}</strong><br><small style="color:#7f8c8d;">${cita.observaciones}</small></td>
            <td>${cita.fechaHora}</td>
            <td>${cita.modalidad}</td>
            <td><span style="font-weight:bold;">${cita.estado}</span></td>
            <td>${acciones}</td>
        `;
        tbody.appendChild(fila);
    });
}

function modificarEstadoCita(idCita, nuevoEstado) {
    const cita = estadoApp.citas.find(c => c.id === idCita);
    if (cita) {
        cita.estado = nuevoEstado;
        renderizarTablaCitas();
    }
}

function asignarTarea(event) {
    event.preventDefault();
    const paciente = document.getElementById('tarea-paciente').value;
    const descripcion = document.getElementById('descripcion-tarea').value.trim();

    estadoApp.tareas.push({ id: Date.now(), paciente, descripcion, completada: false });
    document.getElementById('form-tarea').reset();
    renderizarListaTareas();
}

function renderizarListaTareas() {
    const contenedor = document.getElementById('lista-tareas');
    contenedor.innerHTML = '';

    estadoApp.tareas.forEach(tarea => {
        const item = document.createElement('li');
        item.className = "task-card";
        item.innerHTML = `
            <input type="checkbox" ${tarea.completada ? 'checked' : ''} onchange="cambiarEstadoTarea(${tarea.id})">
            <span style="${tarea.completada ? 'text-decoration: line-through; color:gray;' : ''}">
                <strong>${tarea.paciente}:</strong> ${tarea.descripcion}
            </span>
        `;
        contenedor.appendChild(item);
    });
}

function cambiarEstadoTarea(idTarea) {
    const tarea = estadoApp.tareas.find(t => t.id === idTarea);
    if (tarea) {
        tarea.completada = !tarea.completada;
        renderizarListaTareas();
    }
}

function inicializarCanvasRespiracion() {
    const canvas = document.getElementById('canvasRespiracion');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let radio = 25;
    let expandiendo = true;

    function renderCiclo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radio, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(84, 122, 106, 0.6)';
        ctx.fill();
        if (expandiendo) { radio += 0.25; if (radio > 45) expandiendo = false; }
        else { radio -= 0.25; if (radio < 22) expandiendo = true; }
        idAnimacionCanvas = requestAnimationFrame(renderCiclo);
    }
    renderCiclo();
}