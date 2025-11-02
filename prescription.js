function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}
function getPrescriptionsKey(patientIdx) {
    return 'prescriptions_' + patientIdx;
}
function getPrescriptions(patientIdx) {
    return JSON.parse(localStorage.getItem(getPrescriptionsKey(patientIdx))) || [];
}
function savePrescriptions(patientIdx, prescriptions) {
    localStorage.setItem(getPrescriptionsKey(patientIdx), JSON.stringify(prescriptions));
}
function populatePatientDropdowns() {
    const patients = getPatients();
    const selects = [document.getElementById('prescription-patient'), document.getElementById('view-patient')];
    selects.forEach(select => {
        select.length = 1;
        patients.forEach((pat, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = pat.name + (pat.contact ? ' (' + pat.contact + ')' : '');
            select.appendChild(opt);
        });
    });
}
function addMedicineRow(name = '', dosage = '') {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="medicine-name" required value="${name}"></td>
        <td><input type="text" class="medicine-dosage" required value="${dosage}"></td>
        <td><button type="button" class="remove-medicine">Remove</button></td>
    `;
    document.getElementById('medicines-body').appendChild(tr);
}
document.getElementById('add-medicine').addEventListener('click', function() {
    addMedicineRow();
});
document.getElementById('medicines-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-medicine')) {
        const row = e.target.closest('tr');
        row.parentNode.removeChild(row);
    }
});
document.getElementById('prescription-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const patientIdx = document.getElementById('prescription-patient').value;
    const symptoms = document.getElementById('prescription-symptoms').value.trim();
    const medicines = Array.from(document.querySelectorAll('.medicine-name')).map((el, i) => {
        return {
            name: el.value.trim(),
            dosage: document.querySelectorAll('.medicine-dosage')[i].value.trim()
        };
    }).filter(med => med.name && med.dosage);
    if (!patientIdx || !symptoms || medicines.length === 0) return;
    const date = new Date().toISOString().slice(0, 10);
    const prescriptions = getPrescriptions(patientIdx);
    prescriptions.push({ date, symptoms, medicines });
    savePrescriptions(patientIdx, prescriptions);
    alert('Prescription saved!');
    this.reset();
    document.getElementById('medicines-body').innerHTML = '';
    addMedicineRow();
    renderPrescriptionList();
});
document.getElementById('view-patient').addEventListener('change', renderPrescriptionList);
function renderPrescriptionList() {
    const patientIdx = document.getElementById('view-patient').value;
    const ul = document.getElementById('prescription-list');
    ul.innerHTML = '';
    if (!patientIdx) return;
    const prescriptions = getPrescriptions(patientIdx);
    prescriptions.slice().reverse().forEach(pres => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Date:</strong> ${pres.date}<br><strong>Symptoms:</strong> ${pres.symptoms}<br><strong>Medicines:</strong><ul>${pres.medicines.map(med => `<li>${med.name} (${med.dosage})</li>`).join('')}</ul>`;
        ul.appendChild(li);
    });
}
document.getElementById('print-prescription').addEventListener('click', function() {
    window.print();
});
document.addEventListener('DOMContentLoaded', function() {
    populatePatientDropdowns();
    addMedicineRow();
    renderPrescriptionList();
});