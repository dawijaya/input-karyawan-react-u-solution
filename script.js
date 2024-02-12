// Fungsi untuk menambahkan nama dan menampilkan pemberitahuan
function addNameAndShowNotification() {
    const nameSelect = document.getElementById("nameSelect");
    const selectedName = nameSelect.value;
    const shiftRadio = document.getElementById("shiftRadio");
    const cutiRadio = document.getElementById("cutiRadio");
    let attendanceType;

    if (shiftRadio.checked) {
        attendanceType = "Shift";
    } else if (cutiRadio.checked) {
        attendanceType = "Cuti";
    }

    // Validasi jika tidak ada nama yang dipilih atau jenis kehadiran yang dipilih
    if (!selectedName || !attendanceType) {
        alert("Harap pilih nama karyawan dan jenis kehadiran.");
        return;
    }

    // Tampilkan pemberitahuan
    document.getElementById("notification").style.display = "block";

    // Clear form setelah menampilkan pemberitahuan
    nameSelect.value = "";
    shiftRadio.checked = false;
    cutiRadio.checked = false;
    document.getElementById("shiftDropdown").style.display = "none";

    document.getElementById("keteranganTextbox").value = "";

    // Sembunyikan pemberitahuan setelah beberapa detik
    setTimeout(() => {
        document.getElementById("notification").style.display = "none";
    }, 3000);
}

// Tombol "Simpan" untuk menambahkan nama
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function() {
    addNameAndShowNotification();
    const formInputs = document.getElementById("formInputs");
    formInputs.style.display = "none"; // Sembunyikan formulir setelah menambahkan
});

// Fungsi untuk mengatur tampilan berdasarkan jenis kehadiran yang dipilih
function handleJenisInput() {
    const shiftRadio = document.getElementById("shiftRadio");
    const cutiRadio = document.getElementById("cutiRadio");
    const shiftDropdown = document.getElementById("shiftDropdown");
    const keteranganTextbox = document.getElementById("keteranganTextbox");

    shiftRadio.addEventListener("change", function() {
        if (shiftRadio.checked) {
            shiftDropdown.style.display = "block";
            keteranganTextbox.style.display = "none";
        }
    });

    cutiRadio.addEventListener("change", function() {
        if (cutiRadio.checked) {
            shiftDropdown.style.display = "none";
            keteranganTextbox.style.display = "block";
        }
    });
}

// Inisialisasi dropdown nama karyawan
function initNameDropdown() {
    const nameSelect = document.getElementById("nameSelect");
    names.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        nameSelect.appendChild(option);
    });
}

// Panggil fungsi-fungsi di atas dalam event load
window.addEventListener("load", function() {
    handleJenisInput();
    initNameDropdown();
});

// ...

// Fungsi untuk menambahkan nama
function addName() {
    const newName = document.getElementById("nameInput").value;
    if (newName.trim() !== "") {
        names.push(newName);
        const tableBody = getTableBodyByTableId("cutiLiburTable"); // Tambahkan data ke tabel "Cuti / Libur"
        populateTable(tableBody, names, "cutiLiburTable");
        document.getElementById("nameInput").value = ""; // Reset input
        document.getElementById("notification").style.display = "block"; // Tampilkan notifikasi
        setTimeout(() => {
            document.getElementById("notification").style.display = "none"; // Sembunyikan notifikasi setelah beberapa detik
        }, 3000);
    }
}

// Tombol untuk menambahkan nama baru
const addButton = document.getElementById("showFormButton");
addButton.addEventListener("click", function() {
    const formInputs = document.getElementById("formInputs");
    formInputs.style.display = "block";
});



// Tombol "Batal" untuk membatalkan penambahan
const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", function() {
    const formInputs = document.getElementById("formInputs");
    formInputs.style.display = "none"; // Sembunyikan formulir saat dibatalkan
});

// ...

// Data nama awal
const names = ["John Doe", "Jane Smith", "Bob Johnson", "Mary Brown", "Alice Wilson"];
const shift1TableBody = document.getElementById("shift1TableBody");
const shift2TableBody = document.getElementById("shift2TableBody");
const shift3TableBody = document.getElementById("shift3TableBody");
const cutiLiburTableBody = document.getElementById("cutiLiburTableBody");

// Memuat data nama ke dalam tabel saat halaman dimuat
window.addEventListener("load", function() {
    populateTable(shift1TableBody, names, "shift1Table");
    populateTable(shift2TableBody, names, "shift2Table");
    populateTable(shift3TableBody, names, "shift3Table");
});

// Fungsi untuk memuat data ke dalam tabel
function populateTable(table, data, tableId) {
    table.innerHTML = "";

    data.forEach((name, index) => {
        const row = document.createElement("tr");
        const noCell = document.createElement("td");
        noCell.textContent = index + 1;
        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editName(index, tableId));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button"; // Tambahkan kelas "delete-button" di sini
        deleteButton.addEventListener("click", () => deleteName(index, tableId));

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(noCell);
        row.appendChild(nameCell);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
}

// Fungsi untuk mengedit nama
function editName(index, tableId) {
    const newName = prompt("Edit Nama:", names[index]);
    if (newName !== null) {
        names[index] = newName;
        const tableBody = getTableBodyByTableId(tableId);
        populateTable(tableBody, names, tableId);
    }
}

// Fungsi untuk menghapus nama
function deleteName(index, tableId) {
    const confirmation = confirm(`Hapus "${names[index]}"?`);
    if (confirmation) {
        names.splice(index, 1);
        const tableBody = getTableBodyByTableId(tableId);
        populateTable(tableBody, names, tableId);
    }
}

// Fungsi untuk mendapatkan elemen <tbody> berdasarkan ID tabel
function getTableBodyByTableId(tableId) {
    switch (tableId) {
        case "shift1Table":
            return shift1TableBody;
        case "shift2Table":
            return shift2TableBody;
        case "shift3Table":
            return shift3TableBody;
        default:
            return cutiLiburTableBody;
    }
}