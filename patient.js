// Utility to get patients from localStorage
function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}

function savePatients(patients) {
    localStorage.setItem('patientsList', JSON.stringify(patients));
    // Update total patients count for dashboard
    localStorage.setItem('patients', patients.length);
}

function renderPatients() {
    const patients = getPatients();
    const tbody = document.getElementById('patient-table-body');
    tbody.innerHTML = '';
    patients.forEach((pat, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pat.name}</td>
            <td>${pat.age}</td>
            <td>${pat.gender}</td>
            <td>${pat.symptoms}</td>
            <td>${pat.contact}</td>
            <td>
                <button class="edit-btn" data-idx="${idx}">Edit</button>
                <button class="delete-btn" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function resetForm() {
    document.getElementById('patient-form').reset();
    document.getElementById('patient-id').value = '';
    document.getElementById('cancel-edit').style.display = 'none';
    document.querySelector('#patient-form button[type="submit"]').textContent = 'Add Patient';
}

document.getElementById('patient-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('patient-id').value;
    const name = document.getElementById('patient-name').value.trim();
    const age = document.getElementById('patient-age').value.trim();
    const gender = document.getElementById('patient-gender').value;
    const symptoms = document.getElementById('patient-symptoms').value.trim();
    const contact = document.getElementById('patient-contact').value.trim();
    let patients = getPatients();
    if (id) {
        // Edit
        patients[id] = { name, age, gender, symptoms, contact };
    } else {
        // Add
        patients.push({ name, age, gender, symptoms, contact });
    }
    savePatients(patients);
    renderPatients();
    resetForm();
});

document.getElementById('cancel-edit').addEventListener('click', resetForm);

document.getElementById('patient-table-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const patients = getPatients();
        const pat = patients[idx];
        document.getElementById('patient-id').value = idx;
        document.getElementById('patient-name').value = pat.name;
        document.getElementById('patient-age').value = pat.age;
        document.getElementById('patient-gender').value = pat.gender;
        document.getElementById('patient-symptoms').value = pat.symptoms;
        document.getElementById('patient-contact').value = pat.contact;
        document.getElementById('cancel-edit').style.display = '';
        document.querySelector('#patient-form button[type="submit"]').textContent = 'Update Patient';
    } else if (e.target.classList.contains('delete-btn')) {
        const idx = e.target.getAttribute('data-idx');
        let patients = getPatients();
        if (confirm('Are you sure you want to delete this patient?')) {
            patients.splice(idx, 1);
            savePatients(patients);
            renderPatients();
            resetForm();
        }
    }
});

document.addEventListener('DOMContentLoaded', renderPatients); 