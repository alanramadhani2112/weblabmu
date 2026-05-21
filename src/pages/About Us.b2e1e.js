/**
 * About Us.wscie.js — About Us Page
 *
 * Sections (dari wireframe):
 *  1. Hero          — "Membangun fondasi digital Muhammadiyah"
 *  2. Brand Story   — 3 paragraf narasi (static)
 *  3. Vision & Mission — 2-col bento (static)
 *  4. Core Tenets   — 4 value cards (static)
 *  5. Leadership    — 4 team members (CMS atau static)
 *  6. Footer
 *
 * Leadership dari wireframe (static fallback):
 *  - Dr. Ahmad Faisal — CEO
 *  - Siti Rahmawati   — CBO
 *  - Budi Santoso     — VP Engineering
 *  - Aisha Putri      — VP Operations
 *
 * Wix Element IDs:
 *  #btnHeroCTA         — "Discover Our Story" / scroll down
 *  #btnContact         — "Hubungi Kami" navbar
 *
 *  Leadership (jika pakai repeater dari CMS):
 *  #leadershipRepeater
 *    #memberPhoto      — image (grayscale → color on hover via CSS)
 *    #memberName       — text
 *    #memberRole       — text
 *
 *  Leadership (jika static cards di Editor):
 *  #memberPhoto1, #memberName1, #memberRole1
 *  #memberPhoto2, #memberName2, #memberRole2
 *  #memberPhoto3, #memberName3, #memberRole3
 *  #memberPhoto4, #memberName4, #memberRole4
 *
 *  Partners (opsional):
 *  #partnersRepeater
 *    #partnerLogo
 *    #partnerCard
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';

// Static leadership data (fallback jika tidak pakai CMS)
const LEADERSHIP = [
  {
    _id:   '1',
    name:  'Dr. Ahmad Faisal',
    role:  'Chief Executive Officer',
    photo: '', // isi dengan URL foto di Wix Media
  },
  {
    _id:   '2',
    name:  'Siti Rahmawati',
    role:  'Chief Business Officer',
    photo: '',
  },
  {
    _id:   '3',
    name:  'Budi Santoso',
    role:  'VP of Engineering',
    photo: '',
  },
  {
    _id:   '4',
    name:  'Aisha Putri',
    role:  'VP of Operations',
    photo: '',
  },
];

$w.onReady(async function () {
  initButtons();
  await loadLeadership();
  await loadPartners();
});

// ── Buttons ────────────────────────────────────────────────

function initButtons() {
  try {
    $w('#btnHeroCTA').onClick(() => {
      // Scroll ke section story
      try { $w('#storySection').scrollTo(); } catch (e) {
        wixLocation.to('/about-us#story');
      }
    });
  } catch (e) {}

  try {
    $w('#btnContact').onClick(() => wixLocation.to('/contact'));
  } catch (e) {}
}

// ── Leadership ─────────────────────────────────────────────

async function loadLeadership() {
  try {
    // Coba load dari CMS Team collection dulu
    const { items } = await wixData
      .query('Team')
      .ascending('order')
      .limit(4)
      .find();

    const data = items.length ? items : LEADERSHIP;
    renderLeadership(data);
  } catch (e) {
    // CMS belum ada — pakai static data
    renderLeadership(LEADERSHIP);
  }
}

function renderLeadership(members) {
  // Coba repeater dulu
  try {
    $w('#leadershipRepeater').data = members;
    $w('#leadershipRepeater').onItemReady(($item, itemData) => {
      try {
        if (itemData.photo) {
          $item('#memberPhoto').src = itemData.photo;
        }
        $item('#memberPhoto').alt = itemData.name || '';
      } catch (e) {}
      try { $item('#memberName').text = itemData.name || ''; } catch (e) {}
      try { $item('#memberRole').text = itemData.role || ''; } catch (e) {}
    });
    return;
  } catch (e) {}

  // Fallback: static individual elements
  members.forEach((m, i) => {
    const n = i + 1;
    try { if (m.photo) $w(`#memberPhoto${n}`).src = m.photo; } catch (e) {}
    try { $w(`#memberName${n}`).text = m.name; } catch (e) {}
    try { $w(`#memberRole${n}`).text = m.role; } catch (e) {}
  });
}

// ── Partners ───────────────────────────────────────────────

async function loadPartners() {
  try {
    const { items } = await wixData
      .query('Partners')
      .ascending('order')
      .find();

    if (!items.length) {
      try { $w('#partnersSection').hide(); } catch (e) {}
      return;
    }

    $w('#partnersRepeater').data = items;
    $w('#partnersRepeater').onItemReady(($item, itemData) => {
      try {
        $item('#partnerLogo').src = itemData.logo || '';
        $item('#partnerLogo').alt = itemData.name || '';
      } catch (e) {}
      try {
        if (itemData.url) {
          $item('#partnerCard').link   = itemData.url;
          $item('#partnerCard').target = '_blank';
        }
      } catch (e) {}
    });
  } catch (e) {
    try { $w('#partnersSection').hide(); } catch (e2) {}
  }
}
