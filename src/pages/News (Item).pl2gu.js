/**
 * News (Item).uhwcv.js — Resources / Article Detail Page (Dynamic)
 *
 * Layout (dari wireframe):
 *  - Article Header: breadcrumb, type badge, title, subtitle, author/date/readtime
 *  - Hero Image: full-width 21:9
 *  - 2-col: article body (8-col) + sticky sidebar (3-col)
 *    Sidebar: Table of Contents, CTA box, Related Insights
 *
 * CMS Collection: News (Dynamic Dataset)
 *  { title, subtitle, content, coverImage, publishedDate, slug,
 *    type, category, author, authorPhoto, tags, excerpt, fileUrl }
 *
 * Wix Element IDs:
 *  Header:
 *    #dynamicDataset      — dataset → News collection
 *    #breadcrumbParent    — "Resources" link
 *    #breadcrumbCategory  — "Insight" / category link
 *    #typeBadge           — "RESEARCH" / "WHITEPAPER" badge
 *    #articleTitle        — h1
 *    #articleSubtitle     — subtitle/lead text
 *    #articleAuthor       — author name
 *    #articleDate         — published date
 *    #readingTime         — "12 Min Read"
 *
 *  Hero:
 *    #heroImage           — 21:9 cover image
 *
 *  Body:
 *    #articleContent      — rich text / HTML element
 *
 *  Sidebar:
 *    #tocRepeater         — Table of Contents repeater
 *      #tocLink           — section link text
 *    #btnDownload         — "Unduh Whitepaper" / download button
 *    #sidebarCTATitle     — CTA box title
 *    #sidebarCTADesc      — CTA box description
 *    #relatedRepeater     — Related Insights repeater
 *      #relatedCard       — clickable container
 *      #relatedType       — type label
 *      #relatedTitle      — title
 *
 *  Share / Back:
 *    #btnShareFB          — Facebook share
 *    #btnShareTW          — Twitter share
 *    #btnShareLI          — LinkedIn share
 *    #btnCopyLink         — copy link
 *    #copyConfirm         — "Link disalin!" (hidden default)
 *    #btnBackToList       — back to /news
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { formatDate } from 'public/utils.js';

$w.onReady(function () {
  $w('#dynamicDataset').onReady(() => {
    const item = $w('#dynamicDataset').getCurrentItem();
    if (!item) {
      wixLocation.to('/news');
      return;
    }

    populateHeader(item);
    populateHero(item);
    populateBody(item);
    populateSidebar(item);
    loadRelatedArticles(item);
    initShareButtons(item);
    initButtons(item);
  });
});

// ── Header ─────────────────────────────────────────────────

function populateHeader(item) {
  // Breadcrumb
  try {
    $w('#breadcrumbParent').onClick(() => wixLocation.to('/news'));
  } catch (e) {}
  try {
    $w('#breadcrumbCategory').text = item.category || item.type || 'Insight';
  } catch (e) {}

  // Type badge — "RESEARCH" / "WHITEPAPER" / "ARTICLE"
  try {
    $w('#typeBadge').text = (item.type || 'ARTICLE').toUpperCase();
  } catch (e) {}

  // Title
  try { $w('#articleTitle').text = item.title || ''; } catch (e) {}

  // Subtitle / lead
  try {
    $w('#articleSubtitle').text = item.subtitle || item.excerpt || '';
  } catch (e) {}

  // Author
  try { $w('#articleAuthor').text = item.author || 'Tim LabMu'; } catch (e) {}

  // Date
  try {
    $w('#articleDate').text = item.publishedDate
      ? formatDate(item.publishedDate)
      : '';
  } catch (e) {}

  // Reading time
  try {
    const words   = (item.content || '').replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    $w('#readingTime').text = `${minutes} Min Read`;
  } catch (e) {}
}

// ── Hero Image ─────────────────────────────────────────────

function populateHero(item) {
  try {
    if (item.coverImage) {
      $w('#heroImage').src = item.coverImage;
      $w('#heroImage').alt = item.title || '';
      $w('#heroImageContainer').show();
    } else {
      $w('#heroImageContainer').hide();
    }
  } catch (e) {}
}

// ── Article Body ───────────────────────────────────────────

function populateBody(item) {
  try {
    $w('#articleContent').html = item.content || '';
  } catch (e) {
    try { $w('#articleContent').text = item.content || ''; } catch (e2) {}
  }
}

// ── Sidebar ────────────────────────────────────────────────

function populateSidebar(item) {
  // Table of Contents — parse h2 headings dari content
  try {
    const headings = extractHeadings(item.content || '');
    if (headings.length) {
      $w('#tocRepeater').data = headings;
      $w('#tocRepeater').onItemReady(($item, heading) => {
        try { $item('#tocLink').text = heading.text; } catch (e) {}
        try {
          $item('#tocLink').onClick(() => {
            // Wix tidak support anchor scroll langsung,
            // tapi bisa pakai wixLocation dengan hash
            wixLocation.to(`${wixLocation.url}#${heading.id}`);
          });
        } catch (e) {}
      });
      $w('#tocContainer').show();
    } else {
      $w('#tocContainer').hide();
    }
  } catch (e) {}

  // Download button — tampilkan jika ada fileUrl
  try {
    if (item.fileUrl) {
      $w('#btnDownload').show();
      $w('#btnDownload').onClick(async () => {
        wixLocation.to(item.fileUrl);
        // Increment download count
        try {
          await wixData.update('News', {
            ...item,
            downloadCount: (item.downloadCount || 0) + 1,
          });
        } catch (e) {}
      });
    } else {
      $w('#btnDownload').hide();
    }
  } catch (e) {}
}

// ── Related Articles ───────────────────────────────────────

async function loadRelatedArticles(currentItem) {
  try {
    const filterField = currentItem.category ? 'category'
                      : currentItem.type     ? 'type'
                      : null;

    let query = wixData
      .query('News')
      .eq('status', 'published')
      .ne('_id', currentItem._id)
      .descending('publishedDate')
      .limit(3);

    if (filterField) {
      query = query.eq(filterField, currentItem[filterField]);
    }

    const { items } = await query.find();

    if (!items.length) {
      try { $w('#relatedContainer').hide(); } catch (e) {}
      return;
    }

    $w('#relatedRepeater').data = items;
    $w('#relatedRepeater').onItemReady(($item, itemData) => {
      try { $item('#relatedType').text  = (itemData.type || 'Article').toUpperCase(); } catch (e) {}
      try { $item('#relatedTitle').text = itemData.title || ''; } catch (e) {}
      try {
        $item('#relatedCard').onClick(() => {
          wixLocation.to(`/news/${itemData.slug}`);
        });
      } catch (e) {}
    });
  } catch (e) {
    console.error('loadRelatedArticles error:', e);
    try { $w('#relatedContainer').hide(); } catch (e2) {}
  }
}

// ── Share Buttons ──────────────────────────────────────────

function initShareButtons(item) {
  const pageUrl   = encodeURIComponent(wixLocation.url);
  const pageTitle = encodeURIComponent(item.title || '');

  try {
    $w('#btnShareFB').onClick(() => {
      wixWindow.openLightbox('ExternalLink', {
        url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
      });
    });
  } catch (e) {}

  try {
    $w('#btnShareTW').onClick(() => {
      wixWindow.openLightbox('ExternalLink', {
        url: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
      });
    });
  } catch (e) {}

  try {
    $w('#btnShareLI').onClick(() => {
      wixWindow.openLightbox('ExternalLink', {
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
      });
    });
  } catch (e) {}

  try {
    $w('#btnCopyLink').onClick(() => {
      try { $w('#copyConfirm').show(); } catch (e) {}
      setTimeout(() => {
        try { $w('#copyConfirm').hide(); } catch (e) {}
      }, 2000);
    });
  } catch (e) {}
}

// ── Back / CTA Buttons ─────────────────────────────────────

function initButtons(item) {
  try {
    $w('#btnBackToList').onClick(() => wixLocation.to('/news'));
  } catch (e) {}

  // Sidebar CTA — "Konsultasikan kebutuhan infrastruktur"
  try {
    $w('#btnSidebarCTA').onClick(() => {
      const title = encodeURIComponent(item.title || '');
      wixLocation.to(`/contact?topic=Konsultasi%20Strategis&ref=${title}`);
    });
  } catch (e) {}
}

// ── Helpers ────────────────────────────────────────────────

/**
 * Extract h2 headings dari HTML content untuk Table of Contents
 * @param {string} html
 * @returns {{ _id: string, id: string, text: string }[]}
 */
function extractHeadings(html) {
  const headings = [];
  const regex    = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;
  let match;
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    headings.push({
      _id:  String(index++),
      id:   match[1],
      text: match[2].replace(/<[^>]*>/g, ''), // strip inner tags
    });
  }

  return headings;
}
