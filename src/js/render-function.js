// Функції для відображення елементів інтерфейсу.
import refs from './refs';
import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

export function renderCategories(arrey) {
  const categories = [{ _id: 'all', name: 'Всі товари' }, ...arrey];
  console.log(categories);

  const murkup = categories
    .map(
      ({ _id, name: catName }) => `<li
        class="category-item"
        style="
          background-image: image-set(
            url('/img/furniture/${_id}.png') 1x,
            url('/img/furniture/${_id}@2x.png') 2x
          );
        "
      >
        ${catName}
      </li>`
    )
    .join('');
  refs.categories.innerHTML = murkup;
}

export function renderProducts(arrey) {
  const markup = arrey
    .map(
      ({ _id, name, images, price, color }) => `<li class="product-item">
        <img
          class="products-image"
          src='${images[0]}'
          alt="${name}"
        />
        <div class="product-description-box">
          <h4 class="products-title">${name}</h4>
          <ul class="products-color-list">
            <li class="products-color-box" style="background-color: ${color[0]}"></li>
            <li class="products-color-box" style="background-color: ${color[1]}"></li>
            <li
              class="products-color-box"
              style="background-color: ${color[2]}"
            ></li>
          </ul>
          <p class="products-price">${price} грн</p>
        </div>
        <button class="products-details-btn" type="button">Детальніше</button>
      </li>`
    )
    .join('');
  refs.products.insertAdjacentHTML('beforeend', markup);
}

// export function clearProdutsList() {
//   refs.products.innerHTML = '';
// }

new Accordion('.accordion-container', {
  duration: 300,
  showMultiple: false,
});
