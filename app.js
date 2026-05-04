// URL de tu backend
const API_URL = "http://127.0.0.1:5000/turnos";

// Estado
let turnos = [];
let editandoIndex = null;

// Elementos del DOM
const form = document.getElementById("formTurno");
const lista = document.getElementById("listaTurnos");

// =========================
// 🔹 CARGAR TURNOS (GET)
// =========================
async function cargarTurnos() {
    try {
        const response = await fetch(API_URL);
        turnos = await response.json();
        renderTurnos();
    } catch (error) {
        console.error("Error al cargar turnos:", error);
    }
}

// =========================
// 🔹 RENDERIZAR LISTA
// =========================
function renderTurnos() {
    lista.innerHTML = "";

    turnos.forEach((turno, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.textContent = `Turno: ${turno.nombre} - ${turno.fecha}`;

        // Contenedor de botones
        const divBotones = document.createElement("div");

        // Botón editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn btn-warning btn-sm me-2";

        btnEditar.addEventListener("click", () => {
            editarTurno(index);
        });

        // Botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger btn-sm";

        btnEliminar.addEventListener("click", () => {
            eliminarTurno(index);
        });

        divBotones.appendChild(btnEditar);
        divBotones.appendChild(btnEliminar);

        li.appendChild(divBotones);
        lista.appendChild(li);
    });
}

// =========================
// 🔹 AGREGAR / EDITAR
// =========================
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;

    try {
        if (editandoIndex !== null) {
            // ✏️ EDITAR (PUT)
            await fetch(`${API_URL}/${editandoIndex}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, fecha })
            });

            editandoIndex = null;
        } else {
            // ➕ CREAR (POST)
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, fecha })
            });
        }

        form.reset();
        cargarTurnos();

    } catch (error) {
        console.error("Error al guardar turno:", error);
    }
});

// =========================
// 🔹 EDITAR (llenar form)
// =========================
function editarTurno(index) {
    const turno = turnos[index];

    document.getElementById("nombre").value = turno.nombre;
    document.getElementById("fecha").value = turno.fecha;

    editandoIndex = index;
}

// =========================
// 🔹 ELIMINAR (DELETE)
// =========================
async function eliminarTurno(index) {
    try {
        await fetch(`${API_URL}/${index}`, {
            method: "DELETE"
        });

        cargarTurnos();

    } catch (error) {
        console.error("Error al eliminar turno:", error);
    }
}

// =========================
// 🔥 INICIAR APP
// =========================
cargarTurnos();