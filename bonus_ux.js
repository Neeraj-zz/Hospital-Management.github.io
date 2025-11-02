// --- Doctor/Patient Avatars ---
function getDoctors() {
    return JSON.parse(localStorage.getItem('bonusDoctors')) || [];
}
function saveDoctors(list) {
    localStorage.setItem('bonusDoctors', JSON.stringify(list));
}
function getPatients() {
    return JSON.parse(localStorage.getItem('bonusPatients')) || [];
}
function savePatients(list) {
    localStorage.setItem('bonusPatients', JSON.stringify(list));
}
function renderAvatars() {
    // Doctors
    const doctors = getDoctors();
    const docGrid = document.getElementById('doctor-avatars');
    docGrid.innerHTML = '';
    doctors.forEach((doc, idx) => {
        const div = document.createElement('div');
        div.className = 'avatar';
        div.innerHTML = `<i class="fas fa-user-md"></i>`;
        div.title = doc.name;
        div.addEventListener('click', () => showDetailsModal('doctor', idx));
        docGrid.appendChild(div);
    });
    // Patients
    const patients = getPatients();
    const patGrid = document.getElementById('patient-avatars');
    patGrid.innerHTML = '';
    patients.forEach((pat, idx) => {
        const div = document.createElement('div');
        div.className = 'avatar';
        div.innerHTML = `<i class="fas fa-user-injured"></i>`;
        div.title = pat.name;
        div.addEventListener('click', () => showDetailsModal('patient', idx));
        patGrid.appendChild(div);
    });
}
function showDetailsModal(type, idx) {
    const modal = document.getElementById('details-modal');
    const details = document.getElementById('modal-details');
    let data;
    if (type === 'doctor') {
        data = getDoctors()[idx];
        details.innerHTML = `<h3>👨‍⚕️ Doctor Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Specialization:</strong> ${data.specialization}</p>
            <p><strong>Contact:</strong> ${data.contact}</p>
            <p><strong>Other:</strong> ${data.other || '-'}</p>`;
    } else {
        data = getPatients()[idx];
        details.innerHTML = `<h3>🧑‍🦱 Patient Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Disease:</strong> ${data.disease}</p>
            <p><strong>Entry Date:</strong> ${data.entryDate}</p>
            <p><strong>Exit Date:</strong> ${data.exitDate || '-'}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Other:</strong> ${data.other || '-'}</p>`;
    }
    modal.style.display = 'block';
}
document.getElementById('close-modal').onclick = function() {
    document.getElementById('details-modal').style.display = 'none';
};
window.onclick = function(event) {
    if (event.target === document.getElementById('details-modal')) {
        document.getElementById('details-modal').style.display = 'none';
    }
    if (event.target === document.getElementById('add-modal')) {
        document.getElementById('add-modal').style.display = 'none';
    }
};
// Add Doctor/Patient
function showAddForm(type) {
    const container = document.getElementById('add-form-container');
    let html = '';
    if (type === 'doctor') {
        html = `<h3>Add Doctor</h3>
            <form id="add-doctor-form">
                <label>Name: <input type="text" id="doc-name" required></label>
                <label>Specialization: <input type="text" id="doc-spec" required></label>
                <label>Contact: <input type="text" id="doc-contact" required></label>
                <label>Other: <input type="text" id="doc-other"></label>
                <button type="submit">Add Doctor</button>
            </form>`;
    } else {
        html = `<h3>Add Patient</h3>
            <form id="add-patient-form">
                <label>Name: <input type="text" id="pat-name" required></label>
                <label>ID: <input type="text" id="pat-id" required></label>
                <label>Disease: <input type="text" id="pat-disease" required></label>
                <label>Entry Date: <input type="date" id="pat-entry" required></label>
                <label>Exit Date: <input type="date" id="pat-exit"></label>
                <label>Address: <input type="text" id="pat-address" required></label>
                <label>Other: <input type="text" id="pat-other"></label>
                <button type="submit">Add Patient</button>
            </form>`;
    }
    container.innerHTML = html;
    document.getElementById('add-modal').style.display = 'block';
    if (type === 'doctor') {
        document.getElementById('add-doctor-form').onsubmit = function(e) {
            e.preventDefault();
            const list = getDoctors();
            list.push({
                name: document.getElementById('doc-name').value.trim(),
                specialization: document.getElementById('doc-spec').value.trim(),
                contact: document.getElementById('doc-contact').value.trim(),
                other: document.getElementById('doc-other').value.trim()
            });
            saveDoctors(list);
            renderAvatars();
            document.getElementById('add-modal').style.display = 'none';
        };
    } else {
        document.getElementById('add-patient-form').onsubmit = function(e) {
            e.preventDefault();
            const list = getPatients();
            list.push({
                name: document.getElementById('pat-name').value.trim(),
                id: document.getElementById('pat-id').value.trim(),
                disease: document.getElementById('pat-disease').value.trim(),
                entryDate: document.getElementById('pat-entry').value,
                exitDate: document.getElementById('pat-exit').value,
                address: document.getElementById('pat-address').value.trim(),
                other: document.getElementById('pat-other').value.trim()
            });
            savePatients(list);
            renderAvatars();
            document.getElementById('add-modal').style.display = 'none';
        };
    }
}
document.getElementById('add-doctor-btn').onclick = () => showAddForm('doctor');
document.getElementById('add-patient-btn').onclick = () => showAddForm('patient');
document.getElementById('close-add-modal').onclick = function() {
    document.getElementById('add-modal').style.display = 'none';
};
// --- Gallery ---
function getGallery() {
    return JSON.parse(localStorage.getItem('bonusGallery')) || [];
}
function saveGallery(list) {
    localStorage.setItem('bonusGallery', JSON.stringify(list));
}
function renderGallery() {
    const gallery = getGallery();
    const grid = document.getElementById('gallery');
    grid.innerHTML = '';
    gallery.forEach(img => {
        const el = document.createElement('img');
        el.src = img;
        grid.appendChild(el);
    });
}
document.getElementById('add-image-btn').onclick = function() {
    document.getElementById('image-upload').click();
};
document.getElementById('image-upload').onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
        const gallery = getGallery();
        gallery.push(ev.target.result);
        saveGallery(gallery);
        renderGallery();
    };
    reader.readAsDataURL(file);
};
// --- Star Rating ---
function getRating() {
    return parseInt(localStorage.getItem('bonusRating')) || 0;
}
function saveRating(val) {
    localStorage.setItem('bonusRating', val);
}
function renderRating() {
    const rating = getRating();
    const container = document.getElementById('star-rating');
    container.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.className = 'fa-star fas' + (i <= rating ? '' : ' inactive');
        star.addEventListener('click', () => {
            saveRating(i);
            renderRating();
        });
        container.appendChild(star);
    }
    document.getElementById('rating-value').textContent = rating ? `You rated: ${rating} star${rating > 1 ? 's' : ''}` : '';
}
document.addEventListener('DOMContentLoaded', function() {
    renderAvatars();
    renderGallery();
    renderRating();
}); 