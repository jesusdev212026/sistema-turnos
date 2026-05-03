// Array para guardar turnos
let turnos = [];

// Capturar elementos
const form = document.getElementById("formTurno");
const lista = document.getElementById("listaTurnos");

// Función para renderizar la lista
function renderTurnos() {
    lista.innerHTML = ""; // limpiar lista

    turnos.forEach((turno, index) => {
        const li = document.createElement("li");
        li.textContent = `Turno: ${turno.nombre} - ${turno.fecha}`;

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