// Get DOM elements
const studentForm = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

// Load students when the page loads
window.addEventListener("DOMContentLoaded", loadStudents);

// Handle form submission
studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // Validation checks
    if (!name || !id || !email || !contact) {
        alert("⚠️ Please fill in all fields!");
        return;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("⚠️ Name must contain only letters.");
        return;
    }
    if (!/^[0-9]+$/.test(id)) {
        alert("⚠️ Student ID must contain only numbers.");
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("⚠️ Please enter a valid email address.");
        return;
    }
    if (!/^[0-9]{10}$/.test(contact)) {
        alert("⚠️ Contact number must be exactly 10 digits.");
        return;
    }

    // Create student object
    const student = { name: name, id: id, email: email, contact: contact };

    // Save to localStorage
    saveStudent(student);

    // Add to table
    addStudentToTable(student);

    // Reset form
    studentForm.reset();

    alert("✅ Student added successfully!");
});

// Save a new student to local storage
function saveStudent(student) {
    var students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

// Load students from local storage
function loadStudents() {
    var students = JSON.parse(localStorage.getItem("students")) || [];
    studentList.innerHTML = ""; // clear table
    for (var i = 0; i < students.length; i++) {
        addStudentToTable(students[i]);
    }
}

// Add a student row to the table
function addStudentToTable(student) {
    var row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="action-btn edit">Edit</button>
            <button class="action-btn delete">Delete</button>
        </td>
    `;
    studentList.appendChild(row);

    // Edit button
    row.querySelector(".edit").addEventListener("click", function () {
        editStudent(student);
        row.remove();
    });

    // Delete button
    row.querySelector(".delete").addEventListener("click", function () {
        deleteStudent(student.id);
        row.remove();
    });
}

// Delete student from local storage
function deleteStudent(id) {
    var students = JSON.parse(localStorage.getItem("students")) || [];
    var updatedStudents = [];
    for (var i = 0; i < students.length; i++) {
        if (students[i].id !== id) {
            updatedStudents.push(students[i]);
        }
    }
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    alert("🗑️ Student deleted successfully!");
}

// Edit student — fills form for editing
function editStudent(student) {
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentID").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    deleteStudent(student.id);
}
