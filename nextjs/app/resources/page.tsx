import Link from "next/link";
import Image from "next/image";

const featured = {
  type: "Whitepaper",
  date: "Q3 2024",
  title: "Membangun Ketahanan Digital di Sektor Kesehatan",
  excerpt: "Analisis komprehensif mengenai penerapan rekam medis elektronik terintegrasi dan tantangan keamanan siber di rumah sakit Muhammadiyah.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbdkpej4pHnecQfd_5ZnD_84NZU5kSUPPz_Pz8bGxMHBZe-i1WULJVLHp3Yodd8l1cFw8XWkORVBebzIwquHZg11CGuKTjRzM5HTRuCQxi-AGYf3l1PQI9RyF3gM8Zo923aPehyvfpwHw1_NcwXkLskNMwNq2XcWqjpZInx87jIMrfeeMfxvyvXHMi7Uc-U64x5WcDViwe_GVckwisKagf4ZvkQ0x05ARXOPTsNvnuAQs0vl9GDDiyebajROL4YtQoVo-ly2BcrNQ",
};

const articles = [
  {
    type: "Case Study",
    date: "Universitas",
    title: "Transformasi M-ID: Studi Kasus 5 Kampus Percontohan",
    excerpt: "Bagaimana sinkronisasi identitas tunggal mengurangi overhead administratif hingga 40% dalam satu semester.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_7Ahi7xrW7TXudlbFeJkcpYnoz_nJoS-Hym2ztZSnFeGSF_JnzTJRNdCZKb6ff_EYLTjv4CW1veqAqYOM9UrHdRD9BudAn5BNIlGeRVHjnMqYrYIPqP2QCZPb5fqt22oX_2odALd26dMyYmGzPMH2FKNKIlQoZxWIPKMS-EQ1goH7n1AaoV5O049r9ZHp9HZLWhH-liSXFDGK8dFKKRen7ZszvXZApBfkfAPeJbNvTnDJfUhM-kNzj0lmbUGMRy43QM2Xt3aqYA4",
  },
  {
    type: "Research",
    date: "Q2 2024",
    title: "Kedaulatan Data di Era Cloud: Perspektif Institusi Islam",
    excerpt: "Kajian mendalam tentang strategi cloud sovereignty untuk organisasi keagamaan berskala nasional.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbdkpej4pHnecQfd_5ZnD_84NZU5kSUPPz_Pz8bGxMHBZe-i1WULJVLHp3Yodd8l1cFw8XWkORVBebzIwquHZg11CGuKTjRzM5HTRuCQxi-AGYf3l1PQI9RyF3gM8Zo923aPehyvfpwHw1_NcwXkLskNMwNq2XcWqjpZInx87jIMrfeeMfxvyvXHMi7Uc-U64x5WcDViwe_GVckwisKagf4ZvkQ0x05ARXOPTsNvnuAQs0vl9GDDiyebajROL4YtQoVo-ly2BcrNQ",
  },
  {
    type: "Article",
    date: "Mei 2024",
    title: "Interoperabilitas Sistem: Tantangan dan Solusi",
    excerpt: "Memahami kompleksitas integrasi sistem legacy dengan platform modern di lingkungan enterprise.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_7Ahi7xrW7TXudlbFeJkcpYnoz_nJoS-Hym2ztZSnFeGSF_JnzTJRNdCZKb6ff_EYLTjv4CW1veqAqYOM9UrHdRD9BudAn5BNIlGeRVHjnMqYrYIPqP2QCZPb5fqt22oX_2odALd26dMyYmGzPMH2FKNKIlQoZxWIPKMS-EQ1goH7n1AaoV5O049r9ZHp9HZLWhH-liSXFDGK8dFKKRen7ZszvXZApBfkfAPeJbNvTnDJfUhM-kNzj0lmbUGMRy43QM2Xt3aqYA4",
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="pt-40 md:pt-56 pb-section-gap canvas-container">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-8">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">
              Resources
            </span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl text-primary mb-8">
              Jurnal, riset, dan pemikiran strategis.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Kumpulan whitepaper, case study, dan artikel dari tim LabMu tentang transformasi digital institusional.
            </p>
          </div>
        </div>
      </header>

      {/* Featured */}
      <section className="py-section-gap bg-surface-container-low border-y border-outline-variant/20">
        <div className="canvas-container">
          <div className="grid-12 items-center">
            <div className="col-span-4 md:col-span-7 aspect-[16/9] border-hairline overflow-hidden relative">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="col-span-4 md:col-span-4 md:col-start-9">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">
                {featured.type} • {featured.date}
              </span>
              <h2 className="text-headline-lg text-primary mb-6">{featured.title}</h2>
              <p className="text-body-md text-on-surface-variant mb-8">{featured.excerpt}</p>
              <Link
                href="#"
                className="bg-primary text-on-primary px-8 py-4 text-label-md hover:opacity-80 transition-opacity inline-block"
              >
                Unduh Whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="py-section-gap canvas-container">
        <h2 className="text-headline-lg text-primary mb-16">Perpustakaan Digital</h2>
        <div className="grid-12">
          {articles.map((article) => (
            <article key={article.title} className="col-span-4 group cursor-pointer">
              <div className="aspect-[4/3] border-hairline mb-6 overflow-hidden relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  unoptimized
                />
              </div>
              <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-3 block">
                {article.type} • {article.date}
              </span>
              <h3 className="text-headline-md text-primary mb-3">{article.title}</h3>
              <p className="text-body-md text-on-surface-variant line-clamp-3">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-section-gap bg-surface-container-low border-t border-outline-variant/20">
        <div className="canvas-container">
          <div className="grid-12 items-center">
            <div className="col-span-4 md:col-span-6">
              <h2 className="text-headline-lg text-primary mb-6">Berlangganan Insight Strategis</h2>
              <p className="text-body-md text-on-surface-variant">
                Dapatkan update berkala mengenai pengembangan ekosistem LabMu dan tren teknologi institusional.
              </p>
            </div>
            <div className="col-span-4 md:col-span-5 md:col-start-8">
              <div className="flex flex-col gap-4 border-b border-outline-variant pb-2 mb-6">
                <label className="text-label-sm text-on-surface-variant">Alamat Email Institusi</label>
                <input
                  type="email"
                  placeholder="nama@instansi.id"
                  className="bg-transparent border-none p-0 focus:ring-0 text-body-md text-primary placeholder-outline-variant outline-none"
                />
              </div>
              <button className="text-label-md text-primary flex items-center gap-2 hover:opacity-70 transition-opacity">
                Daftar Sekarang{" "}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
