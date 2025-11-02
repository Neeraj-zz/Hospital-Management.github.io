// Utility functions
function getDoctors() {
    return JSON.parse(localStorage.getItem('doctorsList')) || [];
}
function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}
function getAppointments() {
    return JSON.parse(localStorage.getItem('appointmentsList')) || [];
}

// Doctor Search
function renderDoctorResults(query) {
    const doctors = getDoctors();
    const tbody = document.getElementById('doctor-search-results');
    tbody.innerHTML = '';
    const q = query.trim().toLowerCase();
    doctors.forEach(doc => {
        if (
            doc.name.toLowerCase().includes(q) ||
            doc.specialization.toLowerCase().includes(q)
        ) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${doc.name}</td>
                <td>${doc.specialization}</td>
                <td>${doc.availability}</td>
                <td>${doc.contact}</td>
            `;
            tbody.appendChild(tr);
        }
    });
}
document.getElementById('search-doctor').addEventListener('input', function() {
    renderDoctorResults(this.value);
});
document.addEventListener('DOMContentLoaded', function() {
    renderDoctorResults('');
});

// Patient Search
function renderPatientResults(query) {
    const patients = getPatients();
    const tbody = document.getElementById('patient-search-results');
    tbody.innerHTML = '';
    const q = query.trim().toLowerCase();
    patients.forEach((pat, idx) => {
        if (
            pat.name.toLowerCase().includes(q) ||
            idx.toString().includes(q)
        ) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx}</td>
                <td>${pat.name}</td>
                <td>${pat.age}</td>
                <td>${pat.gender}</td>
                <td>${pat.symptoms}</td>
                <td>${pat.contact}</td>
            `;
            tbody.appendChild(tr);
        }
    });
}
document.getElementById('search-patient').addEventListener('input', function() {
    renderPatientResults(this.value);
});
document.addEventListener('DOMContentLoaded', function() {
    renderPatientResults('');
});

// Appointment Filter
function populateDoctorDropdown() {
    const select = document.getElementById('filter-appointment-doctor');
    const doctors = getDoctors();
    select.length = 1;
    doctors.forEach((doc, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = doc.name + (doc.specialization ? ' - ' + doc.specialization : '');
        select.appendChild(opt);
    });
}
function renderAppointmentResults() {
    const doctorIdx = document.getElementById('filter-appointment-doctor').value;
    const date = document.getElementById('filter-appointment-date').value;
    const appointments = getAppointments();
    const patients = getPatients();
    const doctors = getDoctors();
    const tbody = document.getElementById('appointment-filter-results');
    tbody.innerHTML = '';
    appointments.forEach(app => {
        if (
            (doctorIdx === '' || app.doctorIdx == doctorIdx) &&
            (date === '' || app.date === date)
        ) {
            const patient = patients[app.patientIdx] ? patients[app.patientIdx].name : 'Unknown';
            const doctor = doctors[app.doctorIdx] ? doctors[app.doctorIdx].name : 'Unknown';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${patient}</td>
                <td>${doctor}</td>
                <td>${app.date}</td>
                <td>${app.time}</td>
            `;
            tbody.appendChild(tr);
        }
    });
}
document.getElementById('filter-appointments-btn').addEventListener('click', renderAppointmentResults);
document.addEventListener('DOMContentLoaded', function() {
    populateDoctorDropdown();
    renderAppointmentResults();
}); 