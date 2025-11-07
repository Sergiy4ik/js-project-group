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
export async function loadFurnitureById(id) {
  try {
    const data = await loadFurnitureById(id);
    console.log('Furniture details:', data);
    return data;
  } catch (error) {
    console.error('Furniture id downloading error:', error);
    return null;
  }
}
export async function loadCategories() {
  try {
    const data = await loadCategories();
    console.log('Categories:', data);
    return data;
  } catch (error) {
    console.error('Categories downloading error:', error);
    return null;
  }
}
export async function loadFeedbacks(
  params = { page: FEEDBACK_PAGE, limit: FEEDBACK_LIMIT }
) {
  try {
    const data = await loadFeedbacks(params);
    console.log('Feedbacks', data);
    return data;
  } catch (error) {
    console.error('Feedbacks downloading error:', error);
    return null;
  }
}
export async function sendOrder() {
  try {
    const data = await sendOrder();
    console.log('Order created:', data);
    return data;
  } catch (error) {
    console.error('Creating order error:', error);
    return null;
  }
}
