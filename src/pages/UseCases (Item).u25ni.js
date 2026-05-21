/**
 * Use Case (Item).js — Use Case Detail Page (Dynamic)
 *
 * Layout SAMA dengan Resources detail (wireframe single post):
 *  - Article Header: breadcrumb, industry badge, title, subtitle, meta
 *  - Hero Image: full-width 21:9
 *  - 2-col: article body (8-col) + sticky sidebar (3-col)
 *    Sidebar: Before/After summary, CTA box, Related Use Cases
 *
 * CMS Collection: UseCases (Dynamic Dataset)
 *  { title, description, workflowDesc, beforeDesc, afterDesc,
 *    results, client, coverImage, industry, slug, order }
 *
 * Wix Element IDs:
 *  Header:
 *    #dynamicDataset      — dataset → UseCases collection
 *    #breadcrumbParent    — "Use Cases" link
 *    #industryBadge       — "RUMAH SAKIT" / "KAMPUS" badge
 *    #articleTitle        — h1 title
 *    #articleSubtitle     — description / subtitle
 *    #clientName          — nama institusi client
 *    #clientLabel         — "Client" label (hide if no client)
 *
 *  Hero:
 *    #heroImage           — 21:9 cover image
 *    #heroImageContainer  — container (hide if no image)
 *
 *  Body:
 *    #workflowSection     — Ecosystem Workflow section
 *      #workflowDesc      — workflow description
 *    #beforeAfterSection  — Before/After section
 *      #beforeDesc        — kondisi sebelum
 *      #afterDesc         — kondisi sesudah (green border)
 *    #resultsSection      — Results/Metrics (hide if empty)
 *      #itemResults       — results text
 *    #articleContent      — rich text body (opsional, jika ada content field)
 *
 *  Sidebar:
 *    #sidebarIndustry     — industry badge di sidebar
 *    #sidebarClient       — client name di sidebar
 *    #sidebarResults      — key metric di sidebar
 *    #btnSidebarCTA       — "Konsultasi" button
 *    #relatedRepeater     — Related Use Cases
 *      #relatedCard       — clickable
 *      #relatedType       — industry label
 *      #relatedTitle      — title
 *
 *  Navigation:
 *    #btnBack             — back to /use-case
 *    #btnCTA              — "Konsultasi" bottom CTA
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { truncateText } from 'public/utils.js';

$w.onReady(function () {
  $w('#dynamicDataset').onReady(() => {
    const item = $w('#dynamicDataset').getCurrentItem();

    if (!item) {
      wixLocation.to('/use-case');
      return;
    }

    populateHeader(item);
    populateHero(item);
    populateBody(item);
    populateSidebar(item);
    loadRelatedUseCases(item);
    initButtons(item);
  });
});

// ── Header ─────────────────────────────────────────────────

function populateHeader(item) {
  // Breadcrumb
  try {
    $w('#breadcrumbParent').onClick(() => wixLocation.to('/use-case'));
  } catch (e) {}

  // Industry badge — "RUMAH SAKIT"
  try {
    $w('#industryBadge').text = (item.industry || '').toUpperCase();
  } catch (e) {}

  // Title & subtitle
  try { $w('#articleTitle').text    = item.title       || ''; } catch (e) {}
  try { $w('#articleSubtitle').text = item.description || ''; } catch (e) {}

  // Client
  try {
    if (item.client) {
      $w('#clientName').text = item.client;
      $w('#clientLabel').show();
    } else {
      $w('#clientLabel').hide();
    }
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

// ── Body ───────────────────────────────────────────────────

function populateBody(item) {
  // Ecosystem Workflow
  try {
    const workflow = item.workflowDesc || item.workflow || '';
    if (workflow) {
      $w('#workflowDesc').text = workflow;
      $w('#workflowSection').show();
    } else {
      $w('#workflowSection').hide();
    }
  } catch (e) {}

  // Before / After
  try {
    const before = item.beforeDesc || item.before || '';
    const after  = item.afterDesc  || item.after  || '';

    if (before || after) {
      try { $w('#beforeDesc').text = before; } catch (e) {}
      try { $w('#afterDesc').text  = after;  } catch (e) {}
      $w('#beforeAfterSection').show();
    } else {
      $w('#beforeAfterSection').hide();
    }
  } catch (e) {}

  // Results
  try {
    if (item.results) {
      $w('#itemResults').text = item.results;
      $w('#resultsSection').show();
    } else {
      $w('#resultsSection').hide();
    }
  } catch (e) {}

  // Rich text content (opsional)
  try {
    if (item.content) {
      $w('#articleContent').html = item.content;
      $w('#articleContent').show();
    } else {
      $w('#articleContent').hide();
    }
  } catch (e) {}
}

// ── Sidebar ────────────────────────────────────────────────

function populateSidebar(item) {
  // Industry & client summary
  try { $w('#sidebarIndustry').text = item.industry || ''; } catch (e) {}
  try {
    if (item.client) {
      $w('#sidebarClient').text = item.client;
      $w('#sidebarClient').show();
    } else {
      $w('#sidebarClient').hide();
    }
  } catch (e) {}

  // Key metric / results summary
  try {
    if (item.results) {
      $w('#sidebarResults').text = truncateText(item.results, 120);
      $w('#sidebarResults').show();
    } else {
      $w('#sidebarResults').hide();
    }
  } catch (e) {}

  // Sidebar CTA
  try {
    $w('#btnSidebarCTA').onClick(() => {
      const industry = encodeURIComponent(item.industry || item.title || '');
      wixLocation.to(`/contact?topic=Implementasi%20Sistem&industry=${industry}`);
    });
  } catch (e) {}
}

// ── Related Use Cases ──────────────────────────────────────

async function loadRelatedUseCases(currentItem) {
  try {
    const { items } = await wixData
      .query('UseCases')
      .ne('_id', currentItem._id)
      .ascending('order')
      .limit(3)
      .find();

    if (!items.length) {
      try { $w('#relatedContainer').hide(); } catch (e) {}
      return;
    }

    $w('#relatedRepeater').data = items;
    $w('#relatedRepeater').onItemReady(($item, itemData) => {
      try { $item('#relatedType').text  = (itemData.industry || '').toUpperCase(); } catch (e) {}
      try { $item('#relatedTitle').text = itemData.title || ''; } catch (e) {}
      try {
        $item('#relatedCard').onClick(() => {
          wixLocation.to(`/use-case/${itemData.slug}`);
        });
      } catch (e) {}
    });
  } catch (e) {
    console.error('loadRelatedUseCases error:', e);
    try { $w('#relatedContainer').hide(); } catch (e2) {}
  }
}

// ── Buttons ────────────────────────────────────────────────

function initButtons(item) {
  try {
    $w('#btnBack').onClick(() => wixLocation.to('/use-case'));
  } catch (e) {}

  try {
    $w('#btnCTA').onClick(() => {
      const industry = encodeURIComponent(item.industry || item.title || '');
      wixLocation.to(`/contact?topic=Implementasi%20Sistem&industry=${industry}`);
    });
  } catch (e) {}
}
