//API ендпоінти:

export const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';
export const API_ENDPOINTS = {
  FURNITURES: '/furnitures',
  CATEGORIES: '/categories',
  FEEDBACKS: '/feedbacks',
  ORDERS: '/orders',
};
export const FURNITURE_PAGE = 1;
export const FURNITURE_LIMIT = 8;

export const FEEDBACK_PAGE = 1;
export const FEEDBACK_LIMIT = 10;

export const getFurnitureByIdEndpoint = id => `/furnitures/${id}`;
