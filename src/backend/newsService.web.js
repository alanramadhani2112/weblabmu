/**
 * newsService.web.js — Web Module untuk News/Resources
 *
 * File .web.js = bisa diimport dari page code (frontend).
 * Gunakan ini untuk query CMS dari backend secara aman.
 *
 * CARA IMPORT DI PAGE CODE:
 *   import { getLatestNews, getNewsBySlug } from 'backend/newsService.web.js';
 *
 * Docs: https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/backend-code/web-modules
 */

import { Permissions, webMethod } from 'wix-web-module';
import wixData from 'wix-data';

/**
 * Ambil N artikel terbaru yang sudah published
 * @param {number} limit  default 3
 */
export const getLatestNews = webMethod(
  Permissions.Anyone,
  async (limit = 3) => {
    const result = await wixData
      .query('News')
      .eq('status', 'published')
      .descending('publishedDate')
      .limit(limit)
      .find();
    return result.items;
  }
);

/**
 * Ambil satu artikel berdasarkan slug
 * @param {string} slug
 */
export const getNewsBySlug = webMethod(
  Permissions.Anyone,
  async (slug) => {
    const result = await wixData
      .query('News')
      .eq('slug', slug)
      .eq('status', 'published')
      .find();
    return result.items[0] || null;
  }
);

/**
 * Ambil artikel related (kategori sama, exclude current)
 * @param {string} category
 * @param {string} excludeId
 * @param {number} limit
 */
export const getRelatedNews = webMethod(
  Permissions.Anyone,
  async (category, excludeId, limit = 3) => {
    const result = await wixData
      .query('News')
      .eq('status', 'published')
      .eq('category', category)
      .ne('_id', excludeId)
      .descending('publishedDate')
      .limit(limit)
      .find();
    return result.items;
  }
);

/**
 * Subscribe email ke newsletter
 * @param {string} email
 * @param {string} source  e.g. 'homepage', 'resources'
 */
export const subscribeNewsletter = webMethod(
  Permissions.Anyone,
  async (email, source = 'website') => {
    // Cek duplicate
    const existing = await wixData
      .query('Subscribers')
      .eq('email', email)
      .find();

    if (existing.items.length > 0) {
      return { success: false, message: 'Email sudah terdaftar.' };
    }

    await wixData.insert('Subscribers', {
      email,
      subscribedAt: new Date(),
      source,
    });

    return { success: true, message: 'Berhasil didaftarkan.' };
  }
);

/**
 * Submit contact form — simpan ke ContactSubmissions collection
 * @param {Object} formData
 */
export const submitContactForm = webMethod(
  Permissions.Anyone,
  async (formData) => {
    const { firstName, lastName, email, institution, topic, message } = formData;

    // Basic validation di backend
    if (!firstName || !email || !institution) {
      return { success: false, message: 'Field wajib tidak lengkap.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: 'Format email tidak valid.' };
    }

    await wixData.insert('ContactSubmissions', {
      firstName,
      lastName:    lastName    || '',
      email,
      institution,
      topic:       topic       || 'Konsultasi Strategis',
      message:     message     || '',
      submittedAt: new Date(),
    });

    return { success: true, message: 'Pesan berhasil dikirim.' };
  }
);
