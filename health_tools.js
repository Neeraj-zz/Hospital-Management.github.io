// BMI Calculator
function getBmiStatus(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}
document.getElementById('bmi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const h = parseFloat(document.getElementById('bmi-height').value) / 100;
    const w = parseFloat(document.getElementById('bmi-weight').value);
    if (!h || !w) return;
    const bmi = w / (h * h);
    document.getElementById('bmi-result').textContent = `BMI: ${bmi.toFixed(1)} (${getBmiStatus(bmi)})`;
});
// Age Calculator
document.getElementById('age-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const dob = document.getElementById('dob').value;
    if (!dob) return;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    document.getElementById('age-result').textContent = `Age: ${age} years`;
});
// Blood Pressure Checker
function getBpStatus(sys, dia) {
    if (sys < 90 || dia < 60) return 'Low Blood Pressure';
    if (sys < 120 && dia < 80) return 'Normal';
    if (sys < 130 && dia < 80) return 'Elevated';
    if ((sys < 140 && dia < 90) || (sys >= 130 && sys < 140)) return 'High Blood Pressure (Stage 1)';
    if (sys >= 140 || dia >= 90) return 'High Blood Pressure (Stage 2)';
    return 'Consult Doctor';
}
document.getElementById('bp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const sys = parseInt(document.getElementById('bp-sys').value);
    const dia = parseInt(document.getElementById('bp-dia').value);
    if (!sys || !dia) return;
    document.getElementById('bp-result').textContent = getBpStatus(sys, dia);
}); 