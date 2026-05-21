/**
 * Resources.e16fu.js — Resources Page (Jurnal & Pemikiran)
 *
 * Sections (dari wireframe):
 *  1. Hero          — "Insight untuk transformasi digital berbasis nilai"
 *  2. Featured Insights — 1 featured besar (8-col) + 3 sidebar items (4-col)
 *  3. Library Grid  — 3-col card grid (type badge + title + date)
 *  4. Newsletter    — email subscribe form
 *
 * CMS Collection: Resources
 *  { title, excerpt, description, coverImage, type,
 *    fileUrl, downloadCount, slug, publishedDate, featured, status }
 *
 * Wix Element IDs:
 *  Featured section:
 *    #featuredImage      — large cover image (8-col)
 *    #featuredType       — "WHITEPAPER • 12 MIN READ"
 *    #featuredTitle      — title (hover underline)
 *    #featuredExcerpt    — 3-line excerpt
 *    #featuredCard       — clickable container
 *
 *  Sidebar items (3 items di kanan):
 *    #sidebarRepeater    — repeater
 *      #sidebarType      — type label
 *      #sidebarTitle     — title
 *      #sidebarExcerpt   — short excerpt
 *      #sidebarCard      — clickable
 *
 *  Library grid:
 *    #libraryRepeater    — repeater 3-col
 *      #libCard          — clickable container
 *      #libType          — type badge
 *      #libTitle         — title
 *      #libExcerpt       — excerpt
 *      #libDate          — date
 *      #libArrow         — arrow icon
 *    #btnViewAll         — "View All" link
 *
 *  Newsletter:
 *    #newsletterEmail    — email input
 *    #btnNewsletterSub   — "Subscribe" button
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { formatDate, truncateText } from 'public/utils.js';
import { subscribeNewsletter } from 'backend/newsService.web.js';

$w.onReady(async function () {
  await loadResources();
  initNewsletter();
  initViewAll();
});

// ── Load Resources ─────────────────────────────────────────

async function loadResources() {
  try {
    const { items } = await wixData
      .query('Resources')
      .eq('status', 'published')
      .descending('publishedDate')
      .find();

    if (!items.length) return;

    // Featured = item pertama yang di-flag featured, atau item pertama
    const featured = items.find(i => i.featured) || items[0];
    renderFeatured(featured);

    // Sidebar = 3 item setelah featured (bukan featured)
    const sidebarItems = items
      .filter(i => i._id !== featured._id)
      .slice(0, 3);
    renderSidebar(sidebarItems);

    // Library = semua item (atau exclude featured)
    const libraryItems = items
      .filter(i => i._id !== featured._id)
      .slice(0, 9); // max 9 di library grid
    renderLibrary(libraryItems);

  } catch (e) {
    console.error('loadResources error:', e);
  }
}

// ── Featured ───────────────────────────────────────────────

function renderFeatured(item) {
  if (!item) return;

  try {
    $w('#featuredImage').src = item.coverImage || '';
    $w('#featuredImage').alt = item.title || '';
  } catch (e) {}

  try {
    // Format: "WHITEPAPER • 12 MIN READ" atau "TYPE • DATE"
    const readTime = estimateReadTime(item.description || item.excerpt || '');
    $w('#featuredType').text = [
      (item.type || 'ARTICLE').toUpperCase(),
      `${readTime} MIN READ`,
    ].join(' • ');
  } catch (e) {}

  try { $w('#featuredTitle').text   = item.title || ''; } catch (e) {}
  try { $w('#featuredExcerpt').text = truncateText(item.excerpt || item.description, 200); } catch (e) {}

  try {
    $w('#featuredCard').onClick(() => handleOpen(item));
  } catch (e) {}
}

// ── Sidebar ────────────────────────────────────────────────

function renderSidebar(items) {
  if (!items.length) {
    try { $w('#sidebarContainer').hide(); } catch (e) {}
    return;
  }

  try {
    $w('#sidebarRepeater').data = items;
    $w('#sidebarRepeater').onItemReady(($item, itemData) => {
      try { $item('#sidebarType').text    = (itemData.type || 'ARTICLE').toUpperCase(); } catch (e) {}
      try { $item('#sidebarTitle').text   = itemData.title || ''; } catch (e) {}
      try { $item('#sidebarExcerpt').text = truncateText(itemData.excerpt || itemData.description, 100); } catch (e) {}
      try {
        $item('#sidebarCard').onClick(() => handleOpen(itemData));
      } catch (e) {}
    });
  } catch (e) {}
}

// ── Library Grid ───────────────────────────────────────────

function renderLibrary(items) {
  if (!items.length) {
    try { $w('#librarySection').hide(); } catch (e) {}
    return;
  }

  try {
    $w('#libraryRepeater').data = items;
    $w('#libraryRepeater').onItemReady(($item, itemData) => {
      try { $item('#libType').text    = (itemData.type || 'ARTICLE').toUpperCase(); } catch (e) {}
      try { $item('#libTitle').text   = itemData.title || ''; } catch (e) {}
      try { $item('#libExcerpt').text = truncateText(itemData.excerpt || itemData.description, 100); } catch (e) {}
      try { $item('#libDate').text    = formatDate(itemData.publishedDate); } catch (e) {}
      try {
        $item('#libCard').onClick(() => handleOpen(itemData));
      } catch (e) {}
    });
  } catch (e) {}
}

// ── Open / Download ────────────────────────────────────────

async function handleOpen(item) {
  if (item.fileUrl) {
    wixLocation.to(item.fileUrl);
    try {
      await wixData.update('Resources', {
        ...item,
        downloadCount: (item.downloadCount || 0) + 1,
      });
    } catch (e) {}
  } else {
    wixLocation.to(`/resources/${item.slug}`);
  }
}

// ── View All ───────────────────────────────────────────────

function initViewAll() {
  try {
    $w('#btnViewAll').onClick(() => {
      wixLocation.to('/resources');
    });
  } catch (e) {}
}

// ── Newsletter ─────────────────────────────────────────────

function initNewsletter() {
  try {
    $w('#btnNewsletterSub').onClick(async () => {
      const email = $w('#newsletterEmail').value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        try { $w('#newsletterEmail').style.borderColor = '#ba1a1a'; } catch (e) {}
        return;
      }

      try {
        $w('#btnNewsletterSub').disable();
        const result = await subscribeNewsletter(email, 'resources-newsletter');

        if (!result.success) {
          $w('#btnNewsletterSub').label = result.message;
          $w('#btnNewsletterSub').enable();
          return;
        }

        $w('#btnNewsletterSub').label = 'Subscribed ✓';
        $w('#newsletterEmail').value  = '';
      } catch (err) {
        console.error('Newsletter error:', err);
        $w('#btnNewsletterSub').enable();
      }
    });
  } catch (e) {}
}

// ── Helpers ────────────────────────────────────────────────

function estimateReadTime(text) {
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
