function getDoctors() {
    return JSON.parse(localStorage.getItem('doctorsList')) || [];
}
function getPatients() {
    return JSON.parse(localStorage.getItem('patientsList')) || [];
}
function showSuggestions(inputId, listId, items, key) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    const query = input.value.trim().toLowerCase();
    if (!query) {
        list.style.display = 'none';
        return;
    }
    const matches = items.filter(item => item[key].toLowerCase().includes(query));
    if (matches.length === 0) {
        list.style.display = 'none';
        return;
    }
    list.innerHTML = '';
    matches.forEach(match => {
        const li = document.createElement('li');
        li.textContent = match[key];
        li.addEventListener('mousedown', function() {
            input.value = match[key];
            list.style.display = 'none';
        });
        list.appendChild(li);
    });
    list.style.display = 'block';
}
document.getElementById('doctor-search').addEventListener('input', function() {
    showSuggestions('doctor-search', 'doctor-suggestions', getDoctors(), 'name');
});
document.getElementById('doctor-search').addEventListener('blur', function() {
    setTimeout(() => document.getElementById('doctor-suggestions').style.display = 'none', 100);
});
document.getElementById('patient-search').addEventListener('input', function() {
    showSuggestions('patient-search', 'patient-suggestions', getPatients(), 'name');
});
document.getElementById('patient-search').addEventListener('blur', function() {
    setTimeout(() => document.getElementById('patient-suggestions').style.display = 'none', 100);
});