"use client";

import { useState } from "react";

const topics = [
  "Konsultasi Strategis",
  "Kemitraan",
  "Implementasi Produk",
  "Lainnya",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-surface text-on-surface">
      <header className="pt-40 md:pt-56 pb-section-gap canvas-container">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-6">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">
              Kontak
            </span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl text-primary mb-8">
              Mari bicara tentang institusi Anda.
            </h1>
            <p className="text-body-lg text-on-surface-variant">
              Tim enterprise LabMu siap mendiskusikan kebutuhan transformasi digital institusi Anda.
            </p>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8">
            {submitted ? (
              <div className="border-hairline p-10 bg-surface-container-low">
                <span className="material-symbols-outlined text-[48px] text-secondary mb-6 block">check_circle</span>
                <h2 className="text-headline-md text-primary mb-4">Pesan Terkirim</h2>
                <p className="text-body-md text-on-surface-variant">
                  Tim kami akan menghubungi Anda dalam 1-2 hari kerja.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-label-sm text-on-surface-variant">Nama Depan</label>
                    <input
                      type="text"
                      required
                      className="border-b border-outline-variant bg-transparent py-3 text-body-md text-primary outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-label-sm text-on-surface-variant">Nama Belakang</label>
                    <input
                      type="text"
                      required
                      className="border-b border-outline-variant bg-transparent py-3 text-body-md text-primary outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface-variant">Email</label>
                  <input
                    type="email"
                    required
                    className="border-b border-outline-variant bg-transparent py-3 text-body-md text-primary outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface-variant">Institusi</label>
                  <input
                    type="text"
                    required
                    className="border-b border-outline-variant bg-transparent py-3 text-body-md text-primary outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface-variant">Topik</label>
                  <select
                    required
                    className="border-b border-outline-variant bg-transparent py-3 text-body-md text-primary outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Pilih topik...</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-sm text-on-surface-variant">Pesan</label>
                  <textarea
                    required
                    rows={4}
                    className="border-b border-outline-variant bg-transparent py-3 text-body-md text-primary outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-8 py-4 text-label-md hover:opacity-80 transition-opacity self-start"
                >
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
