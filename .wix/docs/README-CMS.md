# CMS Collections — LabMu Website

Buat collections berikut di **Wix CMS** (Studio Editor → CMS → New Collection).

---

## 1. News
**Collection ID:** `News`
**Dynamic Page:** `/news/{slug}`

| Field          | Type        | Notes                          |
|----------------|-------------|--------------------------------|
| title          | Text        | Required                       |
| slug           | Text        | Auto-generated via data hook   |
| excerpt        | Long Text   | Preview text (max 200 chars)   |
| content        | Rich Text   | Full article body              |
| coverImage     | Image       |                                |
| type           | Text        | Whitepaper, Case Study, dll    |
| category       | Text        | Kesehatan, Pendidikan, dll     |
| author         | Text        |                                |
| authorPhoto    | Image       | Optional                       |
| tags           | Tags        | Multi-value                    |
| publishedDate  | Date & Time |                                |
| status         | Text        | `draft` / `published`          |

---

## 2. Products
**Collection ID:** `Products`
**Dynamic Page:** `/products/{slug}`

| Field       | Type      | Notes                                        |
|-------------|-----------|----------------------------------------------|
| title       | Text      | Required. e.g. "Muhammadiyah ID (MID)"       |
| slug        | Text      | Auto-generated. e.g. "muhammadiyah-id"       |
| number      | Text      | Display number. e.g. "01"                    |
| description | Long Text |                                              |
| content     | Rich Text | Full detail page content                     |
| icon        | Image     | SVG/PNG icon                                 |
| coverImage  | Image     |                                              |
| category    | Text      | IDENTITY / INTEGRATION / ANALYTICS           |
| features    | Tags      | Multi-value bullet points                    |
| order       | Number    | Sort order (1, 2, 3)                         |
| featured    | Boolean   | Tampil di homepage                           |

**Seed data (isi manual):**
1. title: "Muhammadiyah ID (MID)", number: "01", category: "IDENTITY", order: 1
2. title: "SatuMu", number: "02", category: "INTEGRATION", order: 2
3. title: "MASA", number: "03", category: "ANALYTICS", order: 3

---

## 3. UseCases
**Collection ID:** `UseCases`
**Dynamic Page:** `/use-case/{slug}`

| Field       | Type      | Notes                    |
|-------------|-----------|--------------------------|
| title       | Text      | Required                 |
| slug        | Text      | Auto-generated           |
| description | Long Text |                          |
| coverImage  | Image     |                          |
| industry    | Text      | Kesehatan, Pendidikan... |
| client      | Text      | Nama institusi           |
| results     | Long Text | Metrics / outcomes       |
| order       | Number    |                          |
| featured    | Boolean   | Tampil sebagai hero      |

---

## 4. Resources
**Collection ID:** `Resources`
**Dynamic Page:** `/resources/{slug}`

| Field         | Type        | Notes                          |
|---------------|-------------|--------------------------------|
| title         | Text        | Required                       |
| slug          | Text        | Auto-generated                 |
| description   | Long Text   |                                |
| excerpt       | Long Text   | Short preview                  |
| coverImage    | Image       |                                |
| type          | Text        | Whitepaper, Case Study, Guide  |
| fileUrl       | URL         | Link download PDF              |
| downloadCount | Number      | Auto-incremented               |
| publishedDate | Date & Time |                                |
| status        | Text        | `draft` / `published`          |
| featured      | Boolean     | Tampil sebagai hero            |

---

## 5. Team
**Collection ID:** `Team`

| Field    | Type      | Notes          |
|----------|-----------|----------------|
| name     | Text      | Required       |
| role     | Text      |                |
| photo    | Image     |                |
| bio      | Long Text |                |
| linkedIn | URL       | Optional       |
| order    | Number    | Sort order     |

---

## 6. Partners
**Collection ID:** `Partners`

| Field | Type   | Notes      |
|-------|--------|------------|
| name  | Text   | Required   |
| logo  | Image  |            |
| url   | URL    | Optional   |
| order | Number | Sort order |

---

## 7. Subscribers
**Collection ID:** `Subscribers`
**Permissions:** Anyone can insert, only Admin can read

| Field       | Type        | Notes                              |
|-------------|-------------|------------------------------------|
| email       | Text        | Required, unique                   |
| subscribedAt| Date & Time | Auto-set via data hook             |
| source      | Text        | `homepage-newsletter`, dll         |

---

## Dynamic Pages Setup

1. Buka **CMS** di Wix Studio
2. Hover collection → **Add Dynamic Page**
3. Pilih **Item Page** → set URL pattern ke `/{slug}`
4. Connect dataset ke collection
5. Sync dengan Wix IDE

## Permissions

Semua collection: **Anyone can read**, **Admin only can write**
Kecuali `Subscribers`: **Anyone can insert**
