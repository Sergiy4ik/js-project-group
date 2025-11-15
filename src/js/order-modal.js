import {
  hideLoader,
  showError,
  showLoader,
  showSuccess,
  showWarning,
} from './helpers';
import refs from './refs';
import { createOrder } from './products-api';
import {
  setupOrderModalListeners,
  removeOrderModalListeners,
} from './event-listeners';

let currentModelId = null;
let currentColor = null;

function clearFormStorage() {
  localStorage.removeItem('order-form');
}

function validateForm(name, phone) {
  if (!name || !phone) {
    showWarning('Please fill in your name and phone number.');
    return false;
  }

  if (!currentModelId) {
    showWarning('Choose a product before ordering.');
    return false;
  }

  let cleanPhone = phone.replace(/\D/g, '');

  if (cleanPhone.length < 10) {
    showWarning('Enter a valid phone number (at least 10 digits).');
    return false;
  }

  if (cleanPhone.startsWith('0')) {
    cleanPhone = '38' + cleanPhone;
  }

  if (cleanPhone.length !== 12 && !cleanPhone.match(/^\d{10,15}$/)) {
    showWarning(
      'Enter a valid phone number in format: +38 (0XX) XXX-XX-XX or 380XXXXXXXXX'
    );
    return false;
  }

  if (cleanPhone.length === 12 && cleanPhone.match(/^\d{12}$/)) {
    return cleanPhone;
  }

  if (cleanPhone.length >= 10 && cleanPhone.length <= 15) {
    if (cleanPhone.length > 12) {
      return cleanPhone.substring(0, 12);
    }
    return cleanPhone;
  }

  showWarning('Enter a valid phone number.');
  return false;
}

export function setupOrderFormStorage() {
  refs.orderForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const formData = {};
      refs.orderForm.querySelectorAll('input, textarea').forEach(f => {
        if (f.name) {
          formData[f.name] = f.value;
        }
      });
      localStorage.setItem('order-form', JSON.stringify(formData));
    });
  });
}

export async function handleOrderFormSubmit(e) {
  e.preventDefault();

  const name = refs.orderForm.elements['user-name']?.value.trim();
  const phone = refs.orderForm.elements['user-phone']?.value.trim();
  const comment = refs.orderForm.elements['user-comment']?.value.trim() || '';

  const validatedPhone = validateForm(name, phone);
  if (!validatedPhone) return;

  const payload = {
    name,
    phone: validatedPhone,
    comment: 'empty',
    modelId: currentModelId,
    color: currentColor,
  };

  refs.submitBtn.disabled = true;

  try {
    showLoader();
    await createOrder(payload);
    showSuccess('Your order has been sent!');
    refs.orderForm.reset();
    clearFormStorage();
    closeOrderModal();
  } catch (error) {
    showError(error);
  } finally {
    hideLoader();
    refs.submitBtn.disabled = false;
  }
}


export async function openOrderModal(modelId, marker, color) {
  document.body.classList.add('modal-open');
  currentModelId = modelId ?? null;
  currentColor = color ?? null;
  refs.backdropOrderModal.classList.add('is-open');

  restoreFormFromStorage();
  setupOrderModalListeners();
}

export async function closeOrderModal() {
  document.body.classList.remove('modal-open');
  refs.backdropOrderModal.classList.remove('is-open');
  removeOrderModalListeners();
}

export function restoreFormFromStorage() {
  const savedData = localStorage.getItem('order-form');
  if (savedData) {
    try {
      const formData = JSON.parse(savedData);
      refs.orderForm.querySelectorAll('input, textarea').forEach(field => {
        if (field.name && formData[field.name] !== undefined) {
          field.value = formData[field.name];
        }
      });
    } catch (error) {
      console.error('Помилка при відновленні даних форми:', error);
    }
  }
}
