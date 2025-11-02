const snippets = {
    dashboard: `<!-- Dashboard Summary Example -->\n<div class='dashboard'>\n  <div class='card'>Total Patients: <span>0</span></div>\n  <div class='card'>Total Doctors: <span>0</span></div>\n  <div class='card'>Total Appointments: <span>0</span></div>\n</div>`,
    doctor: `// Add Doctor Example\nfunction addDoctor(name, specialization, contact) {\n  // Save to localStorage\n}`,
    patient: `// Add Patient Example\nfunction addPatient(name, age, gender, symptoms, contact) {\n  // Save to localStorage\n}`,
    appointment: `// Create Appointment Example\nfunction addAppointment(patientIdx, doctorIdx, date, time) {\n  // Save to localStorage\n}`,
    records: `// Add Medical Record Example\nfunction addRecord(patientIdx, diagnosis, prescriptions, date) {\n  // Save to localStorage\n}`,
    billing: `// Billing Example\nfunction generateBill(patientIdx, services) {\n  // Calculate total\n  // Show printable bill\n}`,
    search: `// Search Example\nfunction searchDoctors(query) {\n  // Filter doctors by name/specialization\n}`,
    persistence: `// Export/Import Data Example\nfunction exportData() { /* ... */ }\nfunction importData(file) { /* ... */ }`,
    theme: `// Light/Dark Mode Example\nfunction setTheme(isDark) {\n  document.body.classList.toggle('dark-mode', isDark);\n}`,
    login: `// Fake Login Example\nfunction login(username, password) {\n  if (username === 'admin' && password === 'admin123') {\n    // Redirect\n  }\n}`,
    tools: `// Tools Demo Example\nlocalStorage.setItem('tools_demo', value);`,
    patient_id: `// Patient ID Generator Example\nfunction generatePatientId() {\n  return 'PAT2025-001';\n}`,
    announcements: `// Announcements Example\nfunction addNotice(text) {\n  // Save to localStorage\n}`,
    lab_tests: `// Lab Test Request Example\nfunction addLabTest(patientIdx, type) {\n  // Save to localStorage\n}`,
    feedback: `// Feedback/Complaint Example\nfunction addFeedback(name, role, type, message) {\n  // Save to localStorage\n}`,
    prescription: `// Prescription Builder Example\nfunction addPrescription(patientIdx, symptoms, medicines) {\n  // Save to localStorage\n}`,
    queue: `// Waiting Queue Example\nfunction addToQueue(patientIdx) {\n  // Save to localStorage\n}`,
    realtime_search: `// Real-time Search Example\nfunction showSuggestions(query, list) {\n  // Filter and show suggestions\n}`,
    health_tools: `// BMI Calculator Example\nfunction calculateBMI(height, weight) {\n  return weight / ((height/100) ** 2);\n}`,
    chatbot: `// FAQ Chatbot Example\nconst faqs = [ {q: '...', a: '...'} ];`,
    camera: `// Camera Integration Example\nnavigator.mediaDevices.getUserMedia({ video: true })\n  .then(stream => { /* ... */ });`,
    bonus_ux: `// Parallax, Avatars, Gallery, Rating Example\n// See bonus_ux.js for full code.`
};

document.getElementById('download-template').addEventListener('click', function() {
    const template = `<!DOCTYPE html>\n<html lang='en'>\n<head>\n  <meta charset='UTF-8'>\n  <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n  <title>Sample UI Template</title>\n  <style>body{font-family:Arial,sans-serif;background:#f4f6f8;margin:0;padding:0;}header{background:#1976d2;color:#fff;padding:1rem 2rem;text-align:center;}main{max-width:700px;margin:2rem auto;background:#fff;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.08);padding:2rem;}</style>\n</head>\n<body>\n  <header>\n    <h1>Sample UI Template</h1>\n  </header>\n  <main>\n    <p>This is a sample HTML/JS UI template for your hospital project.</p>\n  </main>\n</body>\n</html>`;
    const blob = new Blob([template], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_ui_template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
document.getElementById('feature-select').addEventListener('change', function() {
    const val = this.value;
    document.getElementById('snippet-output').textContent = val && snippets[val] ? snippets[val] : '';
}); 