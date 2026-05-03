// Array para guardar turnos
let turnos = [];

// Capturar elementos
const form = document.getElementById("formTurno");
const lista = document.getElementById("listaTurnos");

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

// Evento del formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;

    // Guardar en array
    turnos.push({ nombre, fecha });

    // Volver a dibujar la lista
    renderTurnos();

    form.reset();
});

//llamar a la funcion eliminar
function eliminarTurno(index) {
    // Elimina 1 elemento en la posición index
    turnos.splice(index, 1);

    // Volver a renderizar
    renderTurnos();
}