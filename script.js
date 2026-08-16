
// ---- header scroll state ----
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive:true });
 
// ---- mobile menu ----
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
 
// ---- active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const match = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
      if (match) match.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => navObserver.observe(s));
 
// ---- reveal on scroll ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
// ---- certificate lightbox ----
const lightbox = document.getElementById('lightbox');
const lbTitle = document.getElementById('lb-title');
const lbOrg = document.getElementById('lb-org');
const lbDate = document.getElementById('lb-date');
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    lbTitle.textContent = card.dataset.title;
    lbOrg.textContent = card.dataset.org;
    lbDate.textContent = card.dataset.date;
    lightbox.classList.add('open');
  });
});
document.getElementById('lb-close').addEventListener('click', () => lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
 
// ---- contact form (front-end only placeholder) ----
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = 'Message ready to send — connect this form to your email service to go live.';
});