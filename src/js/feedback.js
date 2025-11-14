import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getFeedbacks } from './products-api.js';
import { FEEDBACK_LIMIT } from './constants.js';
import refs from './refs.js';
import { showError, showWarning } from './helpers.js';
import { roundRating } from './helpers';
import Raty from 'raty-js';

let feedbackSwiper = null;

// Ініціалізація Swiper для відгуків
export function initFeedbackSwiper(totalSlides = 10) {
  if (!refs.feedbackSwiper || !refs.feedbackCardList) {
    return;
  }

  if (feedbackSwiper) {
    feedbackSwiper.destroy(true, true);
    feedbackSwiper = null;
  }

  feedbackSwiper = new Swiper(refs.feedbackSwiper, {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 24,
    loop: false,
    grabCursor: true,
    allowTouchMove: true,
    touchRatio: 1,
    simulateTouch: true,
    watchSlidesProgress: true,

    navigation: {
      nextEl: refs.feedbackNavNext,
      prevEl: refs.feedbackNavPrev,
    },

    pagination: {
      el: refs.feedbackPaginationDots,
      clickable: true,
      bulletClass: 'feedback-pagination-dot',
      bulletActiveClass: 'active',
      type: 'bullets',
      dynamicBullets: false,
    },

    breakpoints: {
      375: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 24,
      },
    },

    on: {
      init: function () {
        updateNavigationButtons();
      },
      slideChange: function () {
        updateNavigationButtons();
      },
      resize: function () {
        updateNavigationButtons();
      },
    },
  });

  return feedbackSwiper;
}

// Оновлення стану кнопок навігації
function updateNavigationButtons() {
  if (!feedbackSwiper || !refs.feedbackNavPrev || !refs.feedbackNavNext) {
    return;
  }

  const isBeginning = feedbackSwiper.isBeginning;
  const isEnd = feedbackSwiper.isEnd;

  if (isBeginning) {
    refs.feedbackNavPrev.setAttribute('disabled', 'true');
    refs.feedbackNavPrev.classList.add('disabled');
    refs.feedbackNavPrev.setAttribute('aria-disabled', 'true');
  } else {
    refs.feedbackNavPrev.removeAttribute('disabled');
    refs.feedbackNavPrev.classList.remove('disabled');
    refs.feedbackNavPrev.setAttribute('aria-disabled', 'false');
  }

  if (isEnd) {
    refs.feedbackNavNext.setAttribute('disabled', 'true');
    refs.feedbackNavNext.classList.add('disabled');
    refs.feedbackNavNext.setAttribute('aria-disabled', 'true');
  } else {
    refs.feedbackNavNext.removeAttribute('disabled');
    refs.feedbackNavNext.classList.remove('disabled');
    refs.feedbackNavNext.setAttribute('aria-disabled', 'false');
  }
}

// Завантаження та відображення відгуків
export async function loadFeedbacks() {
  try {
    const data = await getFeedbacks({ limit: FEEDBACK_LIMIT });
    const feedbacks = data.feedbacks || [];

    if (feedbacks.length === 0) {
      showWarning('No feedbacks received from API');
      return;
    }

    renderFeedbacks(feedbacks);

    setTimeout(() => {
      initFeedbackSwiper(feedbacks.length);
    }, 50);
  } catch (error) {
    showError(error);
  }
}

// Ініціалізація відгуків при завантаженні сторінки
export async function initFeedbacks() {
  if (
    !refs.feedbackSwiper ||
    !refs.feedbackCardList ||
    !refs.feedbackNavPrev ||
    !refs.feedbackNavNext ||
    !refs.feedbackPaginationDots
  ) {
    showWarning('Feedback section elements not found in DOM');
    return;
  }

  await loadFeedbacks();
}

// ===== Функції рендерингу відгуків =====

// Функція для створення розмітки картки відгуку
export function createFeedbackCardMarkup(feedback) {
  const rating = feedback.rate ?? 0;
  const roundedRating = roundRating(rating);

  return `
    <li class="swiper-slide feedback-card-item">
      <div class="feedback-rating" data-score="${roundedRating}" aria-label="Рейтинг ${roundedRating} з 5"></div>
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

  const markup = feedbacks
    .map(feedback => createFeedbackCardMarkup(feedback))
    .join('');
  refs.feedbackCardList.innerHTML = markup;

  const ratingElements =
    refs.feedbackCardList.querySelectorAll('.feedback-rating');

  ratingElements.forEach(container => {
    const score = Number(container.dataset.score) || 0;

    container.innerHTML = '';

    const ratyInstance = new Raty(container, {
      readOnly: true,
      starType: 'i',
      number: 5,
      score,
      half: true,
      halfShow: true,
      starOn: 'feedback-star-on',
      starOff: 'feedback-star-off',
      starHalf: 'feedback-star-half',
      space: false,
    });

    ratyInstance.init();
  });
}
