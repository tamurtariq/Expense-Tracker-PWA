// Animation utilities
export function animateIn(element) {
  element.hidden = false;
  requestAnimationFrame(() => element.classList.add('active'));
}

export function animateOut(element, callback) {
  element.classList.remove('active');
  setTimeout(() => { element.hidden = true; if (callback) callback(); }, 250);
}

export function slideInElement(element) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(10px)';
  requestAnimationFrame(() => {
    element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
}
