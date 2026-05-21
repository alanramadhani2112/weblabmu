import Image from "next/image";
import Link from "next/link";

const team = [
  { name: "Dr. Ahmad Faisal", role: "Chief Executive Officer", bio: "Memimpin transformasi digital ekosistem Muhammadiyah dengan visi kedaulatan data nasional." },
  { name: "Siti Rahmawati", role: "Chief Business Officer", bio: "Membangun kemitraan strategis dengan institusi pendidikan dan kesehatan Muhammadiyah." },
  { name: "Budi Santoso", role: "VP Engineering", bio: "Merancang arsitektur infrastruktur cloud privat dan sistem integrasi enterprise." },
  { name: "Aisha Putri", role: "VP Operations", bio: "Memastikan keunggulan operasional dan kepuasan klien di seluruh lini layanan LabMu." },
];

export default function AboutPage() {
  return (
    <div className="bg-surface text-on-surface">
      {/* Hero */}
      <header className="pt-40 md:pt-56 pb-section-gap canvas-container">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-8">
            <span className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4 block">
              Tentang Kami
            </span>
            <h1 className="text-headline-xl-mobile md:text-headline-xl text-primary mb-8">
              Membangun kedaulatan digital untuk umat.
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              LabMu adalah lembaga teknologi Muhammadiyah yang berfokus pada pembangunan infrastruktur digital terintegrasi, aman, dan berdaulat untuk seluruh ekosistem persyarikatan.
            </p>
          </div>
        </div>
      </header>

      {/* Story */}
      <section className="py-section-gap bg-surface-container-low border-y border-outline-variant/20">
        <div className="canvas-container">
          <div className="grid-12">
            <div className="col-span-4 md:col-span-5">
              <h2 className="text-headline-lg text-primary mb-8">Cerita Kami</h2>
              <p className="text-body-md text-on-surface-variant mb-6">
                Didirikan sebagai respons terhadap kebutuhan mendesak akan infrastruktur digital yang berdaulat, LabMu hadir untuk menjawab tantangan transformasi digital di lingkungan Muhammadiyah.
              </p>
              <p className="text-body-md text-on-surface-variant mb-6">
                Dengan lebih dari 170 universitas, 120 rumah sakit, dan ribuan sekolah di bawah naungan Muhammadiyah, kebutuhan akan sistem yang terintegrasi dan aman menjadi prioritas utama.
              </p>
              <p className="text-body-md text-on-surface-variant">
                LabMu membangun ekosistem digital yang menghubungkan seluruh entitas ini dalam satu platform yang kohesif, efisien, dan berdaulat.
              </p>
            </div>
            <div className="col-span-4 md:col-span-6 md:col-start-7">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "170+", label: "Universitas" },
                  { number: "120+", label: "Rumah Sakit" },
                  { number: "5.000+", label: "Sekolah" },
                  { number: "60M+", label: "Warga Muhammadiyah" },
                ].map((stat) => (
                  <div key={stat.label} className="border-hairline p-8 bg-surface">
                    <div className="text-headline-lg text-primary mb-2">{stat.number}</div>
                    <div className="text-label-md text-on-surface-variant">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-section-gap canvas-container">
        <h2 className="text-headline-lg text-primary mb-16">Kepemimpinan</h2>
        <div className="grid-12">
          {team.map((member) => (
            <div key={member.name} className="col-span-4 md:col-span-3 border-hairline p-8 hover:bg-surface-container-low transition-colors">
              <div className="w-16 h-16 bg-surface-container-high mb-6 flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px] text-on-surface-variant">person</span>
              </div>
              <h3 className="text-headline-md text-primary mb-1">{member.name}</h3>
              <p className="text-label-sm text-secondary uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-body-md text-on-surface-variant">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-gap canvas-container text-center border-t border-outline-variant/20">
        <h2 className="text-headline-lg text-primary mb-8">Bergabung dalam Misi Ini</h2>
        <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Bersama LabMu, wujudkan ekosistem digital yang berdaulat untuk generasi Muhammadiyah berikutnya.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-on-primary px-10 py-5 text-label-md hover:opacity-80 transition-opacity inline-block"
        >
          Hubungi Kami
        </Link>
      </section>
    </div>
  );
}
