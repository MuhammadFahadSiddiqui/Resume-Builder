document.addEventListener('DOMContentLoaded', () => {
    const addSkillButton = document.getElementById('addSkillButton');
    const skillsContainer = document.getElementById('skillsContainer');
    const resumeForm = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const { jsPDF } = window.jspdf;

    // Add new skill input field
    addSkillButton.addEventListener('click', () => {
        const skillContainer = document.createElement('div');
        
        const newSkillInput = document.createElement('input');
        newSkillInput.type = 'text';
        newSkillInput.name = 'skills[]';
        newSkillInput.placeholder = 'Enter a skill';
        newSkillInput.required = true;

        // Create remove button for skill
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        
        removeButton.addEventListener('click', () => {
            skillContainer.remove();
        });

        skillContainer.appendChild(newSkillInput);
        skillContainer.appendChild(removeButton);
        skillsContainer.appendChild(skillContainer);
    });

    // Update the preview on input changes
    resumeForm.addEventListener('input', () => {
        const firstName = document.getElementById('firstName').value || 'John';
        const lastName = document.getElementById('lastName').value || 'Doe';
        const email = document.getElementById('email').value || 'example@example.com';
        const education = document.getElementById('education').value || 'Your degree';
        const experience = document.getElementById('experience').value || 'Describe your work experience';
        const skills = Array.from(document.querySelectorAll('input[name="skills[]"]'))
            .map(input => input.value)
            .filter(skill => skill.trim() !== '');

        resumePreview.innerHTML = `
            <h2>${firstName} ${lastName}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Education:</strong> ${education}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <div><h3>Skills</h3><ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul></div>
        `;
    });

    // Handle form submission and generate PDF
    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const doc = new jsPDF();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = Array.from(document.querySelectorAll('input[name="skills[]"]'))
            .map(input => input.value)
            .filter(skill => skill.trim() !== '')
            .join(', ');

        doc.setFontSize(12);
        doc.text(`Name: ${firstName} ${lastName}`, 10, 10);
        doc.text(`Email: ${email}`, 10, 20);
        doc.text(`Education: ${education}`, 10, 30);
        doc.text(`Experience: ${experience}`, 10, 40);
        doc.text(`Skills: ${skills}`, 10, 50);

        doc.save('resume.pdf');
    });
});