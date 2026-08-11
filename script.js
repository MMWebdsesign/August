const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('#menuToggle');
const mobileMenu = document.querySelector('#mobileMenu');
const tabs = document.querySelectorAll('.tab');
const panes = {
  drinks: document.querySelector('#pane-drinks'),
  concept: document.querySelector('#pane-concept')
};
const revealItems = document.querySelectorAll('.reveal');

function handleHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 18);
}

function closeMobileMenu() {
  if (!mobileMenu || !menuToggle) return;
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

window.addEventListener('scroll', handleHeaderState, { passive: true });
handleHeaderState();

if (tabs.length > 0) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      if (!target || !panes[target]) return;

      tabs.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      Object.values(panes).forEach((pane) => {
        pane.classList.remove('active');
        pane.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panes[target].classList.add('active');
      panes[target].hidden = false;
    });
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
