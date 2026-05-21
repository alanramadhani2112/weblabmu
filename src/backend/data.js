/**
 * data.js — Wix Data Hooks (server-side)
 * Runs before/after CMS operations.
 *
 * Collections:
 *  - News
 *  - Products
 *  - UseCases
 *  - Resources
 *  - Subscribers
 *
 * CATATAN IMPORT di Wix Velo:
 *  - File ini adalah backend code (.js) — TIDAK bisa diimport dari page code
 *  - Untuk expose fungsi ke frontend, buat file .web.js di backend/
 *  - Wix API diimport dengan: import wixData from 'wix-data'
 *  - Public utils diimport dengan: import { fn } from 'public/utils.js'
 */

import wixData from 'wix-data';

// ── Helpers ────────────────────────────────────────────────

function slugify(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-');
}

// ── Data hooks tidak butuh parameter context ───────────────

export function News_beforeInsert(item) {
  if (!item.slug && item.title) {
    item.slug = slugify(item.title);
  }
  if (!item.publishedDate) {
    item.publishedDate = new Date();
  }
  if (!item.status) {
    item.status = 'draft'; // default draft, publish manual
  }
  return item;
}

export function News_beforeUpdate(item) {
  if (item.title) {
    item.slug = slugify(item.title);
  }
  return item;
}

// ── Products Hooks ─────────────────────────────────────────

export function Products_beforeInsert(item) {
  if (!item.slug && item.title) {
    item.slug = slugify(item.title);
  }
  return item;
}

export function Products_beforeUpdate(item) {
  if (item.title && !item.slug) {
    item.slug = slugify(item.title);
  }
  return item;
}

// ── UseCases Hooks ─────────────────────────────────────────

export function UseCases_beforeInsert(item) {
  if (!item.slug && item.title) {
    item.slug = slugify(item.title);
  }
  return item;
}

export function UseCases_beforeUpdate(item) {
  if (item.title && !item.slug) {
    item.slug = slugify(item.title);
  }
  return item;
}

// ── Resources Hooks ────────────────────────────────────────

export function Resources_beforeInsert(item) {
  if (!item.slug && item.title) {
    item.slug = slugify(item.title);
  }
  if (!item.status) {
    item.status = 'draft';
  }
  if (!item.downloadCount) {
    item.downloadCount = 0;
  }
  return item;
}

// ── Subscribers Hooks ──────────────────────────────────────

/**
 * Cegah duplicate email di Subscribers
 */
export async function Subscribers_beforeInsert(item) {
  const existing = await wixData
    .query('Subscribers')
    .eq('email', item.email)
    .find();

  if (existing.items.length > 0) {
    throw new Error('Email sudah terdaftar.');
  }

  return item;
}

// ── ContactSubmissions Hooks ───────────────────────────────

/**
 * Sanitize input sebelum insert contact form
 */
export function ContactSubmissions_beforeInsert(item) {
  // Trim semua string fields
  ['firstName', 'lastName', 'email', 'institution', 'topic', 'message'].forEach(field => {
    if (typeof item[field] === 'string') {
      item[field] = item[field].trim();
    }
  });

  if (!item.submittedAt) {
    item.submittedAt = new Date();
  }

  return item;
}
