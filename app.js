

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

        li.textContent = `Turno: ${turno.nombre} - ${turno.fecha} `;

        // Crear botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";

        // Evento para eliminar
        btnEliminar.addEventListener("click", () => {
            eliminarTurno(index);
        });

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
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

    turnos.push({ nombre, fecha });
    guardarTurnos();
    renderTurnos();

    form.reset();
    });


// 🔥 MUY IMPORTANTE
cargarTurnos();