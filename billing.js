// Utility to get all patients
function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}

function populatePatientDropdown() {
    const select = document.getElementById('bill-patient-select');
    const patients = getPatients();
    select.length = 1;
    patients.forEach((pat, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = pat.name + (pat.contact ? ' (' + pat.contact + ')' : '');
        select.appendChild(opt);
    });
}

function updateBillSummary() {
    const patientIdx = document.getElementById('bill-patient-select').value;
    const patients = getPatients();
    const patientName = patientIdx !== '' && patients[patientIdx] ? patients[patientIdx].name : '';
    document.getElementById('bill-patient-name').textContent = patientName;
    const servicesList = document.getElementById('bill-services-list');
    servicesList.innerHTML = '';
    let total = 0;
    document.querySelectorAll('#services-body tr').forEach(row => {
        const name = row.querySelector('.service-name').value.trim();
        const cost = parseFloat(row.querySelector('.service-cost').value) || 0;
        if (name) {
            const li = document.createElement('li');
            li.textContent = `${name}: ₹${cost}`;
            servicesList.appendChild(li);
        }
        total += cost;
    });
    document.getElementById('bill-total').textContent = total;
}

document.getElementById('bill-patient-select').addEventListener('change', function() {
    if (this.value === '') {
        document.querySelector('.bill-form-section').style.display = 'none';
    } else {
        document.querySelector('.bill-form-section').style.display = '';
        updateBillSummary();
    }
});

document.getElementById('add-service').addEventListener('click', function() {
    const tbody = document.getElementById('services-body');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="service-name" required></td>
        <td><input type="number" class="service-cost" min="0" required></td>
        <td><button type="button" class="remove-service">Remove</button></td>
    `;
    tbody.appendChild(tr);
    updateBillSummary();
});

document.getElementById('services-body').addEventListener('input', updateBillSummary);
document.getElementById('services-body').addEventListener('change', updateBillSummary);
document.getElementById('services-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-service')) {
        const row = e.target.closest('tr');
        row.parentNode.removeChild(row);
        updateBillSummary();
    }
});

document.getElementById('bill-form').addEventListener('submit', function(e) {
    e.preventDefault();
    updateBillSummary();
});

document.getElementById('print-bill').addEventListener('click', function() {
    window.print();
});

document.addEventListener('DOMContentLoaded', function() {
    populatePatientDropdown();
    updateBillSummary();
}); 