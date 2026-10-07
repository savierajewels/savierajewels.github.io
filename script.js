const menuButton = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const bagCount = document.querySelector('.bag-count');
const bagLink = document.querySelector('.bag-link');
const toast = document.querySelector('.toast');
const products = document.querySelectorAll('.product');
const heroImage = document.querySelector('.hero-image');
const heroVisual = document.querySelector('.hero-visual');
const hero = document.querySelector('.hero');
let itemCount = 0;
let toastTimeout;

if (menuButton && siteNav) {
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
}

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

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get('email');
    form.querySelector('.form-message').textContent = `You’re on the list. Keep an eye on ${email}.`;
    form.reset();
  });
}

products.forEach((product) => {
  product.addEventListener('pointermove', (event) => {
    const rect = product.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    const image = product.querySelector('.product-image');

    image.style.transform = `perspective(1200px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) translateY(-4px)`;
  });

  product.addEventListener('pointerleave', () => {
    const image = product.querySelector('.product-image');
    image.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

if (heroImage && hero && heroVisual) {
  const motion = () => {
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), -1, 1), 1);
    const y = progress * 18;
    heroImage.style.transform = `scale(1.08) translate3d(0, ${y}px, 0)`;
    heroVisual.style.transform = `translate3d(0, ${y * 0.8}px, 0)`;
  };

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(motion);
  }, { passive: true });

  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    heroImage.style.transform = `scale(1.08) translate3d(${x * 0.35}px, ${y * 0.5}px, 0)`;
    heroVisual.style.transform = `translate3d(${x * 0.6}px, ${y * 0.4}px, 0)`;
  }, { passive: true });
}
