import {
  handlerClickCategory,
  initialHome,
  onLoadMoreClick,
} from './js/handlers';
import refs from './js/refs';

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  });
});

document.addEventListener('DOMContentLoaded', initialHome);
refs.categories.addEventListener('click', handlerClickCategory);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
