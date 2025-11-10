// ===============================
// src/js/modal.js
// ===============================

import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import axios from 'axios';


axios.defaults.baseURL = 'https://furniture-store-v2.b.goit.study/api';

// ===== Перша модалка (деталі товару) =====
const productModal = document.querySelector('.modal-window');

let escHandler = null;
let backdropHandler = null;

// Зірочки рейтингу
function stars(rate = 0) {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5 ? 1 : 0;
  let out = '';
  for (let i = 0; i < full; i++) out += '<span class="star star-full">★</span>';
  if (half) out += '<span class="star star-half">★</span>';
  for (let i = full + half; i < 5; i++)
    out += '<span class="star star-empty">★</span>';
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
  try {
    document.body.classList.add('modal-open');
    productModal.classList.remove('visuallyhidden');

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

    // Картинки
    const imgs = normalizeImages(data.images || data.image || []);
    const safeImgs = imgs.length
      ? imgs
      : ['https://via.placeholder.com/640x360?text=No+Image'];
    const main = safeImgs[0];
    const thumbs = safeImgs.slice(1, 3);

    if (mainImg) {
      mainImg.src = main;
      mainImg.alt = data?.name || 'photo';
    }

    if (thumbsWrap) {
      thumbsWrap.innerHTML = thumbs
        .map(
          src =>
            `<img class="modal-thumb" src="${src}" alt="${
              data?.name || 'thumb'
            }">`
        )
        .join('');

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

    // Текстові дані
    if (titleEl) titleEl.textContent = data?.name || '';
    if (catEl) catEl.textContent = data?.category?.name || 'Без категорії';
    if (priceEl) priceEl.textContent = `${data?.price ?? 0} грн`;
    if (starsEl) starsEl.innerHTML = stars(data?.rate || 0);
    if (descEl) descEl.textContent = data?.description || 'Опис відсутній';
    if (sizeEl) sizeEl.textContent = `Розміри: ${data?.sizes || '—'}`;

    // Кольори
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

    // Закриття
    if (btnClose) btnClose.onclick = closeProductModal;

    backdropHandler = e => {
      if (e.target === productModal) closeProductModal();
    };
    productModal.addEventListener('mousedown', backdropHandler);

    escHandler = e => {
      if (e.key === 'Escape') closeProductModal();
    };
    document.addEventListener('keydown', escHandler);

    // Кнопка "Перейти до замовлення"
    if (orderBtn) {
      orderBtn.onclick = () => {
        const checked = productModal.querySelector(
          'input[name="color"]:checked'
        );
        const color = checked ? checked.value : null;
        openOrderModal(id, null, color);
        closeProductModal();
      };
    }

    if (dialog) {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus({ preventScroll: true });
    }
  } catch (e) {
    console.error('❌ Помилка завантаження товару', e);
    closeProductModal();
    iziToast.error({
      title: 'Error',
      message: 'Failed to load product data.',
      position: 'topRight',
    });
  }
}

function closeProductModal() {
  productModal.classList.add('visuallyhidden');
  document.body.classList.remove('modal-open');
  if (escHandler) {
    document.removeEventListener('keydown', escHandler);
    escHandler = null;
  }
  if (backdropHandler) {
    productModal.removeEventListener('mousedown', backdropHandler);
    backdropHandler = null;
  }
}

// ===== Друга модалка (замовлення) =====
// Елементи
const backdropOrderModal = document.querySelector('.backdrop');
const modalOrder = document.querySelector('.order-modal');
const closeOrderBtn = modalOrder.querySelector('.modal-close-btn'); 
const submitBtn = modalOrder.querySelector('.modal-submit-btn');
const orderForm = modalOrder.querySelector('.modal-order-form');

closeOrderBtn.addEventListener('click', async () => {
  await closeOrderModal();
});

let currentModelId = null;
let currentColor = null;

function handleOrderEsc(e) {
  if (e.key === 'Escape') closeOrderModal();
}

export async function openOrderModal(modelId, marker, color) {
  currentModelId = modelId ?? null;
  currentColor = color ?? null;

  backdropOrderModal.classList.add('is-open');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', handleOrderEsc);

  // Відновлення полів з localStorage
  orderForm.querySelectorAll('input, textarea').forEach(f => {
    const saved = localStorage.getItem(f.name);
    if (saved) f.value = saved;
  });
}

export async function closeOrderModal() {
  backdropOrderModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', handleOrderEsc);
}

closeOrderBtn?.addEventListener('click', () => closeOrderModal());
backdropOrderModal?.addEventListener('mousedown', e => {
  if (e.target === backdropOrderModal) closeOrderModal();
});

// Сабміт форми
orderForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const name = orderForm.elements['user-name']?.value.trim();
  const phone = orderForm.elements['phone']?.value.trim();
  const comment = orderForm.elements['user-comment']?.value.trim() || '';

  if (!name || !phone) {
    iziToast.warning({
      title: 'Увага',
      message: "Будь ласка, заповніть ім'я та телефон.",
      position: 'topRight',
    });
    return;
  }

  if (!currentModelId) {
    iziToast.warning({
      title: 'Увага',
      message: 'Оберіть товар перед замовленням.',
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
    orderForm.querySelectorAll('input, textarea').forEach(f =>
      localStorage.removeItem(f.name)
    );
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
  } finally {
    submitBtn.disabled = false;
  }
});

// Збереження полів у localStorage
orderForm?.querySelectorAll('input, textarea').forEach(f => {
  f.addEventListener('input', e => {
    const field = e.target;
    localStorage.setItem(field.name, field.value);
  });
});
