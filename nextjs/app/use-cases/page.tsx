import Link from "next/link";

const industries = [
  {
    slug: "rumah-sakit",
    industry: "Rumah Sakit",
    icon: "local_hospital",
    description: "Integrasi rekam medis elektronik, manajemen pasien, dan sistem billing dalam satu platform yang aman dan efisien.",
    before: "Data pasien tersebar di sistem yang tidak terhubung, proses manual yang lambat, dan risiko keamanan data tinggi.",
    after: "Rekam medis terintegrasi real-time, proses otomatis, dan keamanan data terjamin dengan enkripsi enterprise.",
    metric: "60% efisiensi operasional",
  },
  {
    slug: "kampus",
    industry: "Kampus & Sekolah",
    icon: "school",
    description: "Sistem akademik terintegrasi yang menghubungkan mahasiswa, dosen, dan administrasi dalam ekosistem digital kampus.",
    before: "Sistem akademik, keuangan, dan kemahasiswaan berjalan terpisah dengan data yang tidak sinkron.",
    after: "Single platform untuk seluruh operasional kampus dengan identitas tunggal M-ID untuk semua civitas akademika.",
    metric: "40% pengurangan overhead admin",
  },
  {
    slug: "fintech",
    industry: "Fintech & Keuangan",
    icon: "account_balance",
    description: "Infrastruktur keuangan digital yang aman untuk lembaga keuangan Muhammadiyah dengan compliance penuh.",
    before: "Transaksi keuangan manual, rekonsiliasi lambat, dan kurangnya visibilitas data keuangan real-time.",
    after: "Otomasi transaksi, rekonsiliasi real-time, dan dashboard keuangan komprehensif untuk pengambilan keputusan.",
    metric: "80% pengurangan waktu rekonsiliasi",
  },
];

export default function UseCasesPage() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="pt-40 md:pt-56 pb-section-gap canvas-container">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-8">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">
              Use Cases
            </span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl text-primary mb-8">
              Solusi nyata untuk setiap industri.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              LabMu telah membantu berbagai institusi Muhammadiyah bertransformasi secara digital dengan hasil yang terukur.
            </p>
          </div>
        </div>
      </header>

      {/* Industries */}
      {industries.map((item, i) => (
        <section
          key={item.slug}
          className={`py-section-gap border-t border-outline-variant/20 ${i % 2 === 1 ? "bg-surface-container-low" : ""}`}
        >
          <div className="canvas-container">
            <div className="grid-12 mb-16">
              <div className="col-span-4 md:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-[32px] text-primary">{item.icon}</span>
                  <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">{item.industry}</span>
                </div>
                <h2 className="text-headline-lg text-primary mb-6">{item.description}</h2>
                <Link
                  href={`/use-cases/${item.slug}`}
                  className="text-label-md text-primary flex items-center gap-2 hover:underline underline-offset-4"
                >
                  Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="col-span-4 md:col-span-3 md:col-start-10 flex items-center justify-center border-hairline p-8 bg-surface">
                <div className="text-center">
                  <div className="text-headline-lg text-secondary mb-2">{item.metric}</div>
                  <div className="text-label-sm text-on-surface-variant">Rata-rata hasil implementasi</div>
                </div>
              </div>
            </div>

            {/* Before / After */}
            <div className="grid-12">
              <div className="col-span-4 md:col-span-6 border-hairline p-8 bg-surface">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">Sebelum</span>
                <p className="text-body-md text-on-surface-variant">{item.before}</p>
              </div>
              <div className="col-span-4 md:col-span-6 border-l-4 border-secondary p-8 bg-surface">
                <span className="text-label-sm text-secondary uppercase tracking-widest mb-4 block">Sesudah</span>
                <p className="text-body-md text-on-surface-variant">{item.after}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-section-gap canvas-container text-center border-t border-outline-variant/20">
        <h2 className="text-headline-lg text-primary mb-8">Institusi Anda berikutnya?</h2>
        <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Diskusikan kebutuhan transformasi digital institusi Anda bersama tim LabMu.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-on-primary px-10 py-5 text-label-md hover:opacity-80 transition-opacity inline-block"
        >
          Mulai Konsultasi
        </Link>
      </section>
    </div>
  );
}
