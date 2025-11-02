function getFeedbackList() {
    return JSON.parse(localStorage.getItem('feedbackList')) || [];
}
function saveFeedbackList(list) {
    localStorage.setItem('feedbackList', JSON.stringify(list));
}
function todayDate() {
    return new Date().toISOString().slice(0, 10);
}
function renderSummary() {
    const list = getFeedbackList();
    const today = todayDate();
    const complaintsToday = list.filter(fb => fb.type === 'Complaint' && fb.date === today).length;
    const feedbacksToday = list.filter(fb => fb.type === 'Feedback' && fb.date === today).length;
    let msg = '';
    if (complaintsToday > 0) msg += `${complaintsToday} complaint${complaintsToday > 1 ? 's' : ''} today. `;
    if (feedbacksToday > 0) msg += `${feedbacksToday} feedback${feedbacksToday > 1 ? 's' : ''} today.`;
    if (!msg) msg = 'No feedback or complaints today.';
    document.getElementById('summary').textContent = msg;
}
function renderFeedbackList() {
    const list = getFeedbackList();
    const tbody = document.getElementById('feedback-list-body');
    tbody.innerHTML = '';
    list.slice().reverse().forEach(fb => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${fb.date}</td>
            <td>${fb.name}</td>
            <td>${fb.role}</td>
            <td>${fb.type}</td>
            <td>${fb.message}</td>
        `;
        tbody.appendChild(tr);
    });
}
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('fb-name').value.trim();
    const role = document.getElementById('fb-role').value;
    const type = document.getElementById('fb-type').value;
    const message = document.getElementById('fb-message').value.trim();
    if (!name || !role || !type || !message) return;
    const list = getFeedbackList();
    list.push({ date: todayDate(), name, role, type, message });
    saveFeedbackList(list);
    renderSummary();
    renderFeedbackList();
    this.reset();
});
document.addEventListener('DOMContentLoaded', function() {
    renderSummary();
    renderFeedbackList();
}); 