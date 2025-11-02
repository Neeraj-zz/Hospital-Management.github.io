function getPatientIdList() {
    return JSON.parse(localStorage.getItem('patientIdList')) || [];
}
function savePatientIdList(list) {
    localStorage.setItem('patientIdList', JSON.stringify(list));
}
function generatePatientId() {
    const list = getPatientIdList();
    const nextNum = list.length + 1;
    const id = `PAT2025-${String(nextNum).padStart(3, '0')}`;
    return id;
}
function renderIdList() {
    const list = getPatientIdList();
    const tbody = document.getElementById('id-list-body');
    tbody.innerHTML = '';
    list.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.id}</td><td>${item.name}</td>`;
        tbody.appendChild(tr);
    });
}
document.getElementById('patient-id-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('patient-name').value.trim();
    if (!name) return;
    const id = generatePatientId();
    const list = getPatientIdList();
    list.push({ id, name });
    savePatientIdList(list);
    document.getElementById('id-result').textContent = `Generated ID: ${id}`;
    renderIdList();
    this.reset();
});
document.addEventListener('DOMContentLoaded', renderIdList); 