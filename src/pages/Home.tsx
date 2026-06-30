import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, FileText, ArrowRight, BookOpen, FlaskConical, Globe } from 'lucide-react';
import CountUp from 'react-countup';
import type { SanityImageSource } from '@sanity/image-url';
import { Seo } from '../lib/seo';
import { safeSanityFetch, urlFor } from '../lib/sanity';
import {
  breadcrumbSchema,
  personSchema,
  profilePageSchema,
  siteNavigationSchema,
  websiteSchema,
} from '../lib/seoData';

interface BlogPostSummary {
  _id: string;
  title: string;
  mainImage?: SanityImageSource;
  slug?: {
    current?: string;
  };
  created_at: string;
  authorName?: string;
  categories?: string[];
}

const X_HANDLE = 'real_obal';

const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<BlogPostSummary[]>([]);

  const stats = [
    { label: 'Years of Experience', value: 3, suffix: '+' },
    { label: 'Projects Completed', value: 4, suffix: '+' },
    { label: 'Beneficiaries Served', value: 1000, suffix: '+' },
    { label: 'Organizations Engaged', value: 4, suffix: '+' },
  ];

  const interests = [
    { icon: BarChart3, label: 'MEAL Systems' },
    { icon: TrendingUp, label: 'Impact Evaluation' },
    { icon: Users, label: 'Capacity Building' },
    { icon: FlaskConical, label: 'Implementation Research' },
    { icon: Globe, label: 'Community Development' },
    { icon: FileText, label: 'Evidence Synthesis' },
  ];

  const highlights = [
    {
      icon: BarChart3,
      title: 'MEAL System Design',
      description: 'Comprehensive monitoring, evaluation, accountability and learning frameworks tailored to program needs.',
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Insights',
      description: 'Transform raw field data into actionable insights for program improvement and strategic decisions.',
    },
    {
      icon: Users,
      title: 'Capacity Building',
      description: 'Training and mentorship in MEAL best practices, digital tools, and participatory approaches.',
    },
    {
      icon: FileText,
      title: 'Impact Evaluation',
      description: 'Baseline, midline, and endline studies with rigorous qualitative and quantitative analysis.',
    },
  ];

  useEffect(() => {
    const q = `*[_type == "post"] | order(_createdAt desc)[0..2] {
      _id, title, mainImage, slug,
      "created_at": _createdAt,
      "authorName": author->name,
      "categories": categories[]->title
    }`;
    safeSanityFetch<BlogPostSummary[]>(q, undefined, [])
      .then((data) => setRecentPosts(data || []));
  }, []);

  return (
    <div className="font-sans">
      <Seo
        title="Ronald Obal | MEAL Manager & MEARL Specialist"
        description="Official website of Ronald Obal, MEAL Manager, researcher, and development practitioner in Uganda."
        path="/"
        type="profile"
        jsonLd={[
          personSchema,
          websiteSchema,
          profilePageSchema,
          siteNavigationSchema,
          breadcrumbSchema([{ name: 'Ronald Obal Official Website', path: '/' }]),
        ]}
      >
        <link rel="icon" type="image/png" href="/Logo1.png" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Seo>

      <style>{`
        .home-display { font-family: 'Playfair Display', Georgia, serif; }
        .home-serif  { font-family: 'Source Serif 4', Georgia, serif; }
        .fade-up { opacity: 0; transform: translateY(28px); animation: fadeUp 0.75s ease forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .d1 { animation-delay: 0.05s; } .d2 { animation-delay: 0.18s; }
        .d3 { animation-delay: 0.30s; } .d4 { animation-delay: 0.42s; }
        .d5 { animation-delay: 0.54s; }
        .gold-bar::before { content:''; display:block; width:48px; height:3px; background:#C9A227; margin-bottom:1rem; }
        .interest-card:hover { background: #0A2A43; color: white; }
        .interest-card:hover svg { color: #C9A227; }
        .interest-card:hover p { color: white; }
      `}</style>

      {/* -- HERO ----------------------------------------------------------- */}
      <section className="relative bg-[#0A2A43] overflow-hidden min-h-[92vh] flex items-center" style={{
        backgroundImage: 'url(/Hero%20image.JPG)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Diagonal dot texture */}
        <div className="absolute inset-0 opacity-[0.045]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)',
          backgroundSize: '14px 14px',
        }} />
        {/* Gold left accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#C9A227] via-[#C9A227]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="text-white">
            <p className="fade-up d1 text-[#C9A227] text-xs font-bold uppercase tracking-[0.35em] mb-5">
              MEAL Manager | MEARL Specialist
            </p>

            <h1
              className="fade-up d2 home-display text-6xl md:text-8xl font-black text-white leading-none mb-6"
              aria-label="Ronald Obal"
            >
              <span aria-hidden="true">
                Ronald<br />
                <span className="text-[#C9A227]">Obal</span>
              </span>
            </h1>

            {/* Quote - mirrors drolum.com hero quote */}
            <blockquote className="fade-up d3 border-l-4 border-[#C9A227]/40 pl-6 mb-8">
              <p className="home-serif italic text-xl text-gray-300 leading-relaxed max-w-lg">
                Through evidence, accountability, and continuous learning, we shape programs that truly change lives.
              </p>
              <footer className="mt-2 text-[#C9A227] text-xs font-bold uppercase tracking-widest">- Ronald Obal</footer>
            </blockquote>

            <p className="fade-up d3 home-serif text-gray-200 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              This is the official website of Ronald Obal, a MEAL Manager, Monitoring Evaluation Accountability Research and Learning (MEARL) Specialist, researcher, and development practitioner in Uganda.
            </p>

            <div className="fade-up d4 mt-8">
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#C9A227] text-[#0A2A43] font-bold px-6 py-3 rounded-full hover:bg-[#b8911f] transition-colors text-sm"
                >
                  More Details <ArrowRight size={15} />
                </Link>
                <Link
                  to="/data-analytics-research-portfolio"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-5 py-3 rounded-full hover:border-[#C9A227] hover:text-[#C9A227] transition-colors text-sm"
                >
                  Explore Research Portfolio <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-5 py-3 rounded-full hover:border-[#C9A227] hover:text-[#C9A227] transition-colors text-sm"
                >
                  Contact Ronald <ArrowRight size={15} />
                </Link>
                <a
                  href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black/50 border border-white/10 text-white font-semibold px-5 py-3 rounded-full hover:bg-black transition-colors text-sm"
                >
                  <XLogo size={13} /> Follow @{X_HANDLE}
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://www.researchgate.net/profile/Ronald-Obal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm"
                >
                  <img src="/ResearchGate%20logo.png" alt="" className="w-4 h-4 object-contain" />
                  Ronald Obal on ResearchGate
                </a>
                <a
                  href="https://scholar.google.com/citations?user=0ks04t8AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-colors text-sm"
                >
                  <img src="/GoogleScholar.png" alt="" className="w-4 h-4 object-contain" />
                  Google Scholar Profile
                </a>
              </div>
            </div>
          </div>

          {/* Right: profile photo */}
          <div className="fade-up d5 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-[8px] border-[#C9A227]/30 shadow-2xl">
                <img
                  src="/ronald-profile.PNG"
                  alt="Ronald Obal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border border-[#C9A227]/10 pointer-events-none" />
              <div className="absolute -inset-8 rounded-full border border-[#C9A227]/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* -- ABOUT SUMMARY - mirrors drolum "About Dr. Ronald Olum" -------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/About.JPG"
                  alt="Ronald Obal"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A43]/40 to-transparent" />
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="gold-bar">
                <h2 className="home-display text-4xl md:text-5xl font-black text-[#0A2A43]">
                  About Ronald Obal
                </h2>
              </div>

              <div className="home-serif space-y-5 text-gray-700 text-lg leading-relaxed mt-6">
                <p>
                  <strong className="text-[#0A2A43]">Ronald Obal</strong> is a Monitoring, Evaluation,
                  Accountability, Research and Learning professional focused on practical evidence systems
                  for social impact programs in Uganda.
                </p>
                <p>
                  His work spans child protection, livelihoods, education, youth empowerment, GBV response,
                  trauma care, mental health, and community development, with an emphasis on data that improves
                  decisions and accountability.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#0A2A43] font-bold border-b-2 border-[#C9A227] pb-0.5 hover:text-[#C9A227] transition-colors"
                >
                  More Details <ArrowRight size={16} />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-[#0A2A43] font-bold border-b-2 border-[#C9A227] pb-0.5 hover:text-[#C9A227] transition-colors"
                >
                  View Experience <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- PROFESSIONAL INTERESTS - mirrors drolum "Research Interests" -- */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[#C9A227] text-xs font-bold uppercase tracking-[0.3em] mb-3">Areas of Focus</p>
            <h2 className="home-display text-4xl font-black text-[#0A2A43]">Professional Interests</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {interests.map((item, i) => (
              <div
                key={i}
                className="interest-card bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:border-[#0A2A43] hover:shadow-md transition-all duration-200 cursor-default group"
              >
                <item.icon className="mx-auto mb-3 text-[#C9A227] group-hover:text-[#C9A227]" size={28} />
                <p className="text-sm font-bold text-[#0A2A43] leading-tight">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- STATS - mirrors drolum "Scholarly Contributions" counters ----- */}
      <section className="py-20 bg-[#0A2A43] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)',
          backgroundSize: '14px 14px',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[#C9A227] text-xs font-bold uppercase tracking-[0.3em] mb-3">By the Numbers</p>
            <h2 className="home-display text-4xl font-black text-white">Professional Contributions</h2>
            <p className="home-serif text-gray-400 mt-3 max-w-xl mx-auto">
              A track record of evidence-based systems that drive real program improvement.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="home-display text-5xl md:text-6xl font-black text-[#C9A227] mb-2">
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                </div>
                <div className="home-serif text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-[#C9A227] font-bold hover:underline text-sm"
            >
              View Professional Experience <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* -- CORE EXPERTISE ------------------------------------------------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[#C9A227] text-xs font-bold uppercase tracking-[0.3em] mb-3">What I Do</p>
            <h2 className="home-display text-4xl font-black text-[#0A2A43] mb-3">Core Expertise</h2>
            <p className="home-serif text-gray-500 text-lg max-w-xl mx-auto">
              Comprehensive MEAL services designed to strengthen program performance and accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-[#f7f5f0] border border-gray-100 p-7 rounded-2xl hover:border-[#C9A227]/40 hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-[#0A2A43] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#C9A227] transition-colors">
                  <item.icon className="text-[#C9A227] group-hover:text-[#0A2A43] transition-colors" size={22} />
                </div>
                <h3 className="home-display text-lg font-bold text-[#0A2A43] mb-2">{item.title}</h3>
                <p className="home-serif text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-[#0A2A43] font-bold border-b-2 border-[#C9A227] pb-0.5 hover:text-[#C9A227] transition-colors text-sm"
            >
              Explore MEAL Services <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* -- CURRENT ROLE BANNER -------------------------------------------- */}
      <section className="py-6 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-[#0A2A43] rounded-2xl px-8 md:px-12 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5" style={{
              backgroundImage: 'repeating-linear-gradient(-45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)',
              backgroundSize: '12px 12px',
            }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-widest">Currently Active</span>
              </div>
              <h3 className="home-display text-2xl md:text-3xl font-bold text-white mb-2">
                MEAL Manager | Laminopabo Child and Youth Development Center
              </h3>
              <p className="home-serif text-gray-300 max-w-xl text-sm leading-relaxed">
                Leading monitoring, evaluation, accountability and learning at Laminopabo Child and Youth Development Center
                - strengthening child protection and youth development program systems across Uganda.
              </p>
            </div>
            <Link
              to="/about"
              className="relative flex-shrink-0 inline-flex items-center gap-2 bg-[#C9A227] text-[#0A2A43] font-bold px-6 py-3 rounded-full hover:bg-[#b8911f] transition-colors text-sm"
            >
              Learn More <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* -- RECENT BLOG - mirrors drolum "Read Recent Blog" --------------- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <p className="text-[#C9A227] text-xs font-bold uppercase tracking-[0.3em] mb-3">Latest Writing</p>
              <h2 className="home-display text-4xl font-black text-[#0A2A43]">Read Recent Blog</h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#0A2A43] font-bold border-b-2 border-[#C9A227] pb-0.5 hover:text-[#C9A227] transition-colors text-sm flex-shrink-0"
            >
              All Posts <ArrowRight size={15} />
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <p className="home-serif text-gray-400 text-center py-12">No posts yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link
                  key={post._id}
                  to={`/blog/${post.slug?.current || post._id}`}
                  className="group block bg-[#f7f5f0] rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-lg transition-all"
                >
                  <div className="overflow-hidden aspect-video">
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(600).height(338).fit('crop').url()}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#0A2A43]/10 flex items-center justify-center">
                        <BookOpen className="text-[#C9A227]/40" size={40} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.categories.slice(0, 2).map((cat: string) => (
                          <span key={cat} className="text-xs text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-0.5 rounded-full font-semibold">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="home-display text-lg font-bold text-[#0A2A43] mb-3 group-hover:text-[#C9A227] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>By {post.authorName || 'Ronald Obal'}</span>
                      <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="px-6 pb-5">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0A2A43] group-hover:text-[#C9A227] transition-colors">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
