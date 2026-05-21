/**
 * utils.js — Shared utility functions
 * Import: import { formatDate, truncateText, slugify, debounce } from 'public/utils.js';
 */

/**
 * Format Date ke Indonesian locale
 * @param {Date|string} date
 * @returns {string} e.g. "21 Mei 2026"
 */
export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('id-ID', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  });
}

/**
 * Truncate text dengan ellipsis
 * @param {string} text
 * @param {number} limit  default 120
 * @returns {string}
 */
export function truncateText(text, limit = 120) {
  if (!text) return '';
  const plain = text.replace(/<[^>]*>/g, ''); // strip HTML tags
  return plain.length > limit
    ? plain.substring(0, limit).trimEnd() + '...'
    : plain;
}

/**
 * Convert string ke URL slug
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-');
}

/**
 * Build dynamic page URL
 * @param {string} basePath  e.g. '/news'
 * @param {string} slug
 * @returns {string}
 */
export function buildDynamicUrl(basePath, slug) {
  return `${basePath}/${slug}`;
}

/**
 * Debounce — delay function execution
 * @param {Function} fn
 * @param {number} delay  ms, default 300
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Chunk array into groups of n (untuk grid layout)
 * @param {Array} arr
 * @param {number} size
 * @returns {Array[]}
 */
export function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
