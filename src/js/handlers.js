// Хендлери, які передаються в addEventListener.

import {
  clearFurnitures,
  renderCategories,
  renderFurnitures,
} from './render-function';
import {
  getFurnitures,
  getFurnitureByID,
  getCategories,
  getFeedbacks,
  createOrder,
  getFurnituresByCategories,
} from './products-api.js';

import {
  FURNITURE_PAGE,
  FURNITURE_LIMIT,
  FEEDBACK_PAGE,
  FEEDBACK_LIMIT,
} from './constants.js';
import refs from './refs.js';
import { hideLoadMoreBtn, showLoadMoreBtn } from './helpers.js';

let currentPage = 1;
let currentCategory = '';

export async function initialHome() {
  try {
    const categories = await getCategories();
    renderCategories(categories);

    currentCategory = 'all';
    const allCategoryItem = refs.categories.children[0];
    allCategoryItem.classList.add('categories-item--active');

    // showLoader();
    const { furnitures } = await getFurnitures();
    renderFurnitures(furnitures);
    showLoadMoreBtn();
  } catch (error) {
    // showError(error);
  } finally {
    // hideLoader();
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

  // showLoader();
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
        // showInfo('Not found');
        return;
      } else {
        if (totalItems < FURNITURE_LIMIT) {
          hideLoadMoreBtn();
          // showInfo('End collections');
        }
        renderFurnitures(furnitures);
      }
    }
  } catch (error) {
    // showError(error);
  } finally {
    // hideLoader();
  }
}

export async function onLoadMoreClick(event) {
  event.preventDefault();
  currentPage++;
  // showLoader();

  try {
    if (currentCategory === 'all') {
      const { furnitures, totalItems } = await getFurnitures(currentPage);
      if (totalItems < FURNITURE_LIMIT * currentPage) {
        hideLoadMoreBtn();
        // showInfo('End collections');
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
        // showInfo('Not found');
        return;
      } else {
        if (totalItems < FURNITURE_LIMIT) {
          hideLoadMoreBtn();
          // showInfo('End collections');
        }
        renderFurnitures(furnitures);
      }
    }
  } catch (error) {
    // showError(error);
  } finally {
    // hideLoader();
  }
}

// Додаткові функції для роботи з API (закоментовані, якщо не використовуються)
// Якщо потрібно використовувати, розкоментуйте та виправте виклики функцій

// export async function loadFurnitures(
//   params = { page: FURNITURE_PAGE, limit: FURNITURE_LIMIT }
// ) {
//   try {
//     const data = await getFurnitures(params.page || FURNITURE_PAGE);
//     console.log('Furnitures:', data);
//     return data;
//   } catch (error) {
//     console.error('Furnitures downloading error:', error);
//     return null;
//   }
// }

// export async function loadFurnitureById(id) {
//   try {
//     const data = await getFurnitureByID(id);
//     console.log('Furniture details:', data);
//     return data;
//   } catch (error) {
//     console.error('Furniture id downloading error:', error);
//     return null;
//   }
// }

// export async function loadCategories() {
//   try {
//     const data = await getCategories();
//     console.log('Categories:', data);
//     return data;
//   } catch (error) {
//     console.error('Categories downloading error:', error);
//     return null;
//   }
// }

// Примітка: Функція loadFeedbacks реалізована в feedback.js
// Використовуйте initFeedbacks() з feedback.js для завантаження відгуків
// export async function loadFeedbacks(
//   params = { page: FEEDBACK_PAGE, limit: FEEDBACK_LIMIT }
// ) {
//   try {
//     const data = await getFeedbacks(params);
//     console.log('Feedbacks', data);
//     return data;
//   } catch (error) {
//     console.error('Feedbacks downloading error:', error);
//     return null;
//   }
// }
// export async function sendOrder(orderData) {
//   try {
//     const data = await createOrder(orderData);
//     console.log('Order created:', data);
//     return data;
//   } catch (error) {
//     console.error('Creating order error:', error);
//     return null;
//   }
// }
