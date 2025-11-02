// Utility to get value from localStorage or default to 0
function getCount(key) {
    return parseInt(localStorage.getItem(key)) || 0;
}

function updateDashboard() {
    document.getElementById('total-patients').textContent = getCount('patients');
    document.getElementById('total-doctors').textContent = getCount('doctors');
    document.getElementById('total-appointments').textContent = getCount('appointments');
}

document.addEventListener('DOMContentLoaded', updateDashboard); 