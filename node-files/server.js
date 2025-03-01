const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = 'students.json';

// Load student data from JSON file
function loadStudents() {
    if (fs.existsSync(FILE_PATH)) {
        return JSON.parse(fs.readFileSync(FILE_PATH));
    }
    return [];
}

// Save student data to JSON file
function saveStudents(students) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(students, null, 2));
}

// Student Login
app.post('/login', (req, res) => {
    const { student_id, password } = req.body;
    const students = loadStudents();

    const student = students.find(s => s.student_id === student_id && s.password === password);

    if (student) {
        res.json({ success: true, student });
    } else {
        res.json({ success: false, message: 'Incorrect Student ID or Password' });
    }
});

// Student Signup (Register New Student)
app.post('/signup', (req, res) => {
    const { student_id, name, password } = req.body;
    let students = loadStudents();

    // Check if student ID already exists
    if (students.find(s => s.student_id === student_id)) {
        return res.json({ success: false, message: 'Student ID already exists!' });
    }

    // Create new student data
    const newStudent = {
        student_id,
        name,
        password,
        attendance: { DSP: "0%", CD: "0%", WT: "0%", OR: "0%", COA: "0%" },
        results: { "PUC 1": "0%", "PUC 2": "0%", "Engineering Year 1": "0%", "Engineering Year 2": "0%" },
        fee_details: {
            "PUC 1": { "Total": "₹50,000", "Paid": "₹0", "Pending": "₹50,000" },
            "PUC 2": { "Total": "₹50,000", "Paid": "₹0", "Pending": "₹50,000" },
            "Engineering Year 1": { "Total": "₹1,00,000", "Paid": "₹0", "Pending": "₹1,00,000" },
            "Engineering Year 2": { "Total": "₹1,00,000", "Paid": "₹0", "Pending": "₹1,00,000" }
        }
    };

    students.push(newStudent);
    saveStudents(students);

    res.json({ success: true, message: 'Signup successful! Please login.' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


// Student Login
app.post('/login', (req, res) => {
    const { student_id, password } = req.body;
    const students = loadStudents();

    const student = students.find(s => s.student_id === student_id && s.password === password);

    if (student) {
        res.json({ success: true, student });
    } else {
        res.json({ success: false, message: 'Incorrect Student ID or Password' });
    }
});

// Student Signup
app.post('/signup', (req, res) => {
    const { student_id, name, password } = req.body;
    let students = loadStudents();

    // Check if student ID already exists
    if (students.find(s => s.student_id === student_id)) {
        return res.json({ success: false, message: 'Student ID already exists!' });
    }

    // Create new student data with random attendance
    const newStudent = {
        student_id,
        name,
        password,
        attendance: {
            "DSP": `${Math.floor(Math.random() * 26) + 75}%`,
            "CD": `${Math.floor(Math.random() * 26) + 75}%`,
            "WT": `${Math.floor(Math.random() * 26) + 75}%`,
            "OR": `${Math.floor(Math.random() * 26) + 75}%`,
            "COA": `${Math.floor(Math.random() * 26) + 75}%`
        },
        results: { "PUC 1": "0%", "PUC 2": "0%", "Engineering Year 1": "0%", "Engineering Year 2": "0%" },
        fee_details: {
            "PUC 1": { "Total": "₹50,000", "Paid": "₹0", "Pending": "₹50,000" },
            "PUC 2": { "Total": "₹50,000", "Paid": "₹0", "Pending": "₹50,000" },
            "Engineering Year 1": { "Total": "₹1,00,000", "Paid": "₹0", "Pending": "₹1,00,000" },
            "Engineering Year 2": { "Total": "₹1,00,000", "Paid": "₹0", "Pending": "₹1,00,000" }
        }
    };

    students.push(newStudent);
    saveStudents(students);

    res.json({ success: true, message: 'Signup successful! Please login.' });
});

// Update Student Data (Attendance, Results, Fees)
app.post('/updateStudent', (req, res) => {
    const { student_id, updatedData } = req.body;
    let students = loadStudents();

    let studentIndex = students.findIndex(s => s.student_id === student_id);
    if (studentIndex !== -1) {
        students[studentIndex] = { ...students[studentIndex], ...updatedData };
        saveStudents(students);
        res.json({ success: true, message: "Student data updated successfully!", student: students[studentIndex] });
    } else {
        res.json({ success: false, message: "Student not found!" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
