// Guardar datos en localStorage
function saveToLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem('datosPersonales')) || [];
    storedData.push(data);
    localStorage.setItem('datosPersonales', JSON.stringify(storedData));
}

// Mostrar datos en la tabla
function displayData() {
    let storedData = JSON.parse(localStorage.getItem('datosPersonales')) || [];
    let dataTable = document.getElementById('dataTable');
    dataTable.innerHTML = '';
    storedData.forEach((item, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>${item.edad}</td>
            <td>${item.fechaNacimiento}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editData(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteData(${index})">Eliminar</button>
            </td>
        `;
        dataTable.appendChild(row);
    });
}

// Eliminar datos
function deleteData(index) {
    let storedData = JSON.parse(localStorage.getItem('datosPersonales')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('datosPersonales', JSON.stringify(storedData));
    displayData();
}

// Editar datos
function editData(index) {
    let storedData = JSON.parse(localStorage.getItem('datosPersonales')) || [];
    let data = storedData[index];
    document.getElementById('nombre').value = data.nombre;
    document.getElementById('apellido').value = data.apellido;
    document.getElementById('edad').value = data.edad;
    document.getElementById('fechaNacimiento').value = data.fechaNacimiento;

    document.getElementById('dataForm').dataset.editIndex = index;
}

// Evento de envío del formulario
document.getElementById('dataForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let edad = document.getElementById('edad').value;
    let fechaNacimiento = document.getElementById('fechaNacimiento').value;

    let data = { nombre, apellido, edad, fechaNacimiento };

    let editIndex = this.dataset.editIndex;
    if (editIndex !== undefined) {
        let storedData = JSON.parse(localStorage.getItem('datosPersonales')) || [];
        storedData[editIndex] = data;
        localStorage.setItem('datosPersonales', JSON.stringify(storedData));
        this.removeAttribute('data-edit-index');
    } else {
        saveToLocalStorage(data);
    }

    this.reset();
    displayData();
});

// Mostrar datos en la tabla al cargar la página
window.onload = displayData;
