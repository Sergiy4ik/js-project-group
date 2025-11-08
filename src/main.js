import {
  handlerClickCategory,
  initialHome,
  onLoadMoreClick,
} from './js/handlers';
import { initFeedbacks } from './js/feedback.js';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', initialHome);
document.addEventListener('DOMContentLoaded', () => {
  initFeedbacks();
});


refs.categories.addEventListener('click', handlerClickCategory);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
