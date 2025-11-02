const faqs = [
    { q: 'What are OPD timings?', a: 'OPD timings are 9am to 2pm, Monday to Saturday.' },
    { q: 'How to book an appointment?', a: 'Go to Appointment Scheduling and fill the form.' },
    { q: 'How can I get my lab test report?', a: 'Lab test reports are available at the Lab Test Requests section or at the reception.' },
    { q: 'How to contact a doctor?', a: 'See the Doctor Management section for contact details.' },
    { q: 'Where is the billing counter?', a: 'Billing counter is near the main entrance.' },
    { q: 'How to get a prescription?', a: 'Doctors provide prescriptions after consultation. See Prescription Builder.' },
];
function renderFaqs() {
    const ul = document.getElementById('faq-list');
    ul.innerHTML = '';
    faqs.forEach(faq => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="question">Q: ${faq.q}</span><span class="answer">A: ${faq.a}</span>`;
        ul.appendChild(li);
    });
}
document.getElementById('chatbot-icon').addEventListener('click', function() {
    document.getElementById('chatbot-modal').style.display = 'block';
    renderFaqs();
});
document.getElementById('chatbot-close').addEventListener('click', function() {
    document.getElementById('chatbot-modal').style.display = 'none';
});
window.onclick = function(event) {
    if (event.target === document.getElementById('chatbot-modal')) {
        document.getElementById('chatbot-modal').style.display = 'none';
    }
}; 