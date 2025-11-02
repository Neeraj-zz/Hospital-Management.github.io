// Utility to get all patients
function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}

function getRecordsKey(patientIdx) {
    return 'records_' + patientIdx;
}

function getRecords(patientIdx) {
    return JSON.parse(localStorage.getItem(getRecordsKey(patientIdx))) || [];
}

function saveRecords(patientIdx, records) {
    localStorage.setItem(getRecordsKey(patientIdx), JSON.stringify(records));
}

function populatePatientDropdown() {
    const select = document.getElementById('record-patient-select');
    const patients = getPatients();
    select.length = 1;
    patients.forEach((pat, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = pat.name + (pat.contact ? ' (' + pat.contact + ')' : '');
        select.appendChild(opt);
    });
}

function renderRecords(patientIdx) {
    const records = getRecords(patientIdx);
    const tbody = document.getElementById('record-table-body');
    tbody.innerHTML = '';
    records.forEach((rec, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${rec.date}</td>
            <td>${rec.diagnosis}</td>
            <td>${rec.prescriptions}</td>
            <td>
                <button class="edit-btn" data-idx="${idx}">Edit</button>
                <button class="delete-btn" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function resetForm() {
    document.getElementById('record-form').reset();
    document.getElementById('record-id').value = '';
    document.getElementById('cancel-edit').style.display = 'none';
    document.querySelector('#record-form button[type="submit"]').textContent = 'Add Record';
}

document.getElementById('record-patient-select').addEventListener('change', function() {
    const patientIdx = this.value;
    if (patientIdx === '') {
        document.querySelector('.add-record').style.display = 'none';
        document.querySelector('.record-list').style.display = 'none';
        return;
    }
    document.querySelector('.add-record').style.display = '';
    document.querySelector('.record-list').style.display = '';
    renderRecords(patientIdx);
    resetForm();
});

document.getElementById('record-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const patientIdx = document.getElementById('record-patient-select').value;
    const id = document.getElementById('record-id').value;
    const date = document.getElementById('record-date').value;
    const diagnosis = document.getElementById('record-diagnosis').value.trim();
    const prescriptions = document.getElementById('record-prescriptions').value.trim();
    let records = getRecords(patientIdx);
    if (id) {
        // Edit
        records[id] = { date, diagnosis, prescriptions };
    } else {
        // Add
        records.push({ date, diagnosis, prescriptions });
    }
    saveRecords(patientIdx, records);
    renderRecords(patientIdx);
    resetForm();
});

document.getElementById('cancel-edit').addEventListener('click', resetForm);

document.getElementById('record-table-body').addEventListener('click', function(e) {
    const patientIdx = document.getElementById('record-patient-select').value;
    if (e.target.classList.contains('edit-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const records = getRecords(patientIdx);
        const rec = records[idx];
        document.getElementById('record-id').value = idx;
        document.getElementById('record-date').value = rec.date;
        document.getElementById('record-diagnosis').value = rec.diagnosis;
        document.getElementById('record-prescriptions').value = rec.prescriptions;
        document.getElementById('cancel-edit').style.display = '';
        document.querySelector('#record-form button[type="submit"]').textContent = 'Update Record';
    } else if (e.target.classList.contains('delete-btn')) {
        const idx = e.target.getAttribute('data-idx');
        let records = getRecords(patientIdx);
        if (confirm('Are you sure you want to delete this record?')) {
            records.splice(idx, 1);
            saveRecords(patientIdx, records);
            renderRecords(patientIdx);
            resetForm();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    populatePatientDropdown();
}); 