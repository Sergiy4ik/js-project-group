import {
  handlerClickCategory,
  initialHome,
  onLoadMoreClick,
} from './js/handlers';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', initialHome);
refs.categories.addEventListener('click', handlerClickCategory);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
