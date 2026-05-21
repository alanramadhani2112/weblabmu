# LabMu Website — Setup Guide

Panduan lengkap untuk setup project ini di Wix Studio.

---

## 1. Urutan Setup

```
1. Buat semua halaman di Wix Editor
2. Buat CMS Collections
3. Connect GitHub → clone → copy code
4. Set Element IDs di setiap halaman
5. Connect Dynamic Datasets
6. Test di Preview
```

---

## 2. Halaman yang Perlu Dibuat di Wix Editor

| Halaman          | File Code                    | URL Path      |
|------------------|------------------------------|---------------|
| Home             | `Home.c1dmp.js`              | `/`           |
| About Us         | `About Us.wscie.js`          | `/about-us`   |
| Products         | `Products.bbpyn.js`          | `/products`   |
| Use Cases        | `Use Case.d12rq.js`          | `/use-case`   |
| Resources        | `Resources.e16fu.js`         | `/resources`  |
| Contact          | `Contact.js`                 | `/contact`    |
| News List        | `News (List).eaf7k.js`       | `/news`       |
| News Item        | `News (Item).uhwcv.js`       | `/news/{slug}`|
| Product Detail   | `FullData (Item).dbki7.js`   | `/products/{slug}` |

---

## 3. CMS Collections

Buat di **Wix Studio → CMS → New Collection**:

### News
| Field         | Type        | Notes                        |
|---------------|-------------|------------------------------|
| title         | Text        | Required                     |
| slug          | Text        | Auto via data hook           |
| excerpt       | Long Text   | Max 200 chars                |
| content       | Rich Text   | Full body                    |
| coverImage    | Image       |                              |
| type          | Text        | Whitepaper / Article / dll   |
| category      | Text        | Kesehatan / Pendidikan / dll |
| author        | Text        |                              |
| authorPhoto   | Image       | Optional                     |
| tags          | Tags        | Multi-value                  |
| publishedDate | Date & Time |                              |
| status        | Text        | `draft` / `published`        |

### Products
| Field       | Type      | Notes                              |
|-------------|-----------|-------------------------------------|
| title       | Text      | e.g. "Muhammadiyah ID (MID)"        |
| slug        | Text      | Auto via data hook                  |
| number      | Text      | "01", "02", "03"                    |
| description | Long Text |                                     |
| content     | Rich Text | Detail page body                    |
| icon        | Image     | SVG/PNG                             |
| coverImage  | Image     |                                     |
| category    | Text      | IDENTITY / INTEGRATION / ANALYTICS  |
| features    | Tags      | Bullet points                       |
| order       | Number    | 1, 2, 3                             |
| featured    | Boolean   | Tampil di homepage                  |

**Seed data:**
1. title: "Muhammadiyah ID (MID)", number: "01", category: "IDENTITY", order: 1
2. title: "SatuMu", number: "02", category: "INTEGRATION", order: 2
3. title: "MASA", number: "03", category: "ANALYTICS", order: 3

### UseCases
| Field        | Type      | Notes                              |
|--------------|-----------|-------------------------------------|
| title        | Text      | e.g. "Rumah Sakit"                  |
| slug         | Text      | Auto via data hook                  |
| description  | Long Text | Deskripsi singkat industri          |
| workflowDesc | Long Text | Ecosystem Workflow description      |
| beforeDesc   | Long Text | Kondisi sebelum                     |
| afterDesc    | Long Text | Kondisi sesudah (Operational Impact)|
| icon         | Text      | Material Symbol name, e.g. "local_hospital" |
| industry     | Text      | Rumah Sakit / Kampus / Fintech      |
| client       | Text      | Nama institusi (opsional)           |
| results      | Long Text | Metrics / outcomes                  |
| coverImage   | Image     |                                     |
| order        | Number    | 1, 2, 3                             |
| featured     | Boolean   | Tampil sebagai hero                 |

**Seed data:**
1. title: "Rumah Sakit", industry: "Rumah Sakit", order: 1
2. title: "Kampus & Sekolah", industry: "Kampus", order: 2
3. title: "Fintech", industry: "Fintech", order: 3

### Resources
| Field         | Type        | Notes                          |
|---------------|-------------|--------------------------------|
| title         | Text        | Required                       |
| slug          | Text        | Auto via data hook             |
| excerpt       | Long Text   | Short preview                  |
| description   | Long Text   | Full description               |
| coverImage    | Image       |                                |
| type          | Text        | Whitepaper / Case Study / Article / Research |
| fileUrl       | URL         | Link download PDF (opsional)   |
| downloadCount | Number      | Auto-incremented               |
| publishedDate | Date & Time |                                |
| status        | Text        | `draft` / `published`          |
| featured      | Boolean     | Tampil sebagai hero            |

### Team
| Field    | Type      | Notes      |
|----------|-----------|------------|
| name     | Text      | Required   |
| role     | Text      |            |
| photo    | Image     |            |
| bio      | Long Text |            |
| linkedIn | URL       | Optional   |
| order    | Number    |            |

**Seed data (dari wireframe):**
1. Dr. Ahmad Faisal — Chief Executive Officer
2. Siti Rahmawati — Chief Business Officer
3. Budi Santoso — VP of Engineering
4. Aisha Putri — VP of Operations

### Partners
| Field | Type   | Notes      |
|-------|--------|------------|
| name  | Text   | Required   |
| logo  | Image  |            |
| url   | URL    | Optional   |
| order | Number |            |

### Subscribers
| Field       | Type        | Notes                    |
|-------------|-------------|--------------------------|
| email       | Text        | Required, unique         |
| subscribedAt| Date & Time | Auto-set                 |
| source      | Text        | homepage / resources / api |

**Permissions:** Anyone can insert, Admin only can read

### ContactSubmissions
| Field       | Type        | Notes          |
|-------------|-------------|----------------|
| firstName   | Text        | Required       |
| lastName    | Text        |                |
| email       | Text        | Required       |
| institution | Text        | Required       |
| topic       | Text        |                |
| message     | Long Text   |                |
| submittedAt | Date & Time | Auto-set       |

**Permissions:** Anyone can insert, Admin only can read

---

## 4. Element IDs per Halaman

### masterPage.js (semua halaman)
```
#navbar           — navbar strip/container
#logoText         — "LabMu" logo text
#navHome          — nav link Home
#navAbout         — nav link About Us
#navProducts      — nav link Products
#navUseCases      — nav link Use Cases
#navResources     — nav link Resources
#navNews          — nav link News (opsional)
#btnContact       — "Hubungi Kami" button
#btnMobileMenu    — hamburger icon (mobile)
#mobileMenuBox    — mobile menu container
#mobileNavHome    — mobile nav link Home
#mobileNavAbout   — mobile nav link About
#mobileNavProducts— mobile nav link Products
#mobileNavUseCases— mobile nav link Use Cases
#mobileNavResources— mobile nav link Resources
```

### Home.c1dmp.js
```
#btnHeroDemo      — "Jadwalkan Demo" button
#btnHeroExplore   — "Jelajahi Ekosistem" button
#heroImage        — hero image
#ecosystemImage   — M-ID network diagram
#resourcesRepeater— repeater (2 artikel)
  #resCard        — clickable container
  #resCoverImage  — cover image
  #resEyebrow     — "Type • Date" text
  #resTitle       — title
  #resExcerpt     — excerpt
#btnViewAllRes    — "Lihat Semua" link
#newsletterEmail  — email input
#btnNewsletterSub — "Daftar Sekarang" button
#btnFinalCTA      — "Hubungi Tim Enterprise LabMu"
```

### Products.bbpyn.js
```
#cardMid          — MID card container
#cardSatumu       — SatuMu card container
#cardMasa         — MASA card container
#btnMidDetail     — MID detail button
#btnSatumuDetail  — SatuMu detail button
#btnMasaDetail    — MASA detail button
#btnFinalCTA      — "Diskusi dengan Kami"
#productsSection  — products section (untuk scroll)
```

### About Us.wscie.js
```
#btnHeroCTA         — "Discover Our Story"
#storySection       — brand story section
#leadershipRepeater — repeater team (atau static):
  #memberPhoto      — image
  #memberName       — name text
  #memberRole       — role text
#memberPhoto1..4    — static fallback
#memberName1..4     — static fallback
#memberRole1..4     — static fallback
#partnersSection    — hide if no partners
#partnersRepeater   — repeater partners
  #partnerLogo      — logo image
  #partnerCard      — clickable container
```

### Use Case.d12rq.js
```
#btnHeroPrimary     — "Lihat Studi Kasus"
#btnHeroSecondary   — "Konsultasi"
#heroImage          — hero image
#sectionHospital    — Rumah Sakit section
#sectionCampus      — Kampus section
#sectionFintech     — Fintech section
#workflowDescHospital — workflow text
#beforeDescHospital   — before text
#afterDescHospital    — after text
(sama untuk Campus dan Fintech)
#btnCTA             — bottom CTA
```

### Resources.e16fu.js
```
#featuredCard       — featured article (clickable)
#featuredImage      — cover image
#featuredType       — "WHITEPAPER • 12 MIN READ"
#featuredTitle      — title
#featuredExcerpt    — excerpt
#sidebarRepeater    — 3 sidebar items
  #sidebarCard      — clickable
  #sidebarType      — type label
  #sidebarTitle     — title
  #sidebarExcerpt   — excerpt
#libraryRepeater    — library grid
  #libCard          — clickable
  #libType          — type badge
  #libTitle         — title
  #libExcerpt       — excerpt
  #libDate          — date
#btnViewAll         — "View All"
#newsletterEmail    — email input
#btnNewsletterSub   — "Subscribe"
```

### Contact.js
```
#firstName          — text input
#lastName           — text input
#email              — email input
#institution        — text input
#topicSelect        — dropdown
#message            — textarea
#btnSubmit          — "Jadwalkan Pertemuan"
#formSuccess        — success message (hidden default)
#formError          — error message (hidden default)
```

### News (List).eaf7k.js
```
#featuredCard       — featured article hero
#featuredImage      — image
#featuredEyebrow    — "Type • Date"
#featuredTitle      — title
#featuredExcerpt    — excerpt
#newsRepeater       — article grid
  #newsCard         — clickable
  #newsCoverImage   — image
  #newsEyebrow      — eyebrow
  #newsTitle        — title
  #newsExcerpt      — excerpt
#searchInput        — search text input
#categoryFilter     — dropdown filter
#btnLoadMore        — load more button
#loadMoreContainer  — wrapper (hide when no more)
#noResultsText      — empty state
#loadingSpinner     — loading indicator
#resultCount        — "Menampilkan X dari Y"
```

### News (Item).uhwcv.js
```
#dynamicDataset     — dataset (connect ke News)
#breadcrumbCurrent  — current page title
#articleEyebrow     — "Type • Date"
#articleTitle       — h1
#articleAuthor      — author name
#authorPhoto        — author photo
#readingTime        — "X menit baca"
#coverImage         — cover image
#articleContent     — HTML/rich text
#tagsContainer      — tags wrapper (hide if no tags)
#tagsRepeater       — tags repeater
  #tagLabel         — tag text
#btnShareFB         — Facebook share
#btnShareTW         — Twitter share
#btnShareLI         — LinkedIn share
#btnCopyLink        — copy link
#copyConfirm        — "Link disalin!" (hidden default)
#relatedSection     — hide if no related
#relatedRepeater    — related articles
  #relatedCard      — clickable
  #relatedCover     — image
  #relatedEyebrow   — eyebrow
  #relatedTitle     — title
#btnBackToList      — back to /news
```

### FullData (Item).dbki7.js
```
#dynamicDataset     — dataset (connect ke Products/UseCases)
#breadcrumbParent   — parent link (clickable)
#breadcrumbCurrent  — current title
#itemNumber         — "01 / IDENTITY"
#itemCategory       — category badge
#itemTitle          — h1
#itemDescription    — description text
#itemCoverImage     — cover image
#itemContent        — rich text body
#featuresSection    — hide if no features
#featuresRepeater   — features list
  #featureText      — feature item
#resultsSection     — hide if no results
#itemResults        — results text
#clientSection      — hide if no client
#itemClient         — client name
#relatedSection     — hide if no related
#relatedRepeater    — related items
  #relatedCard      — clickable
  #relatedNumber    — "01"
  #relatedCategory  — category
  #relatedTitle     — title
  #relatedDesc      — short desc
#btnBack            — back button
#btnCTA             — "Jadwalkan Demo"
```

---

## 5. Dynamic Pages Setup

1. Buka **CMS** → hover collection → **Add Dynamic Page**
2. Pilih **Item Page** → URL pattern: `/{slug}`
3. Connect dataset ke collection
4. Sync dengan Wix IDE

Dynamic pages yang perlu dibuat:
- `News` → `/news/{slug}` → file: `News (Item).uhwcv.js`
- `Products` → `/products/{slug}` → file: `FullData (Item).dbki7.js`
- `UseCases` → `/use-case/{slug}` → file: `FullData (Item).dbki7.js`

---

## 6. HTTP API Endpoints

Setelah deploy, endpoints tersedia di:

```
GET  https://yoursite.com/_functions/news
GET  https://yoursite.com/_functions/news?limit=5&skip=0&type=Whitepaper
GET  https://yoursite.com/_functions/newsItem?slug=artikel-slug
GET  https://yoursite.com/_functions/products
POST https://yoursite.com/_functions/contact
POST https://yoursite.com/_functions/subscribe
```

---

## 7. File Structure

```
src/
├── backend/
│   ├── data.js                 — Data hooks (auto-slug, sanitize)
│   ├── http-functions.js       — REST API endpoints
│   ├── newsService.web.js      — Web modules (callable dari frontend)
│   └── permissions.json        — CMS permissions
├── pages/
│   ├── masterPage.js           — Global: navbar, mobile menu
│   ├── Home.c1dmp.js           — Homepage
│   ├── About Us.wscie.js       — About Us
│   ├── Products.bbpyn.js       — Products list
│   ├── Use Case.d12rq.js       — Use Cases
│   ├── Resources.e16fu.js      — Resources / Jurnal
│   ├── Contact.js              — Contact form
│   ├── News (List).eaf7k.js    — News list
│   ├── News (Item).uhwcv.js    — News detail (dynamic)
│   └── FullData (Item).dbki7.js— Product/UseCase detail (dynamic)
└── public/
    ├── utils.js                — Shared utilities
    └── styles/
        └── global.css          — Design tokens & base styles
```
