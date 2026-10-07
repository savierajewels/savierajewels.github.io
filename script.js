const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const bagCount = document.querySelector('.bag-count');
const bagLink = document.querySelector('.bag-link');
const toast = document.querySelector('.toast');
let itemCount = 0;
let toastTimeout;

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    siteNav.classList.remove('is-open');
  }
});

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    itemCount += 1;
    bagCount.textContent = String(itemCount);
    bagLink.setAttribute('aria-label', `Shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`);
    toast.textContent = `${button.dataset.product} added to your bag`;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  });
});

document.querySelector('.newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = new FormData(form).get('email');
  form.querySelector('.form-message').textContent = `You’re on the list. Keep an eye on ${email}.`;
  form.reset();
});
