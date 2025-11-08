// src/main.js
import refs from './js/refs.js';
import {
  handlerClickCategory,
  initialHome,
  onLoadMoreClick,
  onProductsClick, // 
} from './js/handlers.js';

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  initialHome();

  if (refs.categories && !refs.categories.dataset.bound) {
    refs.categories.addEventListener('click', handlerClickCategory);
    refs.categories.dataset.bound = '1';
  }

  if (refs.loadMoreBtn && !refs.loadMoreBtn.dataset.bound) {
    refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
    refs.loadMoreBtn.dataset.bound = '1';
  }

 
  const productsEl = refs.products || document.getElementById('products');
  if (productsEl && productsEl.dataset.boundModal !== '1') {
    productsEl.addEventListener('click', onProductsClick); 
    productsEl.dataset.boundModal = '1';
  }
});
