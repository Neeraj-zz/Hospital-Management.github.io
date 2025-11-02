// LocalStorage Example
const lsInput = document.getElementById('ls-input');
const lsOutput = document.getElementById('ls-output');
document.getElementById('ls-save').addEventListener('click', function() {
    localStorage.setItem('tools_demo', lsInput.value);
    lsOutput.textContent = 'Saved!';
});
document.getElementById('ls-load').addEventListener('click', function() {
    lsInput.value = localStorage.getItem('tools_demo') || '';
    lsOutput.textContent = 'Loaded!';
});

// Modal Example
const modal = document.getElementById('modal');
document.getElementById('open-modal').addEventListener('click', function() {
    modal.style.display = 'block';
});
document.getElementById('close-modal').addEventListener('click', function() {
    modal.style.display = 'none';
    document.getElementById('modal-form').reset();
    document.getElementById('modal-result').textContent = '';
});
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('modal-form').reset();
        document.getElementById('modal-result').textContent = '';
    }
};
document.getElementById('modal-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('modal-name').value.trim();
    const email = document.getElementById('modal-email').value.trim();
    document.getElementById('modal-result').textContent = `Hello, ${name}! Email: ${email}`;
});

// Date Picker Example
document.getElementById('date-picker').addEventListener('change', function() {
    document.getElementById('date-output').textContent = 'Selected: ' + this.value;
}); 