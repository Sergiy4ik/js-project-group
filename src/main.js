// Логіка сторінки index.html
import { FURNITURE_LIMIT, FURNITURE_PAGE } from './js/constants.js';
import { loadFurnitures } from './js/handlers.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Перевірка API...');
  // testing furnitures
  const furnitures = await loadFurnitures({
    page: FURNITURE_PAGE,
    limit: FURNITURE_LIMIT,
  });
  console.log('Меблі:', furnitures);
});

import './js/render-function.js';
import './js/modal.js';
