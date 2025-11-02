// Utility to get and save appointments
function getAppointments() {
    return JSON.parse(localStorage.getItem('appointmentsList')) || [];
}
function saveAppointments(appointments) {
    localStorage.setItem('appointmentsList', JSON.stringify(appointments));
    // Update total appointments count for dashboard
    localStorage.setItem('appointments', appointments.length);
}

function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}
function getDoctors() {
    return JSON.parse(localStorage.getItem('doctorsList')) || [];
}

function populateDropdowns() {
    const patientSelect = document.getElementById('appointment-patient');
    const doctorSelect = document.getElementById('appointment-doctor');
    const patients = getPatients();
    const doctors = getDoctors();
    // Remove old options except first
    patientSelect.length = 1;
    doctorSelect.length = 1;
    patients.forEach((pat, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = pat.name + (pat.contact ? ' (' + pat.contact + ')' : '');
        patientSelect.appendChild(opt);
    });
    doctors.forEach((doc, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = doc.name + (doc.specialization ? ' - ' + doc.specialization : '');
        doctorSelect.appendChild(opt);
    });
}

function renderAppointments() {
    const appointments = getAppointments();
    const patients = getPatients();
    const doctors = getDoctors();
    const tbody = document.getElementById('appointment-table-body');
    tbody.innerHTML = '';
    appointments.forEach((app, idx) => {
        const tr = document.createElement('tr');
        const patient = patients[app.patientIdx] ? patients[app.patientIdx].name : 'Unknown';
        const doctor = doctors[app.doctorIdx] ? doctors[app.doctorIdx].name : 'Unknown';
        tr.innerHTML = `
            <td>${patient}</td>
            <td>${doctor}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td>
                <button class="edit-btn" data-idx="${idx}">Edit</button>
                <button class="delete-btn" data-idx="${idx}">Cancel</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function resetForm() {
    document.getElementById('appointment-form').reset();
    document.getElementById('appointment-id').value = '';
    document.getElementById('cancel-edit').style.display = 'none';
    document.querySelector('#appointment-form button[type="submit"]').textContent = 'Create Appointment';
    populateDropdowns();
}

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('appointment-id').value;
    const patientIdx = document.getElementById('appointment-patient').value;
    const doctorIdx = document.getElementById('appointment-doctor').value;
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    if (patientIdx === '' || doctorIdx === '' || !date || !time) return;
    let appointments = getAppointments();
    if (id) {
        // Edit
        appointments[id] = { patientIdx, doctorIdx, date, time };
    } else {
        // Add
        appointments.push({ patientIdx, doctorIdx, date, time });
    }
    saveAppointments(appointments);
    renderAppointments();
    resetForm();
});

document.getElementById('cancel-edit').addEventListener('click', resetForm);

document.getElementById('appointment-table-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const appointments = getAppointments();
        const app = appointments[idx];
        document.getElementById('appointment-id').value = idx;
        document.getElementById('appointment-patient').value = app.patientIdx;
        document.getElementById('appointment-doctor').value = app.doctorIdx;
        document.getElementById('appointment-date').value = app.date;
        document.getElementById('appointment-time').value = app.time;
        document.getElementById('cancel-edit').style.display = '';
        document.querySelector('#appointment-form button[type="submit"]').textContent = 'Update Appointment';
    } else if (e.target.classList.contains('delete-btn')) {
        const idx = e.target.getAttribute('data-idx');
        let appointments = getAppointments();
        if (confirm('Are you sure you want to cancel this appointment?')) {
            appointments.splice(idx, 1);
            saveAppointments(appointments);
            renderAppointments();
            resetForm();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    populateDropdowns();
    renderAppointments();
});