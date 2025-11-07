import './css/furniture_details_modal.css';
import './js/modal.js';
// Логіка сторінки index.html
import { loadFurnitures } from './js/handlers.js';
document.addEventListener('DOMContentLoaded', async () => {
  console.log(' Перевірка API...');
  const furnitures = await loadFurnitures({ page: 1, limit: 8 });
  console.log('Меблі:', furnitures);
});

import './js/render-function.js';
