//variable para editar
let editandoIndex = null;

// Array para guardar turnos
let turnos = [];

// Capturar elementos
const form = document.getElementById("formTurno");
const lista = document.getElementById("listaTurnos");

//Guardar turnos
function guardarTurnos() {
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

//Cargar turnos
function cargarTurnos() {
    const datos = localStorage.getItem("turnos");

    if (datos) {
        turnos = JSON.parse(datos);
        renderTurnos();
    }
}    

//Armar html con los datos del formulario
function renderTurnos() {
    lista.innerHTML = "";

    turnos.forEach((turno, index) => {
        const li = document.createElement("li");
              li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.textContent = `Turno: ${turno.nombre} - ${turno.fecha} `;

        //Crear botón editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn btn-warning btn-sm me-2";

        btnEditar.addEventListener("click", () => {
            editarTurno(index);
        });

        // Crear botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger btn-sm";

        // Evento para eliminar
        btnEliminar.addEventListener("click", () => {
            eliminarTurno(index);
        });

        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

//llamar a la funcion editar
function editarTurno(index) {
    const turno = turnos[index];

    // Llenar formulario
    document.getElementById("nombre").value = turno.nombre;
    document.getElementById("fecha").value = turno.fecha;

    // Activar modo edición
    editandoIndex = index;
}

//llamar a la funcion eliminar
function eliminarTurno(index) {
    turnos.splice(index, 1);
    guardarTurnos();
    renderTurnos();
}


// Evento del formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;

    if (editandoIndex !== null) {
        // EDITAR
        turnos[editandoIndex] = { nombre, fecha };
        editandoIndex = null;
    } else {
        // CREAR
        turnos.push({ nombre, fecha });
    }

    guardarTurnos();
    renderTurnos();
    form.reset();
});


// 🔥 MUY IMPORTANTE
cargarTurnos();