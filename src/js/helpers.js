// Допоміжні функції, які знадобляться для реалізації завдання (показ повідомлень, кнопок, лоадерів)

import refs from './refs';

export function showLoadMoreBtn() {
  setTimeout(() => {
    refs.loadMoreBtn.classList.add('is-show');
  }, 500);
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-show');
}
