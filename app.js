// Capturar el formulario
const form = document.getElementById("formTurno");

// Capturar la lista
const lista = document.getElementById("listaTurnos");

// Evento cuando se envía el formulario
form.addEventListener("submit", function(e) {
    e.preventDefault(); // evita recargar la página

    // Obtener valores
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;

    // Crear elemento de lista
    const li = document.createElement("li");
    li.textContent = `Turno: ${nombre} - ${fecha}`;

    // Agregar a la lista
    lista.appendChild(li);

    // Limpiar formulario
    form.reset();
});