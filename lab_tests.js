function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}
function getLabTests() {
    return JSON.parse(localStorage.getItem('labTestsList')) || [];
}
function saveLabTests(tests) {
    localStorage.setItem('labTestsList', JSON.stringify(tests));
}
function populatePatientDropdown() {
    const select = document.getElementById('lab-patient-select');
    const patients = getPatients();
    select.length = 1;
    patients.forEach((pat, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = pat.name + (pat.contact ? ' (' + pat.contact + ')' : '');
        select.appendChild(opt);
    });
}
function renderLabTests() {
    const tests = getLabTests();
    const patients = getPatients();
    const tbody = document.getElementById('lab-test-list-body');
    tbody.innerHTML = '';
    tests.forEach((test, idx) => {
        const tr = document.createElement('tr');
        const patient = patients[test.patientIdx] ? patients[test.patientIdx].name : 'Unknown';
        tr.innerHTML = `
            <td>${patient}</td>
            <td>${test.type}</td>
            <td>${test.status}</td>
            <td>${test.date}</td>
            <td>
                ${test.status === 'Pending' ? `<button class="mark-completed" data-idx="${idx}">Mark Completed</button>` : ''}
            </td>
        `;
        tbody.appendChild(tr);
    });
}
document.getElementById('lab-test-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const patientIdx = document.getElementById('lab-patient-select').value;
    const type = document.getElementById('lab-test-type').value;
    if (patientIdx === '' || type === '') return;
    const date = new Date().toISOString().slice(0, 10);
    const tests = getLabTests();
    tests.push({ patientIdx, type, status: 'Pending', date });
    saveLabTests(tests);
    renderLabTests();
    this.reset();
});
document.getElementById('lab-test-list-body').addEventListener('click', function(e) {
    if (e.target.classList.contains('mark-completed')) {
        const idx = e.target.getAttribute('data-idx');
        const tests = getLabTests();
        tests[idx].status = 'Completed';
        saveLabTests(tests);
        renderLabTests();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    populatePatientDropdown();
    renderLabTests();
}); 