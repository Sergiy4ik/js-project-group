import {
  clearFurnitures,
  renderCategories,
  renderFurnitures,
} from './render-function';
import {
  getFurnitures,
  getCategories,
  getFurnituresByCategories,
} from './products-api.js';
import { FURNITURE_LIMIT } from './constants.js';
import refs from './refs.js';
import {
  hideLoader,
  hideLoadMoreBtn,
  showError,
  showInfo,
  showLoader,
  showLoadMoreBtn,
  showWarning,
} from './helpers.js';
import { openProductModal } from './modal.js';

let currentPage = 1;
let currentCategory = '';

export async function initialHome() {
  try {
    showLoader();
    const categories = await getCategories();
    renderCategories(categories);

    currentCategory = 'all';
    const allCategoryItem = refs.categories.children[0];
    allCategoryItem.classList.add('categories-item--active');

    const { furnitures } = await getFurnitures();
    renderFurnitures(furnitures);
    showLoadMoreBtn();
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export async function handlerClickCategory(event) {
  const item = event.target.closest('.category-item');
  if (!item) {
    return;
  }

  const categoriesChildrenArrey = [...event.currentTarget.children];
  categoriesChildrenArrey.map(child => {
    child.classList.remove('categories-item--active');
  });

  clearFurnitures();
  item.classList.add('categories-item--active');
  currentPage = 1;
  currentCategory = item.id;
  showLoader();
  try {
    if (currentCategory === 'all') {
      const { furnitures } = await getFurnitures();
      renderFurnitures(furnitures);
      showLoadMoreBtn();
    } else {
      const { furnitures, totalItems } = await getFurnituresByCategories(
        currentCategory,
        currentPage
      );
      if (!furnitures.length) {
        hideLoadMoreBtn();
        showInfo(`Furnitures in "${item.textContent}" categories is not found`);
        return;
      } else {
        if (totalItems < FURNITURE_LIMIT) {
          hideLoadMoreBtn();
          showInfo(
            `Ended furnitures collections in "${item.textContent}" categories`
          );
        }
        renderFurnitures(furnitures);
      }
    }
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export async function onLoadMoreClick(event) {
  event.preventDefault();
  currentPage++;
  showLoader();

  try {
    if (currentCategory === 'all') {
      const { furnitures, totalItems } = await getFurnitures(currentPage);
      if (totalItems < FURNITURE_LIMIT * currentPage) {
        hideLoadMoreBtn();
        showInfo('End collections');
      } else {
        showLoadMoreBtn();
      }
      renderFurnitures(furnitures);
    } else {
      const { furnitures, totalItems } = await getFurnituresByCategories(
        currentCategory,
        currentPage
      );

      if (!furnitures.length) {
        hideLoadMoreBtn();
        showInfo(`Furnitures is not found`);
        return;
      } else {
        if (totalItems < FURNITURE_LIMIT) {
          hideLoadMoreBtn();
          showInfo('End collections');
        }
        renderFurnitures(furnitures);
      }
    }
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export const onProductsClick = e => {
  const btn = e.target.closest('.products-details-btn');
  if (!btn) return;

  const card = btn.closest('.product-item');
  if (!card) return;

  let id = card.dataset.id;

  if (!id) {
    const img = card.querySelector('img[src*="/furniture/"]');
    const src = img?.getAttribute('src') || '';
    const m = src.match(/\/([a-f0-9]{24})_/i);
    if (m) id = m[1];
  }

  if (!id) {
    showWarning('ID not found');
    return;
  }

  e.preventDefault();
  openProductModal(id);
};
