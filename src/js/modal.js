// src/js/modal.js
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import axios from 'axios';
import { hideLoader, showLoader } from './helpers';

axios.defaults.baseURL = 'https://furniture-store-v2.b.goit.study/api';

// ====== Перша модалка (деталі товару) ======
const productModal = document.querySelector('.modal-window');

let escHandler = null;
let backdropHandler = null;

// зірочки
function stars(rate = 0) {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5 ? 1 : 0;
  let out = '';
  for (let i = 0; i < full; i++) out += '<span class="star star-full">★</span>';
  if (half) out += '<span class="star star-half">★</span>';
  for (let i = full + half; i < 5; i++) out += '<span class="star star-empty">★</span>';
  return out;
}

function normalizeImages(list) {
  const BASE = 'https://furniture-store-v2.b.goit.study';
  return (list || []).map(src =>
    typeof src === 'string' && src.startsWith('http') ? src : `${BASE}${src}`
  );
}

function q(refRoot, sel) {
  return refRoot.querySelector(sel);
}

function getRefs(root) {
  return {
    dialog: q(root, '.product-modalWindow'),
    mainImg: q(root, '.modal-image-0'),
    thumbsWrap: q(root, '.modal-bottom-row'),
    titleEl: q(root, '.product-modal-title'),
    catEl: q(root, '.modal-description'),
    priceEl: q(root, '.modal-price'),
    starsEl: q(root, '.modal-rating-stars'),
    colorsWrap: q(root, '.radio-group'),
    descEl: q(root, '.furnitureDescription'),
    sizeEl: q(root, '.furnitureSize'),
    btnClose: q(root, '.modal-close-btn'),
    orderBtn: q(root, '.modalButton'),
  };
}

export async function openProductModal(id) {
  showLoader();
  try {
    // показати модалку
      document.body.classList.add('modal-open');
      productModal.classList.remove('visuallyhidden');
      productModal.removeAttribute('aria-hidden');
    const { data } = await axios.get(`/furnitures/${id}`);
    const {
      dialog,
      mainImg,
      thumbsWrap,
      titleEl,
      catEl,
      priceEl,
      starsEl,
      colorsWrap,
      descEl,
      sizeEl,
      btnClose,
      orderBtn,
    } = getRefs(productModal);

    // картинки
    const imgs = normalizeImages(data.images || data.image || []);
    const safeImgs = imgs.length ? imgs : ['https://via.placeholder.com/640x360?text=No+Image'];
    const main = safeImgs[0];
    const thumbs = safeImgs.slice(1, 3);

    if (mainImg) {
      mainImg.src = main;
      mainImg.alt = data?.name || 'photo';
    }
    if (thumbsWrap) {
      thumbsWrap.innerHTML = thumbs
        .map(src => `<img class="modal-thumb" src="${src}" alt="${data?.name || 'thumb'}">`)
        .join('');
      // перемикання картинок
      if (!thumbsWrap.dataset.bound) {
        thumbsWrap.addEventListener('click', e => {
          const img = e.target.closest('.modal-thumb');
          if (!img || !mainImg) return;
          const tmp = mainImg.src;
          mainImg.src = img.src;
          img.src = tmp;
        });
        thumbsWrap.dataset.bound = '1';
      }
    }

    // текстові поля
    if (titleEl) titleEl.textContent = data?.name || '';
    if (catEl) catEl.textContent = data?.category?.name || 'Без категорії';
    if (priceEl) priceEl.textContent = `${data?.price ?? 0} грн`;
    if (starsEl) starsEl.innerHTML = stars(data?.rate || 0);
    if (descEl) descEl.textContent = data?.description || 'Опис відсутній';
    if (sizeEl) sizeEl.textContent = `Розміри: ${data?.sizes || '—'}`;

    // кольори
    if (colorsWrap) {
      const colors = Array.isArray(data?.color) ? data.color : [];
      colorsWrap.innerHTML = colors
        .map(
          (c, i) =>
            `<label><input type="radio" name="color" value="${c}" ${
              i === 0 ? 'checked' : ''
            }><span class="color-circle" style="background:${c}"></span></label>`
        )
        .join('');
    }

    // закриття
    if (btnClose) btnClose.onclick = closeProductModal;

    backdropHandler = e => {
      if (e.target === productModal) closeProductModal();
    };
    productModal.addEventListener('mousedown', backdropHandler);

    escHandler = e => {
      if (e.key === 'Escape') closeProductModal();
    };
    document.addEventListener('keydown', escHandler);

    if (orderBtn) {
      orderBtn.onclick = () => {
        const checked = productModal.querySelector('input[name="color"]:checked');
        const color = checked ? checked.value : null;
        openOrderModal(id, color);
        closeProductModal();
      };
    }

    // фокус
    if (dialog) {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus({ preventScroll: true });
    }
  } catch (e) {
    closeProductModal();
    showError(e);
    closeModal();
  } finally {
    hideLoader();
  }
}

function closeProductModal() {
  const active = document.activeElement;
  if (active && productModal.contains(active)) active.blur();

  productModal.classList.add('visuallyhidden');
  productModal.setAttribute('aria-hidden', 'true');   // <— ставимо aria-hidden
  document.body.classList.remove('modal-open');

  if (escHandler) { document.removeEventListener('keydown', escHandler); escHandler = null; }
  if (backdropHandler) { productModal.removeEventListener('mousedown', backdropHandler); backdropHandler = null; }
}

// ====== Друга модалка (замовлення) ======
const backdropOrderModal = document.querySelector('.backdrop');
const orderDialog = document.querySelector('.order-modal');
const closeOrderBtn = document.querySelector('.modal-close-btn');
const submitBtn = document.querySelector('.modal-submit-btn');
const orderForm = document.querySelector('.modal-order-form');

let currentModelId = null; 
let currentColor = null;   

function lockBody() {
  document.body.classList.add('modal-open');
}
function unlockBody() {
  document.body.classList.remove('modal-open');
}

function handleOrderEsc(e) {
  if (e.key === 'Escape') closeOrderModal();
}

export async function openOrderModal(modelId, color) {
  currentModelId = modelId ?? null;
  currentColor = color ?? null;

  backdropOrderModal.classList.add('is-open');
  backdropOrderModal.removeAttribute('aria-hidden');   // <—
  lockBody();

  setTimeout(() => {
    // фокус у перше поле
    orderForm?.elements['user-name']?.focus();
  }, 10);

  window.addEventListener('keydown', handleOrderEsc);
}

export async function closeOrderModal() {

  const active = document.activeElement;
  if (active && backdropOrderModal.contains(active)) active.blur();

  backdropOrderModal.classList.remove('is-open');
  backdropOrderModal.setAttribute('aria-hidden', 'true'); // <—
  unlockBody();
  window.removeEventListener('keydown', handleOrderEsc);
}

closeOrderBtn?.addEventListener('click', () => closeOrderModal());

backdropOrderModal?.addEventListener('mousedown', e => {
  if (e.target === backdropOrderModal) closeOrderModal();
});

// сабміт
orderForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const name = orderForm.elements['user-name']?.value.trim() || '';
  const phone = orderForm.elements['phone']?.value.trim() || '';
  const comment = orderForm.elements['user-comment']?.value.trim() || '';

  if (!name || !phone) {
    iziToast.warning({
      title: 'Увага',
      message: "Будь ласка, заповніть ім'я та телефон.",
      position: 'topRight',
    });
    return;
  }

  // обов'язкові для бекенду:
  if (!currentModelId) {
    iziToast.warning({
      title: 'Увага',
      message: 'Оберіть товар (відкрийте картку і натисніть “Перейти до замовлення”).',
      position: 'topRight',
    });
    return;
  }
  if (!currentColor) {
    iziToast.warning({
      title: 'Увага',
      message: 'Оберіть колір у картці товару перед замовленням.',
      position: 'topRight',
    });
    return;
  }

  const clearPhone = phone.replace(/[^\d+]/g, '');
  const phonePattern = /^\+?\d{10,15}$/;
  if (!phonePattern.test(clearPhone)) {
    iziToast.warning({
      title: 'Увага',
      message: 'Введіть коректний номер телефону.',
      position: 'topRight',
    });
    return;
  }

  const payload = {
    name,
    phone: clearPhone,
    comment,
    modelId: currentModelId, 
    color: currentColor,     
  };

  submitBtn.disabled = true;

  try {
    const res = await axios.post('/orders', payload);

    iziToast.success({
      title: 'Успішно',
      message: 'Ваше замовлення відправлено!',
      position: 'topRight',
      timeout: 3000,
    });

    orderForm.reset();
    // очистимо LS, якщо зберігали поля
    orderForm.querySelectorAll('input, textarea').forEach(f => {
      localStorage.removeItem(f.name);
    });

    closeOrderModal();
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      'Щось пішло не так. Спробуйте ще раз.';
    iziToast.error({
      title: 'Помилка',
      message: msg,
      position: 'topRight',
    });
    // форму не закриваємо
  } finally {
    submitBtn.disabled = false;
  }
});

// збереження полів у localStorage
function onFieldInput(e) {
  const f = e.target;
  if (!f?.name) return;
  localStorage.setItem(f.name, f.value);
}
orderForm?.querySelectorAll('input, textarea').forEach(f => {
  f.addEventListener('input', onFieldInput);
  const saved = localStorage.getItem(f.name);
  if (saved) f.value = saved;
});

