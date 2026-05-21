import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-surface text-on-surface">
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="pt-40 md:pt-56 pb-section-gap canvas-container">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-8">
            <h1 className="text-headline-xl-mobile md:text-headline-xl text-primary mb-8">
              Menuju kedaulatan digital umat.
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl">
              LabMu membangun ekosistem digital terintegrasi untuk institusi
              Muhammadiyah. Menghubungkan data, memperkuat analitik, dan
              memajukan kolaborasi melalui infrastruktur kelas enterprise yang
              aman dan berdaulat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-primary text-on-primary px-8 py-4 text-label-md hover:bg-primary-container transition-colors text-center"
              >
                Jadwalkan Demo
              </Link>
              <Link
                href="/products"
                className="border border-primary text-primary px-8 py-4 text-label-md hover:bg-surface-container transition-colors text-center"
              >
                Jelajahi Ekosistem
              </Link>
            </div>
          </div>
          <div className="col-span-4 mt-12 md:mt-0 relative h-[400px] hidden md:block">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqhkqHpztSdjjfYdyEBKSbusASDqUY-qDRu79kSRIa8b1JD881aZtf4Pqokk51S-5fsKNmArLEPpxTuqN-IKbNwwxk2Ce5q80CiM15AvccsSp9kkgsRVUBVLO7oYAtUX6HYTxTOhleheCXxmFSfijo5Wd-KSs-YGwtHd1uOf_mnufWcpjoIMy7wSV1PxPvhcKuRnKyhImJrxWImp-DX5_e97GejyWV7FfO90D1dKTdP39GwYkF7x7GO3X0s-Pk5tYLd4UmMPFuWKc"
              alt="Ecosystem Concept"
              fill
              className="object-cover border-hairline"
              unoptimized
            />
          </div>
        </div>
      </header>

      {/* ── Ecosystem Architecture ────────────────────────── */}
      <section className="py-section-gap bg-surface-container-low border-y border-outline-variant/20">
        <div className="canvas-container">
          <div className="grid-12 mb-16">
            <div className="col-span-4 md:col-span-6">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">
                Arsitektur Ekosistem
              </span>
              <h2 className="text-headline-lg text-primary">
                Konektivitas Tanpa Batas dengan M-ID
              </h2>
            </div>
            <div className="col-span-4 md:col-span-6 flex items-end">
              <p className="text-body-md text-on-surface-variant">
                M-ID bertindak sebagai node identitas tunggal, menghubungkan
                seluruh vertikal operasional Muhammadiyah ke dalam satu aliran
                data yang kohesif dan aman.
              </p>
            </div>
          </div>
          <div className="w-full h-[400px] border-hairline bg-surface relative overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvP5NeI5oQDAL5CXIKPorDGdjn3wct6GQOmlCpnTkD2iqFgR97ZAehPNE8GHIipbt_YNAlTZSbzgNqSAHNUo14wlKr5GvMaBf0HHFfc_NeOOuzbtJi2HHuImbErLbpvJ3ajkPzrPH9ATZKZhVbiDkxoQjYiXNW3LZUClUFZ7dki2IZ1Q5putLr2VNBHSb8BXeubiFTWT8SkfcgJoeWlqg1qEgz52k7NxaO0UL1RGf5gWhXh6h4j9p6_dwA2I9nEDuylCa_llXrQtQ"
              alt="Network Architecture"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── Value Proposition (Bento Grid) ───────────────── */}
      <section className="py-section-gap canvas-container">
        <div className="grid-12 mb-16">
          <div className="col-span-4 md:col-span-8">
            <h2 className="text-headline-lg text-primary">
              Infrastruktur untuk Keputusan Strategis
            </h2>
          </div>
        </div>
        <div className="grid-12 grid-rows-2">
          {/* Card 1 */}
          <div className="col-span-4 md:col-span-8 border-hairline p-10 bg-surface hover:bg-surface-container-low transition-colors group">
            <span className="material-symbols-outlined text-[32px] text-primary mb-6 block">
              shield_lock
            </span>
            <h3 className="text-headline-md text-primary mb-4">
              Kedaulatan Data
            </h3>
            <p className="text-body-md text-on-surface-variant max-w-lg">
              Infrastruktur cloud privat dan hybrid memastikan seluruh data
              operasional dan personal warga persyarikatan tetap aman,
              terenkripsi, dan dikelola secara mandiri sesuai regulasi nasional.
            </p>
          </div>
          {/* Card 2 */}
          <div className="col-span-4 md:col-span-4 border-hairline p-10 bg-surface hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[32px] text-primary mb-6 block">
              hub
            </span>
            <h3 className="text-headline-md text-primary mb-4">
              Ecosystem Thinking
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Sistem yang tidak lagi terisolasi. Setiap aplikasi dirancang untuk
              berbicara satu sama lain.
            </p>
          </div>
          {/* Card 3 */}
          <div className="col-span-4 md:col-span-4 border-hairline p-10 bg-surface hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[32px] text-primary mb-6 block">
              insights
            </span>
            <h3 className="text-headline-md text-primary mb-4">
              Decision Intelligence
            </h3>
            <p className="text-body-md text-on-surface-variant">
              Ubah raw data menjadi actionable insights dengan dashboard
              analitik real-time untuk pimpinan.
            </p>
          </div>
          {/* Card 4 — dark */}
          <div className="col-span-4 md:col-span-8 border-hairline p-10 bg-primary text-on-primary relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-[32px] text-secondary-fixed mb-6 block">
                groups
              </span>
              <h3 className="text-headline-md text-on-primary mb-4">
                Social Impact
              </h3>
              <p className="text-body-md text-outline-variant max-w-lg">
                Efisiensi operasional dari transformasi digital secara langsung
                meningkatkan skala dan kualitas layanan sosial, pendidikan, dan
                kesehatan bagi umat.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 w-64 h-64 bg-secondary blur-3xl" />
          </div>
        </div>
      </section>

      {/* ── Resources Preview ─────────────────────────────── */}
      <section className="py-section-gap canvas-container border-t border-outline-variant/20">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-headline-lg text-primary">Jurnal &amp; Pemikiran</h2>
          <Link
            href="/resources"
            className="text-label-md flex items-center gap-2 hover:underline underline-offset-4"
          >
            Lihat Semua{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>
        <div className="grid-12">
          {/* Article 1 */}
          <article className="col-span-4 group cursor-pointer">
            <div className="aspect-[4/3] border-hairline mb-6 overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbdkpej4pHnecQfd_5ZnD_84NZU5kSUPPz_Pz8bGxMHBZe-i1WULJVLHp3Yodd8l1cFw8XWkORVBebzIwquHZg11CGuKTjRzM5HTRuCQxi-AGYf3l1PQI9RyF3gM8Zo923aPehyvfpwHw1_NcwXkLskNMwNq2XcWqjpZInx87jIMrfeeMfxvyvXHMi7Uc-U64x5WcDViwe_GVckwisKagf4ZvkQ0x05ARXOPTsNvnuAQs0vl9GDDiyebajROL4YtQoVo-ly2BcrNQ"
                alt="Article"
                width={600}
                height={450}
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                unoptimized
              />
            </div>
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-3 block">
              Whitepaper • Q3 2024
            </span>
            <h3 className="text-headline-md text-primary mb-3">
              Membangun Ketahanan Digital di Sektor Kesehatan
            </h3>
            <p className="text-body-md text-on-surface-variant line-clamp-3">
              Analisis komprehensif mengenai penerapan rekam medis elektronik
              terintegrasi dan tantangan keamanan siber.
            </p>
          </article>

          {/* Article 2 */}
          <article className="col-span-4 group cursor-pointer">
            <div className="aspect-[4/3] border-hairline mb-6 overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_7Ahi7xrW7TXudlbFeJkcpYnoz_nJoS-Hym2ztZSnFeGSF_JnzTJRNdCZKb6ff_EYLTjv4CW1veqAqYOM9UrHdRD9BudAn5BNIlGeRVHjnMqYrYIPqP2QCZPb5fqt22oX_2odALd26dMyYmGzPMH2FKNKIlQoZxWIPKMS-EQ1goH7n1AaoV5O049r9ZHp9HZLWhH-liSXFDGK8dFKKRen7ZszvXZApBfkfAPeJbNvTnDJfUhM-kNzj0lmbUGMRy43QM2Xt3aqYA4"
                alt="Article"
                width={600}
                height={450}
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                unoptimized
              />
            </div>
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-3 block">
              Case Study • Universitas
            </span>
            <h3 className="text-headline-md text-primary mb-3">
              Transformasi M-ID: Studi Kasus 5 Kampus Percontohan
            </h3>
            <p className="text-body-md text-on-surface-variant line-clamp-3">
              Bagaimana sinkronisasi identitas tunggal mengurangi overhead
              administratif hingga 40% dalam satu semester.
            </p>
          </article>

          {/* Newsletter */}
          <article className="col-span-4 border-hairline p-8 flex flex-col justify-center bg-surface-container-low">
            <h3 className="text-headline-md text-primary mb-6">
              Berlangganan Insight Strategis
            </h3>
            <p className="text-body-md text-on-surface-variant mb-8">
              Dapatkan update berkala mengenai pengembangan ekosistem LabMu dan
              tren teknologi institusional.
            </p>
            <div className="flex flex-col gap-4 border-b border-outline-variant pb-2">
              <label className="text-label-sm text-on-surface-variant">
                Alamat Email Institusi
              </label>
              <input
                type="email"
                placeholder="nama@instansi.id"
                className="bg-transparent border-none p-0 focus:ring-0 text-body-md text-primary placeholder-outline-variant outline-none"
              />
            </div>
            <button className="mt-8 self-start text-label-md text-primary flex items-center gap-2 hover:opacity-70 transition-opacity">
              Daftar Sekarang{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </article>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="py-section-gap canvas-container text-center">
        <h2 className="text-headline-xl-mobile md:text-headline-xl text-primary mb-8 max-w-4xl mx-auto">
          Bangun ekosistem digital yang terhubung.
        </h2>
        <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Mulai transformasi institusi Anda hari ini dengan arsitektur yang
          dirancang untuk skala, keamanan, dan kedaulatan masa depan.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-on-primary px-10 py-5 text-label-md hover:bg-primary-container transition-colors inline-block"
        >
          Hubungi Tim Enterprise LabMu
        </Link>
      </section>
    </div>
  );
}
