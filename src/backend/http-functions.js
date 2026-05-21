/**
 * http-functions.js — Custom HTTP endpoints (REST API)
 * Access via: https://www.yoursite.com/_functions/<functionName>
 *
 * Endpoints:
 *  GET  /_functions/news          — list published news
 *  GET  /_functions/newsItem      — single news by slug (?slug=xxx)
 *  GET  /_functions/products      — list all products
 *  POST /_functions/contact       — submit contact form
 *  POST /_functions/subscribe     — subscribe newsletter
 *
 * Docs: https://dev.wix.com/docs/develop-websites/articles/coding-with-velo/http-functions
 */

import { ok, notFound, badRequest, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

// ── GET /news ──────────────────────────────────────────────

export async function get_news(request) {
  try {
    const limit = parseInt(request.query.limit) || 10;
    const skip  = parseInt(request.query.skip)  || 0;
    const type  = request.query.type            || null;

    let query = wixData
      .query('News')
      .eq('status', 'published')
      .descending('publishedDate')
      .limit(limit)
      .skip(skip);

    if (type) query = query.eq('type', type);

    const result = await query.find();

    return ok({
      body: JSON.stringify({
        items:      result.items,
        totalCount: result.totalCount,
        hasNext:    result.hasNext(),
      }),
      headers: corsHeaders(),
    });
  } catch (err) {
    return serverError({ body: JSON.stringify({ error: err.message }), headers: corsHeaders() });
  }
}

// ── GET /newsItem ──────────────────────────────────────────

export async function get_newsItem(request) {
  try {
    const slug = request.query.slug || request.path[0];
    if (!slug) {
      return badRequest({ body: JSON.stringify({ error: 'slug required' }), headers: corsHeaders() });
    }

    const result = await wixData
      .query('News')
      .eq('slug', slug)
      .eq('status', 'published')
      .find();

    if (!result.items.length) {
      return notFound({ body: JSON.stringify({ error: 'Not found' }), headers: corsHeaders() });
    }

    return ok({ body: JSON.stringify(result.items[0]), headers: corsHeaders() });
  } catch (err) {
    return serverError({ body: JSON.stringify({ error: err.message }), headers: corsHeaders() });
  }
}

// ── GET /products ──────────────────────────────────────────

export async function get_products(_request) {
  try {
    const result = await wixData
      .query('Products')
      .ascending('order')
      .find();

    return ok({
      body: JSON.stringify({ items: result.items }),
      headers: corsHeaders(),
    });
  } catch (err) {
    return serverError({ body: JSON.stringify({ error: err.message }), headers: corsHeaders() });
  }
}

// ── POST /contact ──────────────────────────────────────────

export async function post_contact(request) {
  try {
    const body = await request.body.json();
    const { firstName, lastName, email, institution, topic, message } = body;

    // Validate
    if (!firstName || !email || !institution) {
      return badRequest({
        body: JSON.stringify({ error: 'firstName, email, institution wajib diisi.' }),
        headers: corsHeaders(),
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return badRequest({
        body: JSON.stringify({ error: 'Format email tidak valid.' }),
        headers: corsHeaders(),
      });
    }

    await wixData.insert('ContactSubmissions', {
      firstName,
      lastName:    lastName    || '',
      email,
      institution,
      topic:       topic       || 'Konsultasi Strategis',
      message:     message     || '',
      submittedAt: new Date(),
    });

    return ok({
      body: JSON.stringify({ success: true, message: 'Pesan berhasil dikirim.' }),
      headers: corsHeaders(),
    });
  } catch (err) {
    return serverError({ body: JSON.stringify({ error: err.message }), headers: corsHeaders() });
  }
}

// ── POST /subscribe ────────────────────────────────────────

export async function post_subscribe(request) {
  try {
    const body   = await request.body.json();
    const { email, source } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return badRequest({
        body: JSON.stringify({ error: 'Email tidak valid.' }),
        headers: corsHeaders(),
      });
    }

    // Cek duplicate
    const existing = await wixData.query('Subscribers').eq('email', email).find();
    if (existing.items.length > 0) {
      return ok({
        body: JSON.stringify({ success: false, message: 'Email sudah terdaftar.' }),
        headers: corsHeaders(),
      });
    }

    await wixData.insert('Subscribers', {
      email,
      subscribedAt: new Date(),
      source: source || 'api',
    });

    return ok({
      body: JSON.stringify({ success: true, message: 'Berhasil didaftarkan.' }),
      headers: corsHeaders(),
    });
  } catch (err) {
    return serverError({ body: JSON.stringify({ error: err.message }), headers: corsHeaders() });
  }
}

// ── Helpers ────────────────────────────────────────────────

function corsHeaders() {
  return {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
  };
}
