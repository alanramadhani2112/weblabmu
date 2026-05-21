/**
 * Products.bbpyn.js — Products & Solutions Page
 *
 * Sections (dari wireframe HTML):
 *  1. Hero              — "Infrastruktur digital untuk ekosistem yang terhubung"
 *  2. Ecosystem Products — 3 produk utama: MID, SatuMu, MASA (static cards)
 *  3. Architecture Flow  — Data flow visualization (static diagram)
 *  4. Why LabMu          — 4 advantage cards (static)
 *  5. Final CTA          — "Diskusi dengan Kami"
 *
 * Catatan: Produk (MID, SatuMu, MASA) adalah static content di wireframe.
 * Jika ingin dynamic dari CMS, uncomment bagian loadProducts().
 *
 * Wix Element IDs:
 *  Hero:
 *    #heroTitle          — headline text
 *    #heroImage          — hero image
 *
 *  Product Cards (static — set langsung di Wix Editor):
 *    #cardMID            — MID card container
 *    #cardSatuMu         — SatuMu card container
 *    #cardMASA           — MASA card container
 *    #btnMIDDetail       — button detail MID
 *    #btnSatuMuDetail    — button detail SatuMu
 *    #btnMASADetail      — button detail MASA
 *
 *  CTA:
 *    #btnFinalCTA        — "Diskusi dengan Kami"
 *    #btnNavContact      — navbar "Hubungi Kami"
 */

import wixLocation from 'wix-location';

// ── Static product data (sesuai wireframe) ─────────────────
const PRODUCTS = [
  {
    id:          'mid',
    number:      '01',
    category:    'IDENTITY',
    icon:        'fingerprint',
    title:       'Muhammadiyah ID (MID)',
    description: 'Single Sign-On (SSO) and centralized identity management system ensuring secure, unified access across the entire organizational network.',
    slug:        'muhammadiyah-id',
  },
  {
    id:          'satumu',
    number:      '02',
    category:    'INTEGRATION',
    icon:        'hub',
    title:       'SatuMu',
    description: 'The central integration bus and API gateway orchestrating secure data exchange between dispersed institutional nodes and external partners.',
    slug:        'satumu',
  },
  {
    id:          'masa',
    number:      '03',
    category:    'ANALYTICS',
    icon:        'monitoring',
    title:       'MASA',
    description: 'Enterprise-grade data warehousing and advanced analytics platform delivering actionable intelligence for strategic decision-making.',
    slug:        'masa',
  },
];

// ── Static advantage cards ─────────────────────────────────
const ADVANTAGES = [
  {
    id:          'integrated',
    icon:        'architecture',
    title:       'Integrated Architecture',
    description: 'A cohesive framework designed to eliminate data silos, ensuring seamless interoperability across diverse organizational entities.',
  },
  {
    id:          'sovereignty',
    icon:        'admin_panel_settings',
    title:       'Data Sovereignty',
    description: 'Rigorous infrastructure controls guaranteeing complete ownership, localization, and protection of institutional data assets.',
  },
  {
    id:          'scalability',
    icon:        'layers',
    title:       'Enterprise Scalability',
    description: 'Elastic architecture built to seamlessly accommodate exponential growth in transaction volume and user base without performance degradation.',
  },
  {
    id:          'governance',
    icon:        'gavel',
    title:       'Strict Governance',
    description: 'Embedded compliance and policy enforcement protocols, ensuring all digital operations align with overarching institutional mandates.',
  },
];

// ── onReady ────────────────────────────────────────────────

$w.onReady(function () {
  initProductCards();
  initAdvantageCards();
  initCTAButtons();
});

// ── Product Cards ──────────────────────────────────────────

function initProductCards() {
  // Bind click handler ke setiap product card
  PRODUCTS.forEach(product => {
    const goToDetail = () => wixLocation.to(`/products/${product.slug}`);

    // Card container click
    try { $w(`#card${capitalize(product.id)}`).onClick(goToDetail); } catch (e) {}

    // Detail button (jika ada)
    try { $w(`#btn${capitalize(product.id)}Detail`).onClick(goToDetail); } catch (e) {}
  });

  // Jika menggunakan repeater untuk products (opsional)
  try {
    $w('#productsRepeater').data = PRODUCTS;
    $w('#productsRepeater').onItemReady(($item, itemData) => {
      try { $item('#productNumber').text   = itemData.number   || ''; } catch (e) {}
      try { $item('#productCategory').text = itemData.category || ''; } catch (e) {}
      try { $item('#productTitle').text    = itemData.title    || ''; } catch (e) {}
      try { $item('#productDesc').text     = itemData.description || ''; } catch (e) {}
      try {
        $item('#productCard').onClick(() => {
          wixLocation.to(`/products/${itemData.slug}`);
        });
      } catch (e) {}
    });
  } catch (e) {
    // Repeater tidak ada — menggunakan static cards di Editor
  }
}

// ── Advantage Cards ────────────────────────────────────────

function initAdvantageCards() {
  // Jika menggunakan repeater untuk advantages
  try {
    $w('#advantagesRepeater').data = ADVANTAGES;
    $w('#advantagesRepeater').onItemReady(($item, itemData) => {
      try { $item('#advantageTitle').text = itemData.title       || ''; } catch (e) {}
      try { $item('#advantageDesc').text  = itemData.description || ''; } catch (e) {}
    });
  } catch (e) {
    // Static cards di Editor — tidak perlu binding
  }
}

// ── CTA Buttons ────────────────────────────────────────────

function initCTAButtons() {
  // Final CTA — "Diskusi dengan Kami"
  try {
    $w('#btnFinalCTA').onClick(() => {
      wixLocation.to('/contact');
    });
  } catch (e) {}

  // Navbar "Hubungi Kami"
  try {
    $w('#btnNavContact').onClick(() => {
      wixLocation.to('/contact');
    });
  } catch (e) {}

  // Hero scroll down (jika ada anchor button)
  try {
    $w('#btnHeroScroll').onClick(() => {
      $w('#productsSection').scrollTo();
    });
  } catch (e) {}
}

// ── Helpers ────────────────────────────────────────────────

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
