// Inicialización
if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify([]));
}

if (!localStorage.getItem("tratamientos")) {
    localStorage.setItem("tratamientos", JSON.stringify([
        "Mio Up",
        "Depilación Definitiva",
        "Uñas",
        "Lashes",
        "Masajes",
        "Cosmetología"
    ]));
}

if (!localStorage.getItem("turnos")) {
    localStorage.setItem("turnos", JSON.stringify([]));
}

let usuarioActual = null;

// DOM
const registroBox = document.getElementById("registroBox");
const loginBox = document.getElementById("loginBox");
const turnosBox = document.getElementById("turnosBox");
const tratamientoSelect = document.getElementById("tratamiento");
const listaTurnos = document.getElementById("listaTurnos");

// Cargar tratamientos en select
function cargarTratamientos() {
    let tratamientos = JSON.parse(localStorage.getItem("tratamientos"));
    tratamientoSelect.innerHTML = "";
    tratamientos.forEach(t => {
        let opcion = document.createElement("option");
        opcion.textContent = t;
        opcion.value = t;
        tratamientoSelect.appendChild(opcion);
    });
}
cargarTratamientos();

// REGISTRO
document.getElementById("formRegistro").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const dni = document.getElementById("dniRegistro").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuarios.some(u => u.dni === dni)) {
        alert("Ese DNI ya está registrado. Inicie sesión.");
        registroBox.classList.add("d-none");
        loginBox.classList.remove("d-none");
        return;
    }

    usuarios.push({ nombre, apellido, dni });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cuenta creada correctamente. Ahora inicie sesión.");
    registroBox.classList.add("d-none");
    loginBox.classList.remove("d-none");
});

// LOGIN
document.getElementById("formLogin").addEventListener("submit", (e) => {
    e.preventDefault();

    const dni = document.getElementById("dniLogin").value;
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    let encontrado = usuarios.find(u => u.dni === dni);

    if (!encontrado) {
        alert("No se encontró ese DNI.");
        return;
    }

    usuarioActual = encontrado;
    loginBox.classList.add("d-none");
    turnosBox.classList.remove("d-none");

    mostrarTurnos();
});

// GUARDAR TURNO
document.getElementById("btnGuardarTurno").addEventListener("click", () => {
    let tratamiento = tratamientoSelect.value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;

    if (!fecha || !hora) {
        alert("Seleccione fecha y horario.");
        return;
    }

    let dia = new Date(fecha).getDay();
    if (dia === 0 || dia === 6) {
        alert("Los turnos son solo de lunes a viernes.");
        return;
    }

    let turnos = JSON.parse(localStorage.getItem("turnos"));

    turnos.push({
        dni: usuarioActual.dni,
        tratamiento,
        fecha,
        hora
    });

    localStorage.setItem("turnos", JSON.stringify(turnos));

    alert("Turno reservado correctamente.");
    mostrarTurnos();
});

// LISTAR TURNOS DEL USUARIO
function mostrarTurnos() {
    let turnos = JSON.parse(localStorage.getItem("turnos"))
        .filter(t => t.dni === usuarioActual.dni);

    listaTurnos.innerHTML = "";

    turnos.forEach(t => {
        listaTurnos.innerHTML += `
            <div class="alert alert-secondary">
                <strong>${t.fecha}</strong> - ${t.hora} <br>
                ${t.tratamiento}
            </div>
        `;
    });
}