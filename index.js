// Get form and table body elements
var studentForm = document.getElementById("studentForm");
var studentList = document.getElementById("studentList");

// Handle form submission
studentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    registerStudent();
});

//  register a student
function registerStudent() {
    var name = document.getElementById("studentName").value.trim();
    var id = document.getElementById("studentID").value.trim();
    var email = document.getElementById("email").value.trim();
    var contact = document.getElementById("contact").value.trim();

    // Validate input fields
    if (name === "" || id === "" || email === "" || contact === "") {
        alert(" Please fill in all fields!");
        return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        alert(" Name must contain only letters.");
        return;
    }

    if (!/^[0-9]+$/.test(id)) {
        alert("Student ID must contain only numbers.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert(" Please enter a valid email address.");
        return;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
        alert(" Contact number must be exactly 10 digits.");
        return;
    }

    addStudentToTable(name, id, email, contact);
    studentForm.reset();
    alert(" Student added successfully!");
}

// add student details to table
function addStudentToTable(name, id, email, contact) {
    var row = document.createElement("tr");

    row.innerHTML =
        "<td>" + name + "</td>" +
        "<td>" + id + "</td>" +
        "<td>" + email + "</td>" +
        "<td>" + contact + "</td>" +
        "<td>" +
            "<button class='action-btn edit'>Edit</button>" +
            "<button class='action-btn delete'>Delete</button>" +
        "</td>";

    studentList.appendChild(row);

    // Add edit button working
    var editBtn = row.querySelector(".edit");
    editBtn.addEventListener("click", function () {
        editStudent(row);
    });

    // Add delete button working
    var deleteBtn = row.querySelector(".delete");
    deleteBtn.addEventListener("click", function () {
        deleteStudent(row);
    });
}

//  edit student details
function editStudent(row) {
    var cells = row.getElementsByTagName("td");

    document.getElementById("studentName").value = cells[0].innerText;
    document.getElementById("studentID").value = cells[1].innerText;
    document.getElementById("email").value = cells[2].innerText;
    document.getElementById("contact").value = cells[3].innerText;

    row.remove();
}

// delete student row
function deleteStudent(row) {
    if (confirm(" Are you sure you want to delete this record?")) {
        row.remove();
    }
}
