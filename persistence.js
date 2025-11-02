// Export all localStorage data as JSON
function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hospital_data_backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus('Data exported successfully!');
}

// Import JSON file and restore to localStorage
function importData(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            for (const key in data) {
                localStorage.setItem(key, data[key]);
            }
            setStatus('Data imported successfully! Please refresh the page.');
        } catch (err) {
            setStatus('Invalid file or data format.', true);
        }
    };
    reader.readAsText(file);
}

// Clear all localStorage data
function clearData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.clear();
        setStatus('All data cleared! Please refresh the page.');
    }
}

function setStatus(msg, isError) {
    const el = document.getElementById('status-message');
    el.textContent = msg;
    el.style.color = isError ? '#b71c1c' : '#388e3c';
}

document.getElementById('export-data').addEventListener('click', exportData);
document.getElementById('import-data').addEventListener('click', function() {
    document.getElementById('import-file').click();
});
document.getElementById('import-file').addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        importData(e.target.files[0]);
    }
});
document.getElementById('clear-data').addEventListener('click', clearData); 