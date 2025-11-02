// Utility to get doctors from localStorage
function getDoctors() {
    return JSON.parse(localStorage.getItem('doctorsList')) || [];
}

function saveDoctors(doctors) {
    localStorage.setItem('doctorsList', JSON.stringify(doctors));
    // Update total doctors count for dashboard
    localStorage.setItem('doctors', doctors.length);
}

function renderDoctors() {
    const doctors = getDoctors();
    const tbody = document.getElementById('doctor-table-body');
    tbody.innerHTML = '';
    doctors.forEach((doc, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${doc.name}</td>
            <td>${doc.specialization}</td>
            <td>${doc.availability}</td>
            <td>${doc.contact}</td>
            <td>
                <button class="edit-btn" data-idx="${idx}">Edit</button>
                <button class="delete-btn" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function resetForm() {
    document.getElementById('doctor-form').reset();
    document.getElementById('doctor-id').value = '';
    document.getElementById('cancel-edit').style.display = 'none';
    document.querySelector('#doctor-form button[type="submit"]').textContent = 'Add Doctor';
}

document.getElementById('doctor-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('doctor-id').value;
    const name = document.getElementById('doctor-name').value.trim();
    const specialization = document.getElementById('doctor-specialization').value.trim();
    const availability = document.getElementById('doctor-availability').value.trim();
    const contact = document.getElementById('doctor-contact').value.trim();
    let doctors = getDoctors();
    if (id) {
        // Edit
        doctors[id] = { name, specialization, availability, contact };
    } else {
        // Add
        doctors.push({ name, specialization, availability, contact });
    }
    saveDoctors(doctors);
    renderDoctors();
    resetForm();
});

document.getElementById('cancel-edit').addEventListener('click', resetForm);

document.getElementById('doctor-table-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const doctors = getDoctors();
        const doc = doctors[idx];
        document.getElementById('doctor-id').value = idx;
        document.getElementById('doctor-name').value = doc.name;
        document.getElementById('doctor-specialization').value = doc.specialization;
        document.getElementById('doctor-availability').value = doc.availability;
        document.getElementById('doctor-contact').value = doc.contact;
        document.getElementById('cancel-edit').style.display = '';
        document.querySelector('#doctor-form button[type="submit"]').textContent = 'Update Doctor';
    } else if (e.target.classList.contains('delete-btn')) {
        const idx = e.target.getAttribute('data-idx');
        let doctors = getDoctors();
        if (confirm('Are you sure you want to delete this doctor?')) {
            doctors.splice(idx, 1);
            saveDoctors(doctors);
            renderDoctors();
            resetForm();
        }
    }
});

document.addEventListener('DOMContentLoaded', renderDoctors); 