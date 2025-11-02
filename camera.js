// Camera preview
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoPreview = document.getElementById('photo-preview');
const photoInput = document.getElementById('patient-photo');
let currentPhoto = '';

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            video.style.display = 'none';
            document.getElementById('take-photo').style.display = 'none';
            alert('Camera not accessible: ' + err.message);
        });
}

document.getElementById('take-photo').addEventListener('click', function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    photoPreview.src = dataUrl;
    photoPreview.style.display = 'block';
    photoInput.value = dataUrl;
    currentPhoto = dataUrl;
});

function getCameraPatients() {
    return JSON.parse(localStorage.getItem('cameraPatients')) || [];
}
function saveCameraPatients(list) {
    localStorage.setItem('cameraPatients', JSON.stringify(list));
}
function renderPatientList() {
    const list = getCameraPatients();
    const tbody = document.getElementById('patient-list-body');
    tbody.innerHTML = '';
    list.slice().reverse().forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.photo}" alt="photo"></td>
            <td>${p.name}</td>
            <td>${p.disease}</td>
            <td>${p.date}</td>
            <td>${p.id}</td>
            <td>${p.address}</td>
        `;
        tbody.appendChild(tr);
    });
}
document.getElementById('patient-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('patient-name').value.trim();
    const disease = document.getElementById('patient-disease').value.trim();
    const date = document.getElementById('patient-date').value;
    const id = document.getElementById('patient-id').value.trim();
    const address = document.getElementById('patient-address').value.trim();
    const photo = photoInput.value || currentPhoto;
    if (!name || !disease || !date || !id || !address || !photo) {
        alert('Please fill all fields and take a photo.');
        return;
    }
    const list = getCameraPatients();
    list.push({ name, disease, date, id, address, photo });
    saveCameraPatients(list);
    renderPatientList();
    this.reset();
    photoPreview.style.display = 'none';
    photoInput.value = '';
    currentPhoto = '';
});
document.addEventListener('DOMContentLoaded', renderPatientList); 