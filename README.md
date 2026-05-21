# LabMu Website — Dokumentasi Teknis

> **Company Profile Website** untuk LabMu — Digital Infrastructure Ecosystem Muhammadiyah  
> Dibangun dengan **Wix Studio + Velo (wix-code)**  
> Repository: [github.com/alanramadhani2112/weblabmu](https://github.com/alanramadhani2112/weblabmu)

---

## Daftar Isi

1. [Gambaran Umum](#1-gambaran-umum)
2. [Struktur Project](#2-struktur-project)
3. [Design System](#3-design-system)
4. [Halaman & File Code](#4-halaman--file-code)
5. [CMS Collections](#5-cms-collections)
6. [Backend & API](#6-backend--api)
7. [Element IDs Reference](#7-element-ids-reference)
8. [Setup Guide](#8-setup-guide)
9. [Cara Import ke Wix Studio](#9-cara-import-ke-wix-studio)

---

## 1. Gambaran Umum

### Tech Stack
| Layer | Teknologi |
|---|---|
| Platform | Wix Studio |
| Code | Velo by Wix (JavaScript ES6+) |
| Database | Wix CMS (built-in) |
| Styling | CSS Custom Properties + Wix CSS |
| Font | Montserrat (Google Fonts) |
| Icons | Material Symbols Outlined |
| Version Control | GitHub |

### Fitur Utama
- **Dynamic Blog/News** — CMS-driven dengan search, filter, load more
- **Dynamic Products** — MID, SatuMu, MASA dengan detail page
- **Dynamic Use Cases** — Per industri (RS, Kampus, Fintech) dengan before/after
- **Dynamic Resources** — Whitepaper, Case Study, Article dengan download tracking
- **Contact Form** — Validasi frontend + backend, prefill dari query param
- **Newsletter** — Subscribe dengan duplicate check di backend
- **REST API** — HTTP endpoints untuk integrasi eksternal
- **SEO-ready** — Slug otomatis via data hooks

---

## 2. Struktur Project

```
weblabmu/
├── src/
│   ├── backend/
│   │   ├── data.js                  # Data hooks (auto-slug, sanitize)
│   │   ├── http-functions.js        # REST API endpoints
│   │   ├── newsService.web.js       # Web modules (callable dari frontend)
│   │   └── permissions.json         # CMS permissions
│   │
│   ├── pages/
│   │   ├── masterPage.js            # Global: navbar, mobile menu
│   │   ├── Home.c1dmp.js            # Homepage
│   │   ├── About Us.wscie.js        # About Us
│   │   ├── Products.bbpyn.js        # Products list
│   │   ├── FullData (Item).dbki7.js # Product detail (dynamic)
│   │   ├── Use Case.d12rq.js        # Use Cases list
│   │   ├── Use Case (Item).js       # Use Case detail (dynamic)
│   │   ├── News (List).eaf7k.js     # News/Resources list
│   │   ├── News (Item).uhwcv.js     # Article detail (dynamic)
│   │   ├── Resources.e16fu.js       # Resources page
│   │   └── Contact.js               # Contact form
│   │
│   └── public/
│       ├── utils.js                 # Shared utilities
│       └── styles/
│           └── global.css           # Design tokens & component styles
│
└── .wix/
    └── docs/
        ├── README-CMS.md            # CMS collections reference
        └── README-setup.md          # Setup guide detail
```

---

## 3. Design System

### Color Tokens (`global.css`)

| Token | Value | Penggunaan |
|---|---|---|
| `--color-primary` | `#000613` | Teks utama, background dark |
| `--color-on-primary` | `#ffffff` | Teks di atas primary |
| `--color-secondary` | `#006d31` | Accent hijau, after-card border |
| `--color-surface` | `#f9f9f9` | Background halaman |
| `--color-surface-container-low` | `#f3f3f3` | Card hover state |
| `--color-on-surface-variant` | `#43474e` | Body text, subtitle |
| `--color-outline-variant` | `#c4c6cf` | Border, divider |
| `--color-error` | `#ba1a1a` | Error state form |

### Typography Scale

| Token | Size | Weight | Penggunaan |
|---|---|---|---|
| `--text-headline-xl` | 64px | 700 | Hero title (desktop) |
| `--text-headline-xl-mobile` | 40px | 700 | Hero title (mobile) |
| `--text-headline-lg` | 32px | 600 | Section titles |
| `--text-headline-md` | 24px | 600 | Card titles |
| `--text-body-lg` | 18px | 400 | Lead paragraph |
| `--text-body-md` | 16px | 400 | Body text |
| `--text-label-md` | 14px | 300 | Nav links, buttons |
| `--text-label-sm` | 12px | 300 | Eyebrow, meta |

### Spacing

| Token | Value |
|---|---|
| `--space-section-gap` | 160px |
| `--space-margin-desktop` | 80px |
| `--space-margin-mobile` | 24px |
| `--space-gutter` | 32px |
| `--space-component-gap` | 24px |

---

## 4. Halaman & File Code

### masterPage.js
**Berlaku di semua halaman**

| Fungsi | Deskripsi |
|---|---|
| `setActiveNavLink()` | Highlight nav link berdasarkan URL path |
| `initContactButton()` | Navigasi ke `/contact` |
| `initMobileMenu()` | Toggle mobile menu dengan animasi fade |

### Home.c1dmp.js
**Route:** `/`

| Section | Fungsi | CMS |
|---|---|---|
| Hero | 2 CTA buttons | — |
| Resources Preview | 2 artikel terbaru | `News` |
| Newsletter | Subscribe form | `Subscribers` |
| Final CTA | Navigasi ke contact | — |

### About Us.wscie.js
**Route:** `/about-us`

| Section | Fungsi | CMS |
|---|---|---|
| Hero | CTA scroll ke story | — |
| Leadership | 4 team members (CMS atau static fallback) | `Team` |
| Partners | Logo strip | `Partners` |

**Static fallback leadership:**
- Dr. Ahmad Faisal — CEO
- Siti Rahmawati — CBO
- Budi Santoso — VP Engineering
- Aisha Putri — VP Operations

### Products.bbpyn.js
**Route:** `/products`

| Section | Fungsi | CMS |
|---|---|---|
| Product Cards | MID, SatuMu, MASA (static + optional repeater) | `Products` |
| Advantage Cards | 4 cards static | — |
| CTA | Navigasi ke contact | — |

**Static products:**
```js
{ id: 'mid',    number: '01', category: 'IDENTITY',    slug: 'muhammadiyah-id' }
{ id: 'satumu', number: '02', category: 'INTEGRATION', slug: 'satumu' }
{ id: 'masa',   number: '03', category: 'ANALYTICS',   slug: 'masa' }
```

### FullData (Item).dbki7.js
**Route:** `/products/{slug}` — Dynamic page

| Section | Fungsi |
|---|---|
| Header | Eyebrow "01 / IDENTITY", title, description |
| Cover Image | Hide jika kosong |
| Content | Rich text body |
| Features | Repeater bullet points (hide jika kosong) |
| Related Products | 3 produk lain |
| CTA | Navigasi ke `/contact?product={name}` |

### Use Case.d12rq.js
**Route:** `/use-case`

| Section | Fungsi | CMS |
|---|---|---|
| Hero | 2 CTA buttons | — |
| Industries | RS, Kampus, Fintech (static fallback + CMS) | `UseCases` |
| Per industri | Workflow + Before/After | `UseCases` |

### Use Case (Item).js
**Route:** `/use-case/{slug}` — Dynamic page

| Section | Fungsi |
|---|---|
| Header | Industry badge, title, subtitle, client |
| Hero Image | 21:9, hide jika kosong |
| Workflow | Ecosystem workflow description |
| Before/After | 2-col cards dengan green border di After |
| Results | Metrics/outcomes (hide jika kosong) |
| Sidebar | Industry, client, key metric, CTA |
| Related | 3 use case lain |

### News (List).eaf7k.js
**Route:** `/news`

| Fitur | Deskripsi |
|---|---|
| Featured | Item pertama sebagai hero card |
| Grid | 9 per page, editorial style |
| Search | Debounced 400ms, filter by title |
| Filter | By type/category via dropdown |
| Load More | Append pagination |
| Result Count | "Menampilkan X dari Y artikel" |

### News (Item).uhwcv.js
**Route:** `/news/{slug}` — Dynamic page

| Section | Fungsi |
|---|---|
| Header | Type badge, title, subtitle, author, date, reading time |
| Hero Image | 21:9 |
| Article Body | Rich text dengan editorial styling |
| Table of Contents | Auto-parse h2 headings dari content |
| Sidebar CTA | Dark box dengan download button |
| Related | 3 artikel dari kategori sama |
| Share | Facebook, Twitter, LinkedIn, copy link |

### Resources.e16fu.js
**Route:** `/resources`

| Section | Fungsi |
|---|---|
| Featured | Hero card (8-col) + 3 sidebar items |
| Library Grid | 3-col cards dengan type badge + date |
| Newsletter | Subscribe form |

### Contact.js
**Route:** `/contact`

| Fitur | Deskripsi |
|---|---|
| Form Fields | Nama, Email, Institusi, Topik, Pesan |
| Validasi | Frontend + backend (via web module) |
| Prefill | `?product=xxx` atau `?industry=xxx` dari halaman lain |
| Topics | Konsultasi Strategis, Kemitraan, Implementasi, Lainnya |
| Success State | Show success message, reset form |

---

## 5. CMS Collections

### News
| Field | Type | Keterangan |
|---|---|---|
| title | Text | Required |
| slug | Text | Auto via data hook |
| excerpt | Long Text | Max 200 chars |
| content | Rich Text | Full body |
| coverImage | Image | |
| type | Text | Whitepaper / Article / Case Study / Research |
| category | Text | Kesehatan / Pendidikan / dll |
| author | Text | |
| publishedDate | Date & Time | |
| status | Text | `draft` / `published` |

### Products
| Field | Type | Keterangan |
|---|---|---|
| title | Text | Required |
| slug | Text | Auto via data hook |
| number | Text | "01", "02", "03" |
| description | Long Text | |
| content | Rich Text | Detail page body |
| coverImage | Image | |
| category | Text | IDENTITY / INTEGRATION / ANALYTICS |
| features | Tags | Bullet points |
| order | Number | Sort order |
| featured | Boolean | Tampil di homepage |

**Seed data wajib:**
```
1. Muhammadiyah ID (MID) — 01 — IDENTITY — order: 1
2. SatuMu               — 02 — INTEGRATION — order: 2
3. MASA                 — 03 — ANALYTICS — order: 3
```

### UseCases
| Field | Type | Keterangan |
|---|---|---|
| title | Text | Required |
| slug | Text | Auto via data hook |
| description | Long Text | Deskripsi singkat |
| workflowDesc | Long Text | Ecosystem Workflow |
| beforeDesc | Long Text | Kondisi sebelum |
| afterDesc | Long Text | Kondisi sesudah |
| results | Long Text | Metrics/outcomes |
| client | Text | Nama institusi |
| coverImage | Image | |
| industry | Text | Rumah Sakit / Kampus / Fintech |
| order | Number | |
| featured | Boolean | |

**Seed data wajib:**
```
1. Rumah Sakit    — industry: Rumah Sakit — order: 1
2. Kampus & Sekolah — industry: Kampus — order: 2
3. Fintech        — industry: Fintech — order: 3
```

### Resources
| Field | Type | Keterangan |
|---|---|---|
| title | Text | Required |
| slug | Text | Auto via data hook |
| excerpt | Long Text | Preview text |
| description | Long Text | |
| coverImage | Image | |
| type | Text | Whitepaper / Case Study / Article / Research |
| fileUrl | URL | Link download PDF |
| downloadCount | Number | Auto-increment |
| publishedDate | Date & Time | |
| status | Text | `draft` / `published` |
| featured | Boolean | |

### Team
| Field | Type |
|---|---|
| name | Text |
| role | Text |
| photo | Image |
| bio | Long Text |
| linkedIn | URL |
| order | Number |

### Subscribers
| Field | Type | Permission |
|---|---|---|
| email | Text | Anyone insert |
| subscribedAt | Date & Time | Admin read |
| source | Text | Admin read |

### ContactSubmissions
| Field | Type | Permission |
|---|---|---|
| firstName | Text | Anyone insert |
| lastName | Text | Anyone insert |
| email | Text | Anyone insert |
| institution | Text | Anyone insert |
| topic | Text | Anyone insert |
| message | Long Text | Anyone insert |
| submittedAt | Date & Time | Admin read |

---

## 6. Backend & API

### Web Modules (`newsService.web.js`)
Callable dari page code via `import { fn } from 'backend/newsService.web.js'`

| Function | Parameter | Return |
|---|---|---|
| `getLatestNews(limit)` | limit: number (default 3) | `News[]` |
| `getNewsBySlug(slug)` | slug: string | `News \| null` |
| `getRelatedNews(category, excludeId, limit)` | — | `News[]` |
| `subscribeNewsletter(email, source)` | — | `{ success, message }` |
| `submitContactForm(formData)` | firstName, lastName, email, institution, topic, message | `{ success, message }` |

### HTTP Endpoints (`http-functions.js`)
Base URL: `https://yoursite.com/_functions/`

| Method | Endpoint | Parameter | Deskripsi |
|---|---|---|---|
| GET | `/news` | `?limit=10&skip=0&type=Whitepaper` | List published news |
| GET | `/newsItem` | `?slug=artikel-slug` | Single news by slug |
| GET | `/products` | — | All products |
| POST | `/contact` | body: `{ firstName, email, institution, ... }` | Submit contact form |
| POST | `/subscribe` | body: `{ email, source }` | Subscribe newsletter |

### Data Hooks (`data.js`)
Berjalan otomatis saat operasi CMS:

| Hook | Fungsi |
|---|---|
| `News_beforeInsert` | Auto-generate slug, set publishedDate, default status: draft |
| `News_beforeUpdate` | Update slug jika title berubah |
| `Products_beforeInsert` | Auto-generate slug |
| `UseCases_beforeInsert` | Auto-generate slug |
| `Resources_beforeInsert` | Auto-generate slug, default downloadCount: 0 |
| `Subscribers_beforeInsert` | Cek duplicate email |
| `ContactSubmissions_beforeInsert` | Trim semua string fields |

### Import Pattern
```js
// ✅ Wix built-in API
import wixData     from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow   from 'wix-window';

// ✅ Public utilities
import { formatDate, truncateText, isValidEmail } from 'public/utils.js';

// ✅ Backend web module (callable dari frontend)
import { getLatestNews, subscribeNewsletter } from 'backend/newsService.web.js';

// ❌ JANGAN — path relatif tidak valid di Velo
import { fn } from './public/utils.js';

// ❌ JANGAN — require() tidak didukung
const wixData = require('wix-data');
```

---

## 7. Element IDs Reference

### masterPage.js (semua halaman)
```
#navbar           — navbar container
#logoText         — "LabMu" logo
#navHome          — nav link Home
#navAbout         — nav link About Us
#navProducts      — nav link Products
#navUseCases      — nav link Use Cases
#navResources     — nav link Resources
#btnContact       — "Hubungi Kami" button
#btnMobileMenu    — hamburger icon
#mobileMenuBox    — mobile menu container
```

### Home.c1dmp.js
```
#btnHeroDemo      — "Jadwalkan Demo"
#btnHeroExplore   — "Jelajahi Ekosistem"
#resourcesRepeater
  #resCard        — clickable container
  #resCoverImage  — cover image
  #resEyebrow     — "Type • Date"
  #resTitle       — title
  #resExcerpt     — excerpt
#btnViewAllRes    — "Lihat Semua"
#newsletterEmail  — email input
#btnNewsletterSub — subscribe button
#btnFinalCTA      — final CTA button
```

### Products.bbpyn.js
```
#cardMid / #cardSatumu / #cardMasa  — product cards
#btnMidDetail / #btnSatumuDetail / #btnMasaDetail
#productsRepeater (opsional)
  #productNumber / #productCategory / #productTitle / #productDesc / #productCard
#btnFinalCTA
```

### FullData (Item).dbki7.js
```
#dynamicDataset   — connect ke Products
#breadcrumbParent — "Products" link
#breadcrumbCurrent
#itemEyebrow      — "01 / IDENTITY"
#itemTitle / #itemDescription / #itemCoverImage / #itemContent
#featuresSection → #featuresRepeater → #featureText
#relatedSection  → #relatedRepeater
  #relatedCard / #relatedEyebrow / #relatedTitle / #relatedDesc
#btnBack / #btnCTA
```

### Use Case (Item).js
```
#dynamicDataset   — connect ke UseCases
#breadcrumbParent — "Use Cases" link
#industryBadge / #articleTitle / #articleSubtitle
#clientName / #clientLabel
#heroImage / #heroImageContainer
#workflowSection → #workflowDesc
#beforeAfterSection → #beforeDesc / #afterDesc
#resultsSection → #itemResults
#articleContent
#sidebarIndustry / #sidebarClient / #sidebarResults
#btnSidebarCTA
#relatedContainer → #relatedRepeater
  #relatedCard / #relatedType / #relatedTitle
#btnBack / #btnCTA
```

### News (List).eaf7k.js
```
#featuredCard → #featuredImage / #featuredEyebrow / #featuredTitle / #featuredExcerpt
#newsRepeater
  #newsCard / #newsCoverImage / #newsEyebrow / #newsTitle / #newsExcerpt
#searchInput / #categoryFilter
#btnLoadMore / #loadMoreContainer
#noResultsText / #loadingSpinner / #resultCount
```

### News (Item).uhwcv.js
```
#dynamicDataset   — connect ke News
#breadcrumbParent / #breadcrumbCategory
#typeBadge / #articleTitle / #articleSubtitle
#articleAuthor / #articleDate / #readingTime
#heroImage / #heroImageContainer
#articleContent
#tocContainer → #tocRepeater → #tocLink
#btnDownload
#btnSidebarCTA
#relatedContainer → #relatedRepeater
  #relatedCard / #relatedType / #relatedTitle
#btnShareFB / #btnShareTW / #btnShareLI / #btnCopyLink / #copyConfirm
#btnBackToList
```

### Resources.e16fu.js
```
#featuredCard → #featuredImage / #featuredType / #featuredTitle / #featuredExcerpt
#sidebarRepeater → #sidebarCard / #sidebarType / #sidebarTitle / #sidebarExcerpt
#libraryRepeater → #libCard / #libType / #libTitle / #libExcerpt / #libDate
#btnViewAll
#newsletterEmail / #btnNewsletterSub
```

### Contact.js
```
#firstName / #lastName / #email / #institution
#topicSelect / #message
#btnSubmit
#formSuccess / #formError
```

---

## 8. Setup Guide

### Urutan Setup

```
Step 1  → Buat site baru di Wix Studio (blank)
Step 2  → Buat 7 halaman statis
Step 3  → Buat 7 CMS collections
Step 4  → Buat 3 dynamic pages dari CMS
Step 5  → Isi seed data (Products + UseCases)
Step 6  → Connect GitHub → sync code
Step 7  → Set Element IDs di setiap halaman
Step 8  → Connect dynamic datasets
Step 9  → Preview & test
Step 10 → Publish
```

### Dynamic Pages yang Perlu Dibuat
| Collection | URL Pattern | File Code |
|---|---|---|
| News | `/news/{slug}` | `News (Item).uhwcv.js` |
| Products | `/products/{slug}` | `FullData (Item).dbki7.js` |
| UseCases | `/use-case/{slug}` | `Use Case (Item).js` |

### Cara Connect Dynamic Dataset
1. Buka halaman dynamic di Editor
2. **+** → **Dataset** → pilih collection
3. Mode: **Read**
4. ID: `#dynamicDataset`

---

## 9. Cara Import ke Wix Studio

### Connect GitHub
1. Wix Studio → **Settings** → **Developer Tools** → **Git Integration**
2. **Connect to GitHub** → authorize
3. Pilih repo: `alanramadhani2112/weblabmu`
4. Branch: `main`
5. Klik **Connect**

Wix akan otomatis sync setiap kali ada push ke branch `main`.

### Update Code
```bash
# Edit file di local
git add .
git commit -m "fix: update homepage CTA"
git push
# Wix sync otomatis dalam ~30 detik
```

### Catatan Penting
- **Jangan rename** file pages (nama seperti `Home.c1dmp.js` di-generate Wix)
- **Jangan buat** file pages baru dari IDE — harus dari Wix Editor dulu
- File baru di `backend/` dan `public/` bisa dibuat langsung dari IDE
- `Use Case (Item).js` perlu di-assign manual ke dynamic page yang dibuat dari CMS

---

## Utilities Reference (`public/utils.js`)

| Function | Parameter | Return | Contoh |
|---|---|---|---|
| `formatDate(date)` | Date/string | string | `"21 Mei 2026"` |
| `truncateText(text, limit)` | string, number | string | `"Lorem ipsum..."` |
| `slugify(str)` | string | string | `"judul-artikel"` |
| `debounce(fn, delay)` | Function, ms | Function | Search input |
| `isValidEmail(email)` | string | boolean | Form validation |
| `buildDynamicUrl(base, slug)` | string, string | string | `"/news/slug"` |
| `chunkArray(arr, size)` | Array, number | Array[] | Grid layout |

---

*Dokumentasi ini di-generate bersama Kiro AI — last updated: Mei 2026*
