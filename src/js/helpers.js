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


export function roundRating(rating) {
    if (rating < 1 || rating > 5) {
        return rating;
    }

    if (rating >= 3.3 && rating <= 3.7) {
        return 3.5;
    }
    if (rating >= 3.8 && rating <= 4.2) {
        return 4;
    }
    

    return Math.round(rating * 2) / 2;
};

