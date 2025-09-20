async function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const objective = document.getElementById('objective').value;
  const degree = document.getElementById('degree').value;
  const college = document.getElementById('college').value;
  const portfolio = document.querySelector('input[type="url"]').value;

  const skills = [];
  let i = 1;
  while (document.getElementById(`skill${i}`)) {
    const val = document.getElementById(`skill${i}`).value;
    if (val.trim()) skills.push(val);
    i++;
  }

  const response = await fetch('/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, objective, degree, college, skills, portfolio })
  });

  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'resume.pdf';
  link.click();
}
