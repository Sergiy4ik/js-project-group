// Функції для відображення елементів інтерфейсу.
import refs from './refs';
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import { roundRating } from './helpers';
import '../css/faq.css';

export function renderCategories(arrey) {
  const categories = [{ _id: 'all', name: 'Всі товари' }, ...arrey];

  const murkup = categories
    .map(
      ({ _id, name: catName }) => `<li
        class="category-item" id="${_id}"
        style="
          background-image: image-set(
            url('./furniture-bg/${_id}.png') 1x,
            url('./furniture-bg/${_id}@2x.png') 2x
          );
        "
      ><button class="categories-btn" type="button">${catName}</button></li>`
    )
    .join('');
  refs.categories.innerHTML = murkup;
}

export function renderFurnitures(arrey) {
  const markup = arrey
    .map(
      ({
        _id,
        name,
        images,
        price,
        color,
      }) => `<li class="product-item" data-id="${_id}">
        <img
          class="products-image"
          src='${images[0]}'
          alt="${name}"
        />
        <div class="product-description-box">
          <h4 class="products-title">${name}</h4>
          <ul class="products-color-list">
            ${color
              .map(
                hex =>
                  `<li class="products-color-box" style="background-color: ${hex}"></li>`
              )
              .join('')}
          </ul>
          <p class="products-price">${price} грн</p>
        </div>
        <button class="products-details-btn" type="button">Детальніше</button>
      </li>`
    )
    .join('');
  refs.products.insertAdjacentHTML('beforeend', markup);
}

export function clearFurnitures() {
  refs.products.innerHTML = '';
}

new Accordion('.accordion-container', {
  duration: 300,
  showMultiple: false,
});


// Функція для створення розмітки картки відгуку
export function createFeedbackCardMarkup(feedback) {

  const rating = feedback.rate ?? 0;
  const roundedRating = roundRating(rating);
  const integerRating = Math.max(0, Math.min(5, Math.floor(roundedRating)));
  const hasHalfStar = roundedRating % 1 !== 0;

  const ratingClasses = [
    'feedback-rating',
    'rating',
    'small',
    'star-icon',
    'color-default',
    `value-${integerRating}`,
  ];

  if (hasHalfStar) {
    ratingClasses.push('half');
  }

  const starsMarkup = Array.from({ length: 5 })
    .map(
      () => `<div class="star icon default">
            <i class="star-empty"></i>
            <i class="star-half"></i>
            <i class="star-filled"></i>
          </div>`
    )
    .join('');

  return `
    <li class="swiper-slide feedback-card-item">
      <div class="${ratingClasses.join(' ')}" data-rating="${roundedRating}" aria-label="Рейтинг ${roundedRating} з 5">
        <div class="star-container">
          ${starsMarkup}
        </div>
      </div>
      <p class="feedback-text">${feedback.descr || ''}</p>
      <p class="feedback-author">${feedback.name || ''}</p>
    </li>
  `;
}

// Функція для рендерингу всіх відгуків
export function renderFeedbacks(feedbacks) {
  if (!refs.feedbackCardList) {
    return;
  }
  
  const markup = feedbacks.map(feedback => createFeedbackCardMarkup(feedback)).join('');
  refs.feedbackCardList.innerHTML = markup;
}

