import iziToast from 'izitoast';
import axios from 'axios';

axios.defaults.baseURL = 'https://furniture-store-v2.b.goit.study/api';
const modalWindow = document.querySelector('.modal-window');

let escHandler = null;
let backdropHandler = null;

// ===== зірки =====
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

function getRefs() {
  return {
    dialog: modalWindow.querySelector('.product-modalWindow'),
    mainImg: modalWindow.querySelector('.modal-image-0'),
    thumbsWrap: modalWindow.querySelector('.modal-bottom-row'),
    titleEl: modalWindow.querySelector('.product-modal-title'),
    catEl: modalWindow.querySelector('.modal-description'),
    priceEl: modalWindow.querySelector('.modal-price'),
    starsEl: modalWindow.querySelector('.modal-rating-stars'),
    colorsWrap: modalWindow.querySelector('.radio-group'),
    descEl: modalWindow.querySelector('.furnitureDescription'),
    sizeEl: modalWindow.querySelector('.furnitureSize'),
    btnClose: modalWindow.querySelector('.modal-close-btn'),
    orderBtn: modalWindow.querySelector('.modalButton'),
  };
}

export async function openProductModal(id) {
  try {
    // відкрити модалку
    document.body.classList.add('modal-open');
    modalWindow.classList.remove('visuallyhidden');

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
    } = getRefs();

    // — гарантуємо картинки —
    const imgs = normalizeImages(data.images || data.image || []);
    const safeImgs = imgs.length
      ? imgs
      : ['https://via.placeholder.com/640x360?text=No+Image'];
    const main = safeImgs[0];
    const thumbs = safeImgs.slice(1, 3);

    // ліва колонка
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

      // делегування кліку по прев’ю
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

    // права колонка
    if (titleEl) titleEl.textContent = data?.name || '';
    if (catEl) catEl.textContent = data?.category?.name || 'Без категорії';
    if (priceEl) priceEl.textContent = `${data?.price ?? 0} грн`;
    if (starsEl) starsEl.innerHTML = stars(data?.rate || 0);

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

    if (descEl) descEl.textContent = data?.description || 'Опис відсутній';
    if (sizeEl) sizeEl.textContent = `Розміри: ${data?.sizes || '—'}`;

    // закриття: бекдроп + ✕ + Esc
    if (btnClose) btnClose.onclick = closeModal;

    backdropHandler = e => {
      if (e.target === modalWindow) closeModal(); // тільки прямий клік по бекдропу
    };
    modalWindow.addEventListener('mousedown', backdropHandler);

    escHandler = e => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', escHandler);

    // кнопка замовлення (якщо треба — кинемо подію, аби інший модуль відкрив форму)
    if (orderBtn) {
      orderBtn.onclick = () => {
        const checked = modalWindow.querySelector(
          'input[name="color"]:checked'
        );
        const color = checked ? checked.value : null;
        closeModal();
        document.dispatchEvent(
          new CustomEvent('openOrderModal', {
            detail: { id, color },
          })
        );
      };
    }

    if (dialog) {
      dialog.setAttribute('tabindex', '-1');
      dialog.focus({ preventScroll: true });
    }
  } catch (e) {
    console.error('❌ Помилка завантаження товару', e);
    closeModal();
  }
}

// ===== приватні
function closeModal() {
  modalWindow.classList.add('visuallyhidden');
  document.body.classList.remove('modal-open');

  if (escHandler) {
    document.removeEventListener('keydown', escHandler);
    escHandler = null;
  }
  if (backdropHandler) {
    modalWindow.removeEventListener('mousedown', backdropHandler);
    backdropHandler = null;
  }
}

/* ===== тестовий виклик (можна прибрати) =====
 */
// openProductModal('682f9bbf8acbdf505592ac45');

// order-modal

const backdropOrderModal = document.querySelector('.backdrop');
const modalOrder = document.querySelector('.order-modal');
const closeOrderBtn = document.querySelector('.modal-close-btn');
const submitBtn = document.querySelector('.modal-submit-btn');
const orderForm = document.querySelector('.modal-order-form');

function openOrderModal() {
  backdropOrderModal.classList.add('is-open');
  document.body.classList.add('modal-open');

  window.addEventListener('keydown', handleEscape);
}

function closeOrderModal() {
  backdropOrderModal.classList.remove('is-open');
  document.body.classList.remove('modal-open');

  window.removeEventListener('keydown', handleEscape);
}

closeOrderBtn.addEventListener('click', closeOrderModal);

backdropOrderModal.addEventListener('click', event => {
  if (event.target === backdropOrderModal) {
    closeOrderModal();
  }
});

function handleEscape(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeOrderModal();
  }
}

orderForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = orderForm.elements['user-name'].value.trim();
  const phone = orderForm.elements['phone'].value.trim();
  const comment = orderForm.elements['user-comment'].value.trim();

  if (!name || !phone) {
    iziToast.warning({
      title: 'Ooops!',
      message: "Будь ласка, заповніть всі обов'язкові поля!",
      position: 'topRight',
    });
    return;
  }

  const clearPhone = phone.replace(/[^\d+]/g, '');
  const phonePattern = /^\+?\d{10,15}$/;

  if (!phonePattern.test(clearPhone)) {
    iziToast.warning({
      title: 'Ooops!',
      message: 'Будь ласка, введіть коректний номер телефону',
      position: 'topRight',
    });
    return;
  }
});

// тестова кнопка для відкриття модалки
document
  .querySelector('.open-modal-btn')
  ?.addEventListener('click', openOrderModal);
