import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import refs from './refs';

export function showLoadMoreBtn() {
  setTimeout(() => {
    refs.loadMoreBtn.classList.add('is-show');
  }, 500);
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-show');
}

export function roundRating(rating) {
  if (rating < 1 || rating > 5) {
    return rating;
  }

  if (rating >= 3.3 && rating <= 3.7) {
    return 3.5;
  }
  if (rating >= 3.8 && rating <= 4.2) {
    return 4;
  }

  return Math.round(rating * 2) / 2;
}

iziToast.settings({
  position: 'topRight',
  displayMode: 'replace',
  timeout: 4000,
  progressBar: false,
});

export function showInfo(message) {
  iziToast.info({
    message: message,
  });
}

export function showSuccess(message) {
  iziToast.success({
    message: message,
  });
}

export function showWarning(message) {
  iziToast.warning({
    message: message,
  });
}

export function showError(error) {
  iziToast.error({
    message: error.message,
  });
}

export function showLoader() {
  refs.loader.classList.remove('hidden');
  hideLoadMoreBtn();
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}
