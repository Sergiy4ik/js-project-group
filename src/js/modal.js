import axios from 'axios';
import {
  hideLoader,
  showError,
  showLoader,
  showSuccess,
  showWarning,
} from './helpers';
import refs from './refs';

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
    showLoader();
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
        closeProductModal();
        openOrderModal(id, null, color);
      };
    }

    if (dialog) {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus({ preventScroll: true });
    }
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
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
refs.closeOrderBtn.addEventListener('click', async () => {
  await closeOrderModal();
});

let currentModelId = null;
let currentColor = null;

function handleOrderEsc(e) {
  if (e.key === 'Escape') closeOrderModal();
}

export async function openOrderModal(modelId, marker, color) {
  document.body.classList.add('modal-open');
  currentModelId = modelId ?? null;
  currentColor = color ?? null;
  refs.backdropOrderModal.classList.add('is-open');
  window.addEventListener('keydown', handleOrderEsc);

  // Відновлення полів з localStorage
  refs.orderForm.querySelectorAll('input, textarea').forEach(f => {
    const saved = localStorage.getItem(f.name);
    if (saved) f.value = saved;
  });
}

export async function closeOrderModal() {
  document.body.classList.remove('modal-open');
  refs.backdropOrderModal.classList.remove('is-open');
  window.removeEventListener('keydown', handleOrderEsc);
}

refs.closeOrderBtn?.addEventListener('click', () => closeOrderModal());
refs.backdropOrderModal?.addEventListener('mousedown', e => {
  if (e.target === refs.backdropOrderModal) closeOrderModal();
});

// Сабміт форми
refs.orderForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const name = refs.orderForm.elements['user-name']?.value.trim();
  const phone = refs.orderForm.elements['user-phone']?.value.trim();
  const comment = refs.orderForm.elements['user-comment']?.value.trim() || '';

  if (!name || !phone) {
    showWarning('Please fill in your name and phone number.');
    return;
  }

  if (!currentModelId) {
    showWarning('Choose a product before ordering.');
    return;
  }

  const clearPhone = phone.replace(/[^\d+]/g, '');
  const phonePattern = /^\+?\d{10,12}$/;

  if (!phonePattern.test(clearPhone)) {
    showWarning('Enter a valid phone number.');
    return;
  }

  const payload = {
    name,
    phone: clearPhone,
    comment: 'empty',
    modelId: currentModelId,
    color: currentColor,
  };

  refs.submitBtn.disabled = true;

  try {
    showLoader();
    const res = await axios.post('/orders', payload);
    showSuccess('Your order has been sent!');
    refs.orderForm.reset();
    refs.orderForm
      .querySelectorAll('input, textarea')
      .forEach(f => localStorage.removeItem(f.name));
    closeOrderModal();
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
    refs.submitBtn.disabled = false;
  }
});

// Збереження полів у localStorage
refs.orderForm?.querySelectorAll('input, textarea').forEach(f => {
  f.addEventListener('input', e => {
    const field = e.target;
    localStorage.setItem(field.name, field.value);
  });
});
