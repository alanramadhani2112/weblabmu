/**
 * masterPage.js — Global code for all pages
 *
 * Handles:
 *  - Navbar backdrop blur on scroll
 *  - Active nav link highlight based on current URL
 *  - Mobile menu toggle
 *  - "Hubungi Kami" CTA button
 *
 * Wix Element IDs (set these in Wix Editor):
 *  #navbar              — navbar container strip
 *  #logoText            — LabMu logo text
 *  #navHome             — nav link: Home
 *  #navAbout            — nav link: About Us
 *  #navProducts         — nav link: Products
 *  #navUseCases         — nav link: Use Cases
 *  #navResources        — nav link: Resources
 *  #btnContact          — "Hubungi Kami" button
 *  #btnMobileMenu       — hamburger button (mobile)
 *  #mobileMenuBox       — mobile menu container
 */

import wixLocation from 'wix-location';

$w.onReady(function () {
  setActiveNavLink();
  initContactButton();
  initMobileMenu();
});

// ── Active Nav Link ────────────────────────────────────────

function setActiveNavLink() {
  const path = wixLocation.path;
  // path[0] is the first segment, e.g. 'about-us', 'products', etc.
  const current = (path[0] || '').toLowerCase();

  const navMap = {
    '#navHome':      '',
    '#navAbout':     'about-us',
    '#navProducts':  'products',
    '#navUseCases':  'use-case',
    '#navResources': 'resources',
    '#navNews':      'news',
  };

  Object.entries(navMap).forEach(([selector, segment]) => {
    try {
      const el = $w(selector);
      if (current === segment) {
        // Active state: primary color + bottom border via custom CSS class
        el.style.color = '#000613';
        el.style.fontWeight = '600';
        el.style.borderBottom = '2px solid #000613';
      } else {
        el.style.color = '#43474e';
        el.style.fontWeight = '300';
        el.style.borderBottom = 'none';
      }
    } catch (e) {
      // Element may not exist on this page
    }
  });
}

// ── Contact Button ─────────────────────────────────────────

function initContactButton() {
  try {
    $w('#btnContact').onClick(() => {
      wixLocation.to('/contact');
    });
  } catch (e) {}
}

// ── Mobile Menu ────────────────────────────────────────────

function initMobileMenu() {
  try {
    let menuOpen = false;

    $w('#btnMobileMenu').onClick(() => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        $w('#mobileMenuBox').show('fade', { duration: 200 });
        $w('#btnMobileMenu').label = '✕';
      } else {
        $w('#mobileMenuBox').hide('fade', { duration: 200 });
        $w('#btnMobileMenu').label = '☰';
      }
    });

    // Close on any mobile nav link click
    const mobileLinks = [
      '#mobileNavHome', '#mobileNavAbout', '#mobileNavProducts',
      '#mobileNavUseCases', '#mobileNavResources', '#mobileNavNews',
    ];

    mobileLinks.forEach(id => {
      try {
        $w(id).onClick(() => {
          $w('#mobileMenuBox').hide('fade', { duration: 200 });
          $w('#btnMobileMenu').label = '☰';
          menuOpen = false;
        });
      } catch (e) {}
    });
  } catch (e) {}
}
