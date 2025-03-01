

   function showLogin() {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('signupForm').classList.add('hidden');
    }

    function showSignup() {
        document.getElementById('signupForm').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('hidden');
    }

    function authenticate() {
        const student_id = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('student', JSON.stringify(data.student));
                window.location.reload();
            } else {
                document.getElementById('errorMsg').innerText = data.message;
                document.getElementById('errorMsg').classList.remove('hidden');
            }
        })
        .catch(error => console.error('Error:', error));
        const student = studentsData.find(s => s.student_id === username && s.password === password);
            
            
    }

    function registerStudent() {
        const student_sign = document.getElementById('signup_id').value;
        const name  = document.getElementById('signup_name').value;
        const password_sign = document.getElementById('signup_password').value;

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_sign, name, password_sign })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                showLogin();
            } else {
                document.getElementById('signupMsg').innerText = data.message;
                document.getElementById('signupMsg').classList.remove('hidden');
            }
        })
        .catch(error => console.error('Error:', error));
    }
   
   
    
    function loadAttendance() {
        const student = JSON.parse(sessionStorage.getItem('student'));
        if (student) {

            let table = `<tr><th>Subject</th><th>Attendance (%)</th></tr>`;
            for (let subject in student.attendance) {
                table += `<tr><td>${subject}</td><td>${student.attendance[subject]}</td></tr>`;
            }
            document.getElementById('attendanceTable').innerHTML = table;
            document.getElementById('studentDetails').classList.add('hidden');
            document.getElementById('attendanceDetails').classList.remove('hidden');
        }
    }
    function loadResults() {
        const student = JSON.parse(sessionStorage.getItem('student'));
        if (student) {
            let results = "";
            for (let year in student.results) {
                results += `<p><strong>${year}:</strong> ${student.results[year]}</p>`;
            }
            document.getElementById('resultsData').innerHTML = results;
            document.getElementById('studentDetails').classList.add('hidden');
            document.getElementById('resultsDetails').classList.remove('hidden');
        }
    }

    function loadFeeDetails() {
        const student = JSON.parse(sessionStorage.getItem('student'));
        if (student) {
            let table = `<tr><th>Year</th><th>Total Fee</th><th>Paid</th><th>Pending</th></tr>`;
            for (let year in student.fee_details) {
                table += `<tr>
                    <td>${year}</td>
                    <td>${student.fee_details[year].Total}</td>
                    <td>${student.fee_details[year].Paid}</td>
                    <td>${student.fee_details[year].Pending}</td>
                </tr>`;
            }
            document.getElementById('feeTable').innerHTML = table;
            document.getElementById('studentDetails').classList.add('hidden');
            document.getElementById('feeDetails').classList.remove('hidden');
        }
    }

    function backToDetails() {
        document.querySelectorAll('.box').forEach(box => box.classList.add('hidden'));
        document.getElementById('studentDetails').classList.remove('hidden');
    }

    function logout() {
        sessionStorage.removeItem('student');
        document.querySelectorAll('.box').forEach(box => box.classList.add('hidden'));
    }
