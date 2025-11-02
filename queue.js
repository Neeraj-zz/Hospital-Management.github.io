function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}
function getQueue() {
    return JSON.parse(localStorage.getItem('waitingQueue')) || [];
}
function saveQueue(queue) {
    localStorage.setItem('waitingQueue', JSON.stringify(queue));
}
function populatePatientDropdown() {
    const select = document.getElementById('queue-patient-select');
    const patients = getPatients();
    select.length = 1;
    patients.forEach((pat, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = pat.name + (pat.contact ? ' (' + pat.contact + ')' : '');
        select.appendChild(opt);
    });
}
function renderQueue() {
    const queue = getQueue();
    const patients = getPatients();
    const tbody = document.getElementById('queue-list-body');
    tbody.innerHTML = '';
    queue.forEach((patientIdx, i) => {
        const tr = document.createElement('tr');
        const patient = patients[patientIdx] ? patients[patientIdx].name : 'Unknown';
        tr.innerHTML = `<td>${i + 1}</td><td>${patient}</td>`;
        tbody.appendChild(tr);
    });
}
document.getElementById('queue-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const patientIdx = document.getElementById('queue-patient-select').value;
    if (!patientIdx) return;
    const queue = getQueue();
    if (!queue.includes(patientIdx)) {
        queue.push(patientIdx);
        saveQueue(queue);
        renderQueue();
    } else {
        alert('Patient is already in the queue!');
    }
    this.reset();
});
document.getElementById('call-next').addEventListener('click', function() {
    const queue = getQueue();
    if (queue.length > 0) {
        queue.shift();
        saveQueue(queue);
        renderQueue();
    } else {
        alert('No patients in the queue!');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    populatePatientDropdown();
    renderQueue();
}); 