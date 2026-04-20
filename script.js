const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#menu');
const year = document.querySelector('#year');
const form = document.querySelector('#puppy-form');
const formMsg = document.querySelector('#form-msg');
const litterField = document.querySelector('#litter-field');
const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('[data-nav-link]');
const submenuToggles = document.querySelectorAll('.submenu-toggle');

if (year) year.textContent = new Date().getFullYear();

function showPage(pageName) {
  views.forEach((view) => view.classList.toggle('is-visible', view.dataset.page === pageName));
  document.querySelectorAll('.menu-link[data-nav-link]').forEach((item) => {
    item.classList.toggle('active', item.dataset.navLink === pageName);
  });
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const pageName = button.dataset.navLink;
    if (pageName) {
      showPage(pageName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (menu) menu.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  if (button.classList.contains('brand')) {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showPage('home');
      }
    });
  }
});

if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

submenuToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const parent = toggle.closest('.has-submenu');
    if (!parent) return;
    const isOpen = parent.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
});

function setupFilter(groupName, gridId) {
  const group = document.querySelector(`[data-filter-group="${groupName}"]`);
  const cards = document.querySelectorAll(`#${gridId} [data-category]`);
  if (!group || cards.length === 0) return;

  group.querySelectorAll('[data-filter-value]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const value = chip.dataset.filterValue;
      group.querySelectorAll('[data-filter-value]').forEach((btn) => btn.classList.remove('active'));
      chip.classList.add('active');
      cards.forEach((card) => {
        card.style.display = value === 'all' || card.dataset.category === value ? '' : 'none';
      });
    });
  });
}

setupFilter('dogs', 'dogs-grid');
setupFilter('litters', 'litters-grid');

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    if (['feny', 'psi', 'odchovy'].includes(filter)) {
      showPage('dogs');
      const chip = document.querySelector(`[data-filter-group="dogs"] [data-filter-value="${filter}"]`);
      chip?.click();
    }
    if (['aktualni', 'planovane', 'minule'].includes(filter)) {
      showPage('puppies');
      const chip = document.querySelector(`[data-filter-group="litters"] [data-filter-value="${filter}"]`);
      chip?.click();
    }
    if (menu) menu.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-litter]').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.litter;
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
