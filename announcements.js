const DEFAULT_NOTICES = [
    'Doctor not available today',
    'OPD timings updated: 9am-2pm',
    'COVID-19 vaccination ongoing',
    'Blood donation camp on 15th June',
];
function getNotices() {
    const n = JSON.parse(localStorage.getItem('hospitalNotices'));
    return n && n.length ? n : DEFAULT_NOTICES;
}
function saveNotices(notices) {
    localStorage.setItem('hospitalNotices', JSON.stringify(notices));
}
function updateMarquee() {
    const notices = getNotices();
    document.getElementById('notice-marquee').textContent = notices.join('   |   ');
}
function updateNoticeList() {
    const notices = getNotices();
    const ul = document.getElementById('notice-list');
    ul.innerHTML = '';
    notices.forEach(n => {
        const li = document.createElement('li');
        li.textContent = n;
        ul.appendChild(li);
    });
}
document.getElementById('notice-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('notice-input');
    const notice = input.value.trim();
    if (!notice) return;
    const notices = getNotices().filter(n => !DEFAULT_NOTICES.includes(n));
    notices.push(notice);
    saveNotices(notices);
    updateMarquee();
    input.value = '';
});
document.getElementById('show-modal').addEventListener('click', function() {
    updateNoticeList();
    document.getElementById('modal').style.display = 'block';
});
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});
window.onclick = function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};
document.addEventListener('DOMContentLoaded', updateMarquee); 