/**
 * Home.c1dmp.js — Homepage
 *
 * Sections (matching wireframe):
 *  1. Cinematic Hero        — headline + 2 CTA buttons + image
 *  2. Ecosystem Architecture — M-ID network diagram + description
 *  3. Value Proposition     — Bento grid (4 cards)
 *  4. Resources Preview     — Editorial 3-col: 2 articles + newsletter
 *  5. Final CTA             — centered headline + button
 *
 * CMS Collections:
 *  - Resources  { title, excerpt, coverImage, type, publishedDate, slug }
 *
 * Wix Element IDs:
 *  Hero:
 *    #btnHeroDemo       — "Jadwalkan Demo" primary CTA
 *    #btnHeroExplore    — "Jelajahi Ekosistem" outline CTA
 *    #heroImage         — ecosystem concept image
 *
 *  Ecosystem section:
 *    #ecosystemImage    — M-ID network diagram image
 *
 *  Bento cards (static — no CMS needed):
 *    #cardDataSovereignty
 *    #cardEcosystem
 *    #cardDecisionIntel
 *    #cardSocialImpact
 *
 *  Resources:
 *    #resourcesRepeater — repeater for 2 latest articles
 *    #newsletterEmail   — email input
 *    #btnNewsletterSub  — subscribe button
 *    #btnViewAllRes     — "Lihat Semua" link
 *
 *  Final CTA:
 *    #btnFinalCTA       — "Hubungi Tim Enterprise LabMu"
 */

/**
 * CARA IMPORT DI WIX VELO:
 *
 * 1. Wix built-in API  → import wixData from 'wix-data'
 * 2. Public utils      → import { fn } from 'public/utils.js'
 * 3. Backend web module→ import { fn } from 'backend/newsService.web.js'
 * 4. npm package       → import _ from 'lodash'  (install dulu di Editor)
 *
 * JANGAN pakai:
 *   ❌ import { fn } from './public/utils.js'   (path relatif tidak valid)
 *   ❌ import { fn } from '../public/utils.js'  (path relatif tidak valid)
 *   ❌ require('wix-data')                      (require() tidak didukung)
 */

import wixLocation from 'wix-location';
import { formatDate, truncateText, isValidEmail } from 'public/utils.js';
import { getLatestNews, subscribeNewsletter } from 'backend/newsService.web.js';

$w.onReady(async function () {
  initHero();
  initFinalCTA();
  await loadLatestResources();
  initNewsletter();
});

// ── 1. Hero ────────────────────────────────────────────────

function initHero() {
  try {
    $w('#btnHeroDemo').onClick(() => {
      // Scroll to contact form or navigate to contact page
      wixLocation.to('/contact');
    });
  } catch (e) {}

  try {
    $w('#btnHeroExplore').onClick(() => {
      wixLocation.to('/products');
    });
  } catch (e) {}
}

// ── 4. Resources Preview ───────────────────────────────────

async function loadLatestResources() {
  try {
    // Pakai web module — query jalan di backend, aman untuk frontend
    const items = await getLatestNews(2);

    if (!items.length) return;

    $w('#resourcesRepeater').data = items;
    $w('#resourcesRepeater').onItemReady(($item, itemData) => {
      // Cover image — grayscale effect via CSS class on the image element
      try {
        $item('#resCoverImage').src = itemData.coverImage || '';
        $item('#resCoverImage').alt = itemData.title || '';
      } catch (e) {}

      // Eyebrow: "Type • Date"
      try {
        const eyebrow = [
          itemData.type || 'Article',
          itemData.publishedDate ? formatDate(itemData.publishedDate) : '',
        ].filter(Boolean).join(' • ');
        $item('#resEyebrow').text = eyebrow;
      } catch (e) {}

      try { $item('#resTitle').text   = itemData.title   || ''; } catch (e) {}
      try { $item('#resExcerpt').text = truncateText(itemData.excerpt || itemData.description, 160); } catch (e) {}

      // Click → detail page
      try {
        $item('#resCard').onClick(() => {
          wixLocation.to(`/resources/${itemData.slug}`);
        });
      } catch (e) {}
    });

    // "Lihat Semua" link
    try {
      $w('#btnViewAllRes').onClick(() => {
        wixLocation.to('/resources');
      });
    } catch (e) {}

  } catch (e) {
    console.error('loadLatestResources error:', e);
  }
}

// ── Newsletter ─────────────────────────────────────────────

function initNewsletter() {
  try {
    $w('#btnNewsletterSub').onClick(async () => {
      const email = $w('#newsletterEmail').value.trim();

      if (!email || !isValidEmail(email)) {
        $w('#newsletterEmail').style.borderColor = '#ba1a1a';
        return;
      }

      try {
        // Pakai web module untuk subscribe — logic duplikat check ada di backend
        const result = await subscribeNewsletter(email, 'homepage-newsletter');

        if (!result.success) {
          // Sudah subscribe sebelumnya
          $w('#btnNewsletterSub').label = result.message;
          return;
        }

        // Success state
        $w('#btnNewsletterSub').label = 'Berhasil Didaftarkan ✓';
        $w('#btnNewsletterSub').disable();
        $w('#newsletterEmail').value = '';
      } catch (err) {
        console.error('Newsletter subscribe error:', err);
      }
    });
  } catch (e) {}
}

// ── 5. Final CTA ───────────────────────────────────────────

function initFinalCTA() {
  try {
    $w('#btnFinalCTA').onClick(() => {
      wixLocation.to('/contact');
    });
  } catch (e) {}
}
