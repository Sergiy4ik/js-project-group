import { hideLoader, showError, showLoader } from './helpers';
import { getFurnitureByID } from './products-api';
import refs from './refs';
import { setupProductModalListeners, removeProductModalListeners } from './event-listeners';

function renderStars(rate = 0) {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5 ? 1 : 0;
  let html = '';
  
  for (let i = 0; i < full; i++) {
    html += '<span class="star star-full">★</span>';
  }
  if (half) {
    html += '<span class="star star-half">★</span>';
  }
  for (let i = full + half; i < 5; i++) {
    html += '<span class="star star-empty">★</span>';
  }
  
  return html;
}

function normalizeImages(list) {
  const BASE = 'https://furniture-store-v2.b.goit.study';
  return (list || []).map(src =>
    typeof src === 'string' && src.startsWith('http') ? src : `${BASE}${src}`
  );
}

function getProductModalRefs() {
  return {
    dialog: refs.productModalDialog,
    mainImg: refs.productModalMainImg,
    thumbsWrap: refs.productModalThumbsWrap,
    titleEl: refs.productModalTitle,
    catEl: refs.productModalCategory,
    priceEl: refs.productModalPrice,
    starsEl: refs.productModalStars,
    colorsWrap: refs.productModalColorsWrap,
    descEl: refs.productModalDescription,
    sizeEl: refs.productModalSize,
    btnClose: refs.productModalCloseBtn,
    orderBtn: refs.productModalOrderBtn,
  };
}

function setupImageGallery(mainImg, thumbsWrap, images, productName) {
  if (!mainImg || !thumbsWrap) return;

  const safeImgs = images.length
    ? images
    : ['https://via.placeholder.com/640x360?text=No+Image'];
  
  const main = safeImgs[0];
  const thumbs = safeImgs.slice(1, 3);

  mainImg.src = main;
  mainImg.alt = productName || 'photo';

  thumbsWrap.innerHTML = thumbs
    .map(
      src =>
        `<img class="modal-thumb" src="${src}" alt="${productName || 'thumb'}">`
    )
    .join('');
}

function setupColors(colorsWrap, colors) {
  if (!colorsWrap) return;
  
  const colorList = Array.isArray(colors) ? colors : [];
  colorsWrap.innerHTML = colorList
    .map(
      (color, i) =>
        `<label>
          <input type="radio" name="color" value="${color}" ${i === 0 ? 'checked' : ''}>
          <span class="color-circle" style="background:${color}"></span>
        </label>`
    )
    .join('');
}

function populateProductData(refs, data) {
  const { titleEl, catEl, priceEl, starsEl, descEl, sizeEl } = refs;
  
  if (titleEl) titleEl.textContent = data?.name || '';
  if (catEl) catEl.textContent = data?.category?.name || 'Без категорії';
  if (priceEl) priceEl.textContent = `${data?.price ?? 0} грн`;
  if (starsEl) starsEl.innerHTML = renderStars(data?.rate || 0);
  if (descEl) descEl.textContent = data?.description || 'Опис відсутній';
  if (sizeEl) sizeEl.textContent = `Розміри: ${data?.sizes || '—'}`;
}

export async function openProductModal(id) {
  try {
    showLoader();
    document.body.classList.add('modal-open');
    refs.productModal.classList.remove('visuallyhidden');

    const data = await getFurnitureByID(id);
    const modalRefs = getProductModalRefs();

    const images = normalizeImages(data.images || data.image || []);
    setupImageGallery(modalRefs.mainImg, modalRefs.thumbsWrap, images, data?.name);

    populateProductData(modalRefs, data);

    setupColors(modalRefs.colorsWrap, data?.color);

    setupProductModalListeners(modalRefs, id);
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
  }
}

export function closeProductModal() {
  refs.productModal.classList.add('visuallyhidden');
  document.body.classList.remove('modal-open');
  removeProductModalListeners();
}

