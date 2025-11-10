document.addEventListener('DOMContentLoaded', () => {
  const openMenuBtn = document.querySelector('[data-menu-open]');
  const menu = document.querySelector('.burger-menu');
  const headerNav = document.querySelector('.header-nav');
  const burgerMenuHeaderButton = document.querySelector(
    '.burger-menu-header-button'
  );
  const body = document.body;

  if (!openMenuBtn || !menu || !headerNav) {
    console.warn('Не знайдено елементи меню або хедеру');
    return;
  }

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('burger-menu-navbar-btn-close');
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('data-navbar-close', '');
  closeBtn.innerHTML = `✕`;

  openMenuBtn.insertAdjacentElement('beforebegin', closeBtn);

  openMenuBtn.addEventListener('click', () => {
    menu.classList.add('is-open');
    body.classList.add('no-scroll');
    openMenuBtn.style.display = 'none';
    closeBtn.style.display = 'flex';
  });

  const closeMenu = () => {
    menu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    openMenuBtn.style.display = 'flex';
    closeBtn.style.display = 'none';
  };

  closeBtn.addEventListener('click', closeMenu);
  burgerMenuHeaderButton.addEventListener('click', closeMenu);

  const menuLinks = menu.querySelectorAll('.nav-link');
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  closeBtn.style.display = 'none';
});
