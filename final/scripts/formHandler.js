// formHandler.js - Handle form submissions and preservations

export function setupFormHandler() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Store form action in data attribute if it doesn't use the default
    const action = form.getAttribute('action');
    if (action && action.includes('form-action')) {
      form.addEventListener('submit', (e) => {
        // Allow default form submission
        // The form will POST to form-action.html
      });
    }
  });
}

export function displaySubmittedData(params) {
  const submittedInfo = document.getElementById('submitted-info');
  if (!submittedInfo) return;
  
  let dataExists = false;
  let html = '<table style="width: 100%; border-collapse: collapse;">';
  
  for (const [key, value] of params.entries()) {
    if (value && value.trim() !== '') {
      dataExists = true;
      const displayKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
      
      html += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 0.75rem; font-weight: bold; width: 30%; color: #2D5016;">${escapeHtml(displayKey)}:</td>
          <td style="padding: 0.75rem;">${escapeHtml(value)}</td>
        </tr>
      `;
    }
  }
  
  html += '</table>';
  
  if (dataExists) {
    submittedInfo.innerHTML = html;
  } else {
    submittedInfo.innerHTML = '<p style="color: #666; font-style: italic;">Thank you for your submission!</p>';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value || field.value.trim() === '') {
      isValid = false;
      field.style.borderColor = '#c44';
    } else {
      field.style.borderColor = '';
    }
  });
  
  return isValid;
}
