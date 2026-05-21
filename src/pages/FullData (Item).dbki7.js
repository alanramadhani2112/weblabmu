/**
 * FullData (Item).dbki7.js — Product Detail Page (Dynamic)
 *
 * File ini KHUSUS untuk detail halaman Products (MID, SatuMu, MASA).
 * Untuk Use Case detail, gunakan file terpisah: Use Case (Item).js
 *
 * Di Wix Editor:
 *  - Connect #dynamicDataset ke collection "Products"
 *  - URL pattern: /products/{slug}
 *
 * Sections:
 *  1. Breadcrumb        — Home > Products > [Title]
 *  2. Eyebrow           — "01 / IDENTITY"
 *  3. Title + Description
 *  4. Cover Image
 *  5. Rich Text Content
 *  6. Features list
 *  7. Related Products  — produk lain
 *  8. CTA               — "Jadwalkan Demo"
 *
 * Wix Element IDs:
 *  #dynamicDataset    — dataset → Products collection
 *  #breadcrumbParent  — "Products" text (clickable)
 *  #breadcrumbCurrent — current product title
 *  #itemEyebrow       — "01 / IDENTITY"
 *  #itemTitle         — h1 title
 *  #itemDescription   — description text
 *  #itemCoverImage    — cover/hero image
 *  #itemContent       — rich text body
 *  #featuresSection   — container (hide if no features)
 *    #featuresRepeater
 *      #featureText   — feature item text
 *  #relatedSection    — container (hide if no related)
 *    #relatedRepeater
 *      #relatedCard   — clickable container
 *      #relatedEyebrow— "01 / IDENTITY"
 *      #relatedTitle  — title
 *      #relatedDesc   — short description
 *  #btnBack           — back to /products
 *  #btnCTA            — "Jadwalkan Demo"
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { truncateText } from 'public/utils.js';

$w.onReady(function () {
  $w('#dynamicDataset').onReady(() => {
    const item = $w('#dynamicDataset').getCurrentItem();

    if (!item) {
      wixLocation.to('/products');
      return;
    }

    populateProduct(item);
    loadRelatedProducts(item);
    initButtons(item);
  });
});

// ── Populate Product ───────────────────────────────────────

function populateProduct(item) {
  // Breadcrumb
  try { $w('#breadcrumbCurrent').text = item.title || ''; } catch (e) {}
  try {
    $w('#breadcrumbParent').onClick(() => wixLocation.to('/products'));
  } catch (e) {}

  // Eyebrow — "01 / IDENTITY"
  try {
    const eyebrow = [item.number, item.category].filter(Boolean).join(' / ');
    $w('#itemEyebrow').text = eyebrow || item.category || '';
  } catch (e) {}

  // Title & description
  try { $w('#itemTitle').text       = item.title       || ''; } catch (e) {}
  try { $w('#itemDescription').text = item.description || ''; } catch (e) {}

  // Cover image
  try {
    if (item.coverImage) {
      $w('#itemCoverImage').src = item.coverImage;
      $w('#itemCoverImage').alt = item.title || '';
      $w('#itemCoverImage').show();
    } else {
      $w('#itemCoverImage').hide();
    }
  } catch (e) {}

  // Rich text content
  try {
    $w('#itemContent').html = item.content || '';
  } catch (e) {
    try { $w('#itemContent').text = item.content || ''; } catch (e2) {}
  }

  // Features list
  try {
    if (item.features && item.features.length) {
      $w('#featuresRepeater').data = item.features.map((f, i) => ({
        _id:     String(i),
        feature: f,
      }));
      $w('#featuresRepeater').onItemReady(($item, d) => {
        try { $item('#featureText').text = d.feature; } catch (e) {}
      });
      $w('#featuresSection').show();
    } else {
      $w('#featuresSection').hide();
    }
  } catch (e) {}
}

// ── Related Products ───────────────────────────────────────

async function loadRelatedProducts(currentItem) {
  try {
    const { items } = await wixData
      .query('Products')
      .ne('_id', currentItem._id)
      .ascending('order')
      .limit(3)
      .find();

    if (!items.length) {
      try { $w('#relatedSection').hide(); } catch (e) {}
      return;
    }

    $w('#relatedRepeater').data = items;
    $w('#relatedRepeater').onItemReady(($item, itemData) => {
      try {
        const eyebrow = [itemData.number, itemData.category].filter(Boolean).join(' / ');
        $item('#relatedEyebrow').text = eyebrow || itemData.category || '';
      } catch (e) {}
      try { $item('#relatedTitle').text = itemData.title || ''; } catch (e) {}
      try { $item('#relatedDesc').text  = truncateText(itemData.description, 90); } catch (e) {}
      try {
        $item('#relatedCard').onClick(() => {
          wixLocation.to(`/products/${itemData.slug}`);
        });
      } catch (e) {}
    });
  } catch (e) {
    console.error('loadRelatedProducts error:', e);
    try { $w('#relatedSection').hide(); } catch (e2) {}
  }
}

// ── Buttons ────────────────────────────────────────────────

function initButtons(item) {
  try {
    $w('#btnBack').onClick(() => wixLocation.to('/products'));
  } catch (e) {}

  try {
    $w('#btnCTA').onClick(() => {
      const name = encodeURIComponent(item.title || '');
      wixLocation.to(`/contact?product=${name}`);
    });
  } catch (e) {}
}
