/**
 * News (List).eaf7k.js — Jurnal & Pemikiran (Blog List Page)
 *
 * Sections:
 *  1. Hero / Page Title
 *  2. Featured Article  — artikel terbaru sebagai hero card
 *  3. Article Grid      — repeater editorial style (grayscale hover)
 *  4. Load More         — pagination via load more button
 *  5. Category Filter   — filter by type/category
 *  6. Search            — search by keyword
 *
 * CMS Collection: Resources / News
 *  { title, excerpt, coverImage, type, category, publishedDate,
 *    slug, status, author }
 *
 * Wix Element IDs:
 *  #featuredCard        — featured article container
 *    #featuredImage     — image
 *    #featuredEyebrow   — "Type • Date" text
 *    #featuredTitle     — title text
 *    #featuredExcerpt   — excerpt text
 *  #newsRepeater        — repeater for article grid
 *    #newsCard          — card container (clickable)
 *    #newsCoverImage    — image
 *    #newsEyebrow       — "Type • Date" text
 *    #newsTitle         — title text
 *    #newsExcerpt       — excerpt text
 *  #searchInput         — text input
 *  #categoryFilter      — dropdown
 *  #btnLoadMore         — load more button
 *  #loadMoreContainer   — container wrapping load more
 *  #noResultsText       — shown when no results
 *  #loadingSpinner      — loading indicator
 *  #resultCount         — "Menampilkan X artikel" text
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { formatDate, truncateText, debounce } from 'public/utils.js';

// ── State ──────────────────────────────────────────────────
const PAGE_SIZE     = 9;
let currentSkip     = 0;
let currentCategory = 'all';
let currentSearch   = '';
let totalCount      = 0;

$w.onReady(async function () {
  await loadCategories();
  await loadNews(true);
  initSearch();
  initLoadMore();
});

// ── Categories ─────────────────────────────────────────────

async function loadCategories() {
  try {
    // Ambil unique types dari collection
    const { items } = await wixData
      .query('News')
      .eq('status', 'published')
      .find();

    const types = ['all', ...new Set(items.map(i => i.type || i.category).filter(Boolean))];

    try {
      $w('#categoryFilter').options = types.map(t => ({
        label: t === 'all' ? 'Semua Kategori' : t,
        value: t,
      }));
      $w('#categoryFilter').value = 'all';
      $w('#categoryFilter').onChange((e) => {
        currentCategory = e.target.value;
        currentSkip = 0;
        loadNews(true);
      });
    } catch (e) {}
  } catch (e) {
    console.error('loadCategories error:', e);
  }
}

// ── Load News ──────────────────────────────────────────────

async function loadNews(reset = false) {
  try {
    showLoading(true);

    if (reset) currentSkip = 0;

    let query = wixData
      .query('News')
      .eq('status', 'published')
      .descending('publishedDate')
      .limit(PAGE_SIZE)
      .skip(currentSkip);

    if (currentCategory && currentCategory !== 'all') {
      // Wix query: filter by type OR category menggunakan .or()
      const byType     = wixData.query('News').eq('status', 'published').eq('type', currentCategory);
      const byCategory = wixData.query('News').eq('status', 'published').eq('category', currentCategory);
      query = byType.or(byCategory)
        .descending('publishedDate')
        .limit(PAGE_SIZE)
        .skip(currentSkip);
    }

    if (currentSearch.trim()) {
      query = query.contains('title', currentSearch.trim());
    }

    const result = await query.find();
    totalCount = result.totalCount;

    if (reset) {
      // Featured: tampilkan item pertama sebagai hero card
      if (result.items.length > 0) {
        renderFeatured(result.items[0]);
        $w('#newsRepeater').data = result.items.slice(1);
      } else {
        try { $w('#featuredCard').hide(); } catch (e) {}
        $w('#newsRepeater').data = [];
      }
    } else {
      // Load more: append
      const existing = $w('#newsRepeater').data;
      $w('#newsRepeater').data = [...existing, ...result.items];
    }

    // Bind repeater
    $w('#newsRepeater').onItemReady(($item, itemData) => {
      bindNewsCard($item, itemData);
    });

    // Result count
    try {
      $w('#resultCount').text = `Menampilkan ${$w('#newsRepeater').data.length + (result.items.length > 0 && reset ? 1 : 0)} dari ${totalCount} artikel`;
    } catch (e) {}

    // No results
    const hasItems = $w('#newsRepeater').data.length > 0 || (reset && result.items.length > 0);
    toggleEl('#noResultsText', !hasItems);

    // Load more button
    const loadedSoFar = currentSkip + PAGE_SIZE;
    toggleEl('#loadMoreContainer', loadedSoFar < totalCount);

    currentSkip += PAGE_SIZE;
  } catch (e) {
    console.error('loadNews error:', e);
  } finally {
    showLoading(false);
  }
}

// ── Featured Card ──────────────────────────────────────────

function renderFeatured(item) {
  try {
    $w('#featuredCard').show();
    try { $w('#featuredImage').src    = item.coverImage || ''; } catch (e) {}
    try {
      $w('#featuredEyebrow').text = buildEyebrow(item);
    } catch (e) {}
    try { $w('#featuredTitle').text   = item.title   || ''; } catch (e) {}
    try { $w('#featuredExcerpt').text = truncateText(item.excerpt || item.description, 200); } catch (e) {}
    try {
      $w('#featuredCard').onClick(() => {
        wixLocation.to(`/news/${item.slug}`);
      });
    } catch (e) {}
  } catch (e) {}
}

// ── Bind News Card ─────────────────────────────────────────

function bindNewsCard($item, itemData) {
  try { $item('#newsCoverImage').src    = itemData.coverImage || ''; } catch (e) {}
  try { $item('#newsEyebrow').text      = buildEyebrow(itemData); } catch (e) {}
  try { $item('#newsTitle').text        = itemData.title || ''; } catch (e) {}
  try { $item('#newsExcerpt').text      = truncateText(itemData.excerpt || itemData.description, 120); } catch (e) {}
  try {
    $item('#newsCard').onClick(() => {
      wixLocation.to(`/news/${itemData.slug}`);
    });
  } catch (e) {}
}

// ── Search ─────────────────────────────────────────────────

function initSearch() {
  try {
    const debouncedSearch = debounce((value) => {
      currentSearch = value;
      currentSkip = 0;
      loadNews(true);
    }, 400);

    $w('#searchInput').onInput((e) => {
      debouncedSearch(e.target.value);
    });

    $w('#searchInput').onKeyPress((e) => {
      if (e.key === 'Enter') {
        currentSearch = $w('#searchInput').value;
        currentSkip = 0;
        loadNews(true);
      }
    });
  } catch (e) {}
}

// ── Load More ──────────────────────────────────────────────

function initLoadMore() {
  try {
    $w('#btnLoadMore').onClick(() => loadNews(false));
  } catch (e) {}
}

// ── Helpers ────────────────────────────────────────────────

function buildEyebrow(item) {
  const parts = [
    item.type || item.category || 'Artikel',
    item.publishedDate ? formatDate(item.publishedDate) : '',
  ].filter(Boolean);
  return parts.join(' • ');
}

function showLoading(show) {
  try {
    show ? $w('#loadingSpinner').show() : $w('#loadingSpinner').hide();
  } catch (e) {}
}

function toggleEl(selector, show) {
  try {
    show ? $w(selector).show() : $w(selector).hide();
  } catch (e) {}
}
