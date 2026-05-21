/**
 * Use Case.d12rq.js — Use Cases Page
 *
 * Sections (dari wireframe):
 *  1. Hero          — "Solusi untuk berbagai ekosistem institusi"
 *  2. Rumah Sakit   — Ecosystem Workflow + Before/After
 *  3. Kampus & Sekolah
 *  4. Fintech
 *  (Setiap industri: static layout di Editor, data dari CMS opsional)
 *
 * Struktur wireframe: per-industri dengan format:
 *  - Icon + Judul industri + deskripsi singkat (kiri)
 *  - Ecosystem Workflow card (kanan atas)
 *  - Before card + After card (kanan bawah)
 *
 * CMS Collection: UseCases
 *  { title, industry, workflowDesc, beforeDesc, afterDesc,
 *    icon, slug, order, featured }
 *
 * Wix Element IDs:
 *  Hero:
 *    #btnHeroPrimary   — "Lihat Studi Kasus"
 *    #btnHeroSecondary — "Konsultasi"
 *    #heroImage        — hero image
 *
 *  Per industri (jika static di Editor — tidak perlu binding):
 *    #sectionHospital, #sectionCampus, #sectionFintech
 *
 *  Jika dynamic dari CMS (pakai repeater):
 *    #industriesRepeater
 *      #industryIcon
 *      #industryTitle
 *      #industryDesc
 *      #workflowDesc
 *      #beforeDesc
 *      #afterDesc
 *      #btnIndustryDetail
 *
 *  CTA:
 *    #btnCTA           — "Konsultasi" bottom
 */

import wixData from 'wix-data';
import wixLocation from 'wix-location';
import { truncateText } from 'public/utils.js';

// Static industry data (sesuai wireframe — fallback jika CMS kosong)
const INDUSTRIES = [
  {
    _id:          'hospital',
    icon:         'local_hospital',
    title:        'Rumah Sakit',
    description:  'Infrastruktur data kesehatan yang aman dan terintegrasi penuh.',
    workflow:     'Data rekam medis elektronik (EMR) terpusat, sistem antrean pintar, dan integrasi BPJS secara real-time. Memastikan kontinuitas perawatan pasien melintasi berbagai fasilitas kesehatan dalam satu jaringan.',
    before:       'Sistem terisolasi, redundansi data pasien, dan rekonsiliasi manual yang memakan waktu.',
    after:        'Efisiensi layanan meningkat 40%, integritas data terjamin, dan keputusan klinis berbasis data real-time.',
    slug:         'rumah-sakit',
    order:        1,
  },
  {
    _id:          'campus',
    icon:         'school',
    title:        'Kampus & Sekolah',
    description:  'Manajemen akademik dan administrasi terpadu skala nasional.',
    workflow:     'Sistem Informasi Akademik (SIAKAD) terpusat, portal mahasiswa terintegrasi dengan sistem pembayaran, dan analitik kinerja akademik institusi untuk akreditasi.',
    before:       'Data mahasiswa tersebar di berbagai server lokal, pelaporan lambat, dan proses pendaftaran manual.',
    after:        'Transparansi akademik penuh, rekonsiliasi keuangan otomatis, dan pelaporan nasional (PDDIKTI) 1-klik.',
    slug:         'kampus-sekolah',
    order:        2,
  },
  {
    _id:          'fintech',
    icon:         'account_balance',
    title:        'Fintech',
    description:  'Arsitektur keuangan mikro dan ekosistem pembayaran syariah.',
    workflow:     'Core banking system ringan, gateway pembayaran terpusat untuk seluruh amal usaha, dan manajemen risiko kredit berbasis AI untuk BPRS/BMT.',
    before:       'Transaksi uang tunai tinggi, kurangnya visibilitas likuiditas agregat, dan rekonsiliasi manual antar entitas.',
    after:        'Ekosistem cashless terpadu, visibilitas arus kas real-time, dan peningkatan kepatuhan syariah.',
    slug:         'fintech',
    order:        3,
  },
];

$w.onReady(async function () {
  initHeroButtons();
  initCTA();
  await loadIndustries();
});

// ── Hero Buttons ───────────────────────────────────────────

function initHeroButtons() {
    try {
      $w('#btnHeroPrimary').onClick(() => {
        // Scroll ke section pertama
        try { $w('#sectionHospital').scrollTo(); } catch (e) {}
      });
    } catch (e) {}

    try {
      $w('#btnHeroSecondary').onClick(() => {
        wixLocation.to('/contact');
      });
    } catch (e) {}
}

// ── CTA ────────────────────────────────────────────────────

function initCTA() {
  try {
    $w('#btnCTA').onClick(() => wixLocation.to('/contact'));
  } catch (e) {}
}

// ── Load Industries ────────────────────────────────────────

async function loadIndustries() {
  try {
    // Coba load dari CMS
    const { items } = await wixData
      .query('UseCases')
      .ascending('order')
      .find();

    const data = items.length ? items : INDUSTRIES;

    // Jika pakai repeater
    try {
      $w('#industriesRepeater').data = data;
      $w('#industriesRepeater').onItemReady(($item, itemData) => {
        bindIndustryCard($item, itemData);
      });
      return;
    } catch (e) {}

    // Jika static sections di Editor — bind per section
    bindStaticSections(data);

  } catch (e) {
    // CMS error — pakai static
    bindStaticSections(INDUSTRIES);
  }
}

// ── Bind Repeater Item ─────────────────────────────────────

function bindIndustryCard($item, itemData) {
  try { $item('#industryTitle').text    = itemData.title       || ''; } catch (e) {}
  try { $item('#industryDesc').text     = itemData.description || ''; } catch (e) {}
  try { $item('#workflowDesc').text     = itemData.workflow    || itemData.workflowDesc || ''; } catch (e) {}
  try { $item('#beforeDesc').text       = itemData.before      || itemData.beforeDesc   || ''; } catch (e) {}
  try { $item('#afterDesc').text        = itemData.after       || itemData.afterDesc    || ''; } catch (e) {}

  // Link ke Use Case detail page
  try {
    $item('#btnIndustryDetail').onClick(() => {
      wixLocation.to(`/use-case/${itemData.slug}`);
    });
  } catch (e) {}

  // Card click juga navigasi ke detail
  try {
    $item('#industryCard').onClick(() => {
      wixLocation.to(`/use-case/${itemData.slug}`);
    });
  } catch (e) {}
}

// ── Bind Static Sections ───────────────────────────────────
// Digunakan jika layout per-industri dibuat sebagai section terpisah di Editor

function bindStaticSections(data) {
  const sectionMap = {
    'hospital': 'Hospital',
    'campus':   'Campus',
    'fintech':  'Fintech',
  };

  data.forEach(item => {
    const suffix = sectionMap[item._id] || '';
    if (!suffix) return;

    try { $w(`#workflowDesc${suffix}`).text = item.workflow || item.workflowDesc || ''; } catch (e) {}
    try { $w(`#beforeDesc${suffix}`).text   = item.before   || item.beforeDesc   || ''; } catch (e) {}
    try { $w(`#afterDesc${suffix}`).text    = item.after    || item.afterDesc    || ''; } catch (e) {}

    try {
      $w(`#btnDetail${suffix}`).onClick(() => {
        wixLocation.to(`/use-case/${item.slug}`);
      });
    } catch (e) {}
  });
}
