document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const navItemsWithDropdown = document.querySelectorAll('nav ul li:has(ul)');

  navItemsWithDropdown.forEach((parentLi, index) => {
    const toggleBtn = document.createElement('button');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', `submenu-${index}`);
    toggleBtn.classList.add('dropdown-toggle');
    toggleBtn.innerHTML = '▼';
    toggleBtn.type = 'button';
    toggleBtn.title = 'Toggle submenu';

    const submenu = parentLi.querySelector('ul');
    submenu.id = `submenu-${index}`;
    submenu.classList.add('dropdown-menu');
    submenu.style.display = 'none';

    const link = parentLi.querySelector('a');
    link.after(toggleBtn);

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

      navItemsWithDropdown.forEach(otherLi => {
        if (otherLi !== parentLi) {
          const otherBtn = otherLi.querySelector('button.dropdown-toggle');
          const otherSubmenu = otherLi.querySelector('ul.dropdown-menu');
          if (otherBtn && otherSubmenu) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherSubmenu.style.display = 'none';
          }
        }
      });

      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      submenu.style.display = isExpanded ? 'none' : 'block';
    });

    toggleBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleBtn.click();
      }
    });
  });

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 0) {
  header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; 
  header.style.backdropFilter = 'blur(8px)';
} else {
  header.style.backgroundColor = 'transparent';
  header.style.backdropFilter = 'none';
}
  });
});
