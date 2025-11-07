// Хендлери, які передаються в addEventListener.

import {
  getFurnitures,
  getFurnitureByID,
  getCategories,
  getFeedbacks,
  createOrder,
} from './products-api.js';

import {
  FURNITURE_PAGE,
  FURNITURE_LIMIT,
  FEEDBACK_PAGE,
  FEEDBACK_LIMIT,
} from './constants.js';
// furniture
export async function loadFurnitures(
  params = { page: FURNITURE_PAGE, limit: FURNITURE_LIMIT }
) {
  try {
    const data = await getFurnitures(params);
    console.log('Furnitures:', data);
    return data;
  } catch (error) {
    console.error('Furnitures downloading error:', error);
    return null;
  }
}
