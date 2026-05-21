import Link from "next/link";

const products = [
  {
    number: "01",
    category: "IDENTITY",
    slug: "muhammadiyah-id",
    title: "Muhammadiyah ID",
    shortTitle: "M-ID",
    description:
      "Sistem identitas digital tunggal yang menghubungkan seluruh warga dan institusi Muhammadiyah dalam satu ekosistem identitas yang aman dan terverifikasi.",
    features: ["Single Sign-On (SSO)", "Verifikasi identitas digital", "Manajemen akses terpusat", "Integrasi multi-platform"],
  },
  {
    number: "02",
    category: "INTEGRATION",
    slug: "satumu",
    title: "SatuMu",
    shortTitle: "SatuMu",
    description:
      "Platform integrasi data yang menghubungkan seluruh sistem operasional Muhammadiyah — dari keuangan, akademik, hingga layanan kesehatan — dalam satu aliran data yang kohesif.",
    features: ["API gateway terpusat", "Real-time data sync", "ETL pipeline otomatis", "Dashboard monitoring"],
  },
  {
    number: "03",
    category: "ANALYTICS",
    slug: "masa",
    title: "MASA",
    shortTitle: "MASA",
    description:
      "Platform analitik dan business intelligence yang mengubah data operasional menjadi insight strategis untuk pengambilan keputusan pimpinan Muhammadiyah.",
    features: ["Dashboard real-time", "Predictive analytics", "Custom reporting", "Data visualization"],
  },
];

const advantages = [
  { icon: "shield_lock", title: "Keamanan Enterprise", desc: "Enkripsi end-to-end dan infrastruktur cloud privat yang memenuhi standar keamanan nasional." },
  { icon: "hub", title: "Integrasi Seamless", desc: "API-first architecture yang memudahkan integrasi dengan sistem yang sudah ada." },
  { icon: "speed", title: "Performa Tinggi", desc: "Infrastruktur yang dirancang untuk melayani jutaan pengguna dengan latensi minimal." },
  { icon: "support_agent", title: "Dukungan Penuh", desc: "Tim teknis berpengalaman siap mendampingi implementasi dan operasional." },
];

export default function ProductsPage() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="pt-40 md:pt-56 pb-section-gap canvas-container">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-8">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">
              Produk
            </span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl text-primary mb-8">
              Ekosistem digital yang terintegrasi.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Tiga produk inti yang saling terhubung, dirancang khusus untuk kebutuhan institusi Muhammadiyah.
            </p>
          </div>
        </div>
      </header>

      {/* Products */}
      <section className="border-t border-outline-variant/20">
        {products.map((product, i) => (
          <div
            key={product.slug}
            className={`py-section-gap canvas-container border-b border-outline-variant/20 ${i % 2 === 1 ? "bg-surface-container-low" : ""}`}
          >
            <div className="grid-12 items-center">
              <div className={`col-span-4 md:col-span-5 ${i % 2 === 1 ? "md:col-start-8 md:row-start-1" : ""}`}>
                <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2 block">
                  {product.number} / {product.category}
                </span>
                <h2 className="text-headline-lg text-primary mb-6">{product.title}</h2>
                <p className="text-body-md text-on-surface-variant mb-8">{product.description}</p>
                <ul className="flex flex-col gap-3 mb-10">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-body-md text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${product.slug}`}
                  className="border border-primary text-primary px-8 py-4 text-label-md hover:bg-primary hover:text-on-primary transition-colors inline-block"
                >
                  Pelajari {product.shortTitle}
                </Link>
              </div>
              <div className={`col-span-4 md:col-span-6 ${i % 2 === 1 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"} h-[320px] border-hairline bg-surface-container flex items-center justify-center`}>
                <span className="text-[120px] font-bold text-outline-variant/30">{product.number}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Advantages */}
      <section className="py-section-gap canvas-container">
        <h2 className="text-headline-lg text-primary mb-16">Mengapa LabMu?</h2>
        <div className="grid-12">
          {advantages.map((adv) => (
            <div key={adv.title} className="col-span-4 md:col-span-3 border-hairline p-8 hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined text-[32px] text-primary mb-6 block">{adv.icon}</span>
              <h3 className="text-headline-md text-primary mb-4">{adv.title}</h3>
              <p className="text-body-md text-on-surface-variant">{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-gap canvas-container text-center border-t border-outline-variant/20">
        <h2 className="text-headline-lg text-primary mb-8">Siap memulai transformasi?</h2>
        <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Konsultasikan kebutuhan institusi Anda dengan tim enterprise LabMu.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-on-primary px-10 py-5 text-label-md hover:opacity-80 transition-opacity inline-block"
        >
          Hubungi Tim Enterprise
        </Link>
      </section>
    </div>
  );
}
