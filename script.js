const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#menu');
const year = document.querySelector('#year');
const form = document.querySelector('#puppy-form');
const formMsg = document.querySelector('#form-msg');
const litterField = document.querySelector('#litter-field');

if (year) year.textContent = new Date().getFullYear();

if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('[data-litter]').forEach((link) => {
  link.addEventListener('click', () => {
    const value = link.getAttribute('data-litter');
    if (litterField && value) {
      const exists = Array.from(litterField.options).some((opt) => opt.value === value || opt.text === value);
      if (!exists) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        litterField.appendChild(option);
      }
      litterField.value = value;
    }
  });
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim() !== '') {
      formMsg.textContent = 'Odeslání se nezdařilo.';
      formMsg.style.color = '#a33';
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    formMsg.textContent = 'Děkujeme za zprávu, ozveme se vám co nejdříve.';
    formMsg.style.color = '#2f7a31';
    form.reset();
  });
}
