

// order-modal

const { default: iziToast } = require("izitoast");

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

backdropOrderModal.addEventListener('click', (event) => {
    if (event.target === backdropOrderModal) {
        closeOrderModal();
    }
});

function handleEscape(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeOrderModal();
    }
}

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = orderForm.elements['user-name'].value.trim();
    const phone = orderForm.elements['phone'].value.trim();
    const comment = orderForm.elements['user-comment'].value.trim();

    if (!name || !phone) {
        iziToast.warning({
            title: "Ooops!",
            message: "Будь ласка, заповніть всі обов'язкові поля!",
            position: "topRight",
        });
        return;
    }

    const clearPhone = phone.replace(/[^\d+]/g, '');
    const phonePattern = /^\+?\d{10,15}$/;

    if (!phonePattern.test(clearPhone)) {
        iziToast.warning({
            title: "Ooops!",
            message: "Будь ласка, введіть коректний номер телефону",
            position: "topRight",
        });
        return;
    }
    
})

// тестова кнопка для відкриття модалки
document.querySelector('.open-modal-btn')?.addEventListener('click', openOrderModal);