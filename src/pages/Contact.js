/**
 * Contact.js — Contact / Executive Consultation Page
 *
 * Sections (dari wireframe):
 *  1. Hero          — "Bangun masa depan digital Muhammadiyah bersama LabMu"
 *  2. Contact Info  — Kantor Pusat + Kontak Eksekutif (static)
 *  3. Contact Form  — Nama, Email, Institusi, Topik, Pesan
 *  4. Footer
 *
 * Form fields:
 *  - Nama Depan     (#firstName)
 *  - Nama Belakang  (#lastName)
 *  - Email Institusi (#email)
 *  - Nama Institusi / Majelis (#institution)
 *  - Topik Diskusi  (#topicSelect) — dropdown
 *  - Pesan Singkat  (#message)
 *  - Submit button  (#btnSubmit)
 *
 * CMS Collection: ContactSubmissions (auto-created)
 *  { firstName, lastName, email, institution, topic, message, submittedAt }
 *
 * Wix Element IDs:
 *  Form:
 *    #firstName      — text input
 *    #lastName       — text input
 *    #email          — email input
 *    #institution    — text input
 *    #topicSelect    — dropdown
 *    #message        — textarea / text input multiline
 *    #btnSubmit      — "Jadwalkan Pertemuan" button
 *    #formSuccess    — success message container (hidden by default)
 *    #formError      — error message container (hidden by default)
 *
 *  Contact info (static di Editor):
 *    #officeAddress  — text element
 *    #contactEmail   — text element
 *    #contactPhone   — text element
 */

import wixLocation from 'wix-location';
import { isValidEmail } from 'public/utils.js';
import { submitContactForm } from 'backend/newsService.web.js';

// Topic options (sesuai wireframe dropdown)
const TOPICS = [
  'Konsultasi Strategis',
  'Kemitraan Infrastruktur',
  'Implementasi Sistem',
  'Lainnya',
];

$w.onReady(function () {
  initTopicDropdown();
  initForm();
  prefillFromQuery();
});

// ── Topic Dropdown ─────────────────────────────────────────

function initTopicDropdown() {
  try {
    $w('#topicSelect').options = TOPICS.map(t => ({ label: t, value: t }));
    $w('#topicSelect').value   = TOPICS[0];
  } catch (e) {}
}

// ── Pre-fill dari query param ──────────────────────────────
// Digunakan ketika user klik "Jadwalkan Demo" dari halaman Products
// URL: /contact?product=Muhammadiyah%20ID%20(MID)

function prefillFromQuery() {
  try {
    const query    = wixLocation.query;
    const product  = query.product;
    const topic    = query.topic;
    const industry = query.industry;

    // Set topic dari query param
    if (topic) {
      try { $w('#topicSelect').value = decodeURIComponent(topic); } catch (e) {}
    } else if (product) {
      try { $w('#topicSelect').value = 'Implementasi Sistem'; } catch (e) {}
    }

    // Pre-fill pesan
    if (product) {
      try {
        $w('#message').value = `Saya tertarik untuk mendiskusikan implementasi ${decodeURIComponent(product)}.`;
      } catch (e) {}
    } else if (industry) {
      try {
        $w('#message').value = `Saya tertarik untuk mendiskusikan solusi LabMu untuk sektor ${decodeURIComponent(industry)}.`;
      } catch (e) {}
    }
  } catch (e) {}
}

// ── Form Submit ────────────────────────────────────────────

function initForm() {
  try {
    $w('#btnSubmit').onClick(async () => {
      // Ambil nilai form
      const firstName   = getVal('#firstName');
      const lastName    = getVal('#lastName');
      const email       = getVal('#email');
      const institution = getVal('#institution');
      const topic       = getVal('#topicSelect');
      const message     = getVal('#message');

      // Validasi
      const errors = validateForm({ firstName, email, institution });
      if (errors.length) {
        showError(errors[0]);
        return;
      }

      // Disable button saat submit
      try { $w('#btnSubmit').disable(); } catch (e) {}
      hideMessages();

      try {
        // Pakai web module — validasi & insert di backend
        const result = await submitContactForm({
          firstName,
          lastName,
          email,
          institution,
          topic,
          message,
        });

        if (!result.success) {
          showError(result.message);
          try { $w('#btnSubmit').enable(); } catch (e) {}
          return;
        }

        showSuccess();
        resetForm();

      } catch (err) {
        console.error('Form submit error:', err);
        showError('Terjadi kesalahan. Silakan coba lagi.');
        try { $w('#btnSubmit').enable(); } catch (e) {}
      }
    });
  } catch (e) {}
}

// ── Validation ─────────────────────────────────────────────

function validateForm({ firstName, email, institution }) {
  const errors = [];

  if (!firstName.trim()) {
    errors.push('Nama depan wajib diisi.');
  }
  if (!email.trim() || !isValidEmail(email)) {
    errors.push('Email institusi tidak valid.');
  }
  if (!institution.trim()) {
    errors.push('Nama institusi wajib diisi.');
  }

  return errors;
}

// ── UI Helpers ─────────────────────────────────────────────

function getVal(selector) {
  try { return $w(selector).value || ''; } catch (e) { return ''; }
}

function showSuccess() {
  try {
    $w('#formSuccess').show('fade', { duration: 300 });
    $w('#formSuccess').scrollTo();
  } catch (e) {}
  try { $w('#btnSubmit').label = 'Terkirim ✓'; } catch (e) {}
}

function showError(msg) {
  try {
    $w('#formError').text = msg;
    $w('#formError').show('fade', { duration: 200 });
  } catch (e) {}
}

function hideMessages() {
  try { $w('#formSuccess').hide(); } catch (e) {}
  try { $w('#formError').hide(); } catch (e) {}
}

function resetForm() {
  ['#firstName', '#lastName', '#email', '#institution', '#message'].forEach(id => {
    try { $w(id).value = ''; } catch (e) {}
  });
  try { $w('#topicSelect').value = TOPICS[0]; } catch (e) {}
}
