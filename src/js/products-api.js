// Функції для запитів на бекенд.
import axios from 'axios';
import {
  BASE_URL,
  API_ENDPOINTS,
  getFurnitureByIdEndpoint,
  FURNITURE_PAGE,
  FURNITURE_LIMIT,
  FEEDBACK_PAGE,
  FEEDBACK_LIMIT,
} from './constants.js';

axios.defaults.baseURL = BASE_URL;

// Functions for Furnitures
export async function getFurnitures(currentPage = 1) {
  const { data } = await axios(
    `${API_ENDPOINTS.FURNITURES}?page=${currentPage}&limit=${FURNITURE_LIMIT}`
  );
  return data;
}

export async function getFurnituresByCategories(categoryId, currentPage) {
  const { data } = await axios(
    `${API_ENDPOINTS.FURNITURES}?page=${currentPage}&limit=${FURNITURE_LIMIT}&category=${categoryId}`
  );
  return data;
}

// Furniture by Id
export async function getFurnitureByID(id) {
  const endpoint = getFurnitureByIdEndpoint(id);
  const response = await axios.get(endpoint);
  const furnitureItem = response.data;
  return furnitureItem;
}

// Functions for Categories
export async function getCategories() {
  const response = await axios.get(API_ENDPOINTS.CATEGORIES);
  const categoriesData = response.data;
  return categoriesData;
}

// Feedbacks
export async function getFeedbacks(
  params = { page: FEEDBACK_PAGE, limit: FEEDBACK_LIMIT }
) {
  const response = await axios.get(API_ENDPOINTS.FEEDBACKS, { params });
  const feedbackData = response.data;
  return feedbackData;
}

// Orders
export async function createOrder(orderData) {
  const response = await axios.post(API_ENDPOINTS.ORDERS, orderData);
  const createOrder = response.data;
  return createOrder;
}

// // Functions for Furnitures
// export async function getFurnitures(currentPage = 1) {
//   const { data } = await axios.get(API_ENDPOINTS.FURNITURES, {
//     params: {
//       page: currentPage,
//       limit: FURNITURE_LIMIT,
//     },
//   });
//   return data;
// }

// export async function getFurnituresByCategories(categoryId, currentPage) {
//   const { data } = await axios.get(API_ENDPOINTS.FURNITURES, {
//     params: {
//       page: currentPage,
//       limit: FURNITURE_LIMIT,
//       category: categoryId,
//     },
//   });
//   return data;
// }

// // Furniture by Id
// export async function getFurnitureByID(id) {
//   const endpoint = getFurnitureByIdEndpoint(id);
//   const { data } = await axios.get(endpoint);
//   return data;
// }

// // Functions for Categories
// export async function getCategories() {
//   const { data } = await axios.get(API_ENDPOINTS.CATEGORIES);
//   return data;
// }

// // Feedbacks
// export async function getFeedbacks(
//   params = { page: FEEDBACK_PAGE, limit: FEEDBACK_LIMIT }
// ) {
//   const { data } = await axios.get(API_ENDPOINTS.FEEDBACKS, { params });

//   return data;
// }

// // Orders
// export async function createOrder(orderData) {
//   const { data } = await axios.post(API_ENDPOINTS.ORDERS, orderData);
//   return data;
// }
