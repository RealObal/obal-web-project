import { GraduationCap, Briefcase, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const X_HANDLE = 'real_obal';

const XLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function About() {
  const skills = [
    'MEAL system design',
    'Baseline, midterm & endline surveys',
    'Digital data collection: ODK, Kobo, SurveyCTO',
    'Data analysis: SPSS, STATA, Excel, PowerBI',
    'Logframes, Theory of Change, MEL frameworks',
    'Outcome Harvesting and participatory learning',
    'Report writing and documentation',
    'Safeguarding and child protection systems',
    'GBV case management',
    'Project planning & budgeting',
  ];

  const education = [
    {
      title: 'Postgraduate Diploma in Monitoring & Evaluation',
      org: 'Gulu University',
      meta: 'Completed',
      icon: '🎓',
    },
    {
      title: 'Bachelor of Arts in Education (Geography & Economics)',
      org: 'Gulu University',
      meta: '',
      icon: '🎓',
    },
  ];

  const positions = [
    {
      title: 'MEAL Manager',
      org: 'Laminopabo Child and Youth Development Center',
      meta: '2025 – Present',
    },
  ];

  const beliefs = [
    {
      title: 'Dignity in Data',
      text: 'Collect and use data in ways that respect participants, protect privacy, and prioritize human dignity over metrics.',
    },
    {
      title: 'Curiosity',
      text: 'Ask better questions, test assumptions, and let evidence guide program design and adaptations.',
    },
    {
      title: 'Empathy',
      text: 'Center the lived experiences of communities in measurement and learning to ensure findings translate to meaningful change.',
    },
  ];

  return (
    <div className="font-sans">
      <Helmet>
        <title>About — Ronald Obal</title>
        <meta name="description" content="Ronald Obal — MEAL Manager and MEARL Specialist. Professional bio, beliefs, education and skills." />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      <style>{`
        .about-display { font-family: 'Playfair Display', Georgia, serif; }
        .about-serif { font-family: 'Source Serif 4', Georgia, serif; }
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.7s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.34s; }
        .delay-4 { animation-delay: 0.46s; }
        .gold-rule::before {
          content: '';
          display: block;
          width: 48px;
          height: 3px;
          background: #C9A227;
          margin-bottom: 1rem;
        }
        .skill-pill:hover { transform: translateY(-2px); }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A2A43] text-white overflow-hidden">
        {/* Diagonal texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)',
          backgroundSize: '14px 14px',
        }} />
        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#C9A227] via-[#C9A227]/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="fade-up text-[#C9A227] text-xs font-bold uppercase tracking-[0.35em] mb-5">
              MEAL Manager · MEARL Specialist
            </p>
            <h1 className="about-display fade-up delay-1 text-5xl md:text-7xl font-black text-white leading-none mb-8">
              Ronald<br />
              <span className="text-[#C9A227]">Obal</span>
            </h1>
            <p className="fade-up delay-2 about-serif text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Designing evidence-based systems that strengthen program performance
              and generate actionable insights for learning and accountability.
            </p>
            <div className="fade-up delay-3 flex flex-wrap gap-6 mt-10 text-sm text-gray-400">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-[#C9A227]" /> Gulu & Kampala, Uganda</span>
              <span className="flex items-center gap-2"><Mail size={14} className="text-[#C9A227]" /> ronaldobal20@gmail.com</span>
              <span className="flex items-center gap-2"><Phone size={14} className="text-[#C9A227]" /> +256 776 280 494</span>
            </div>
            <div className="fade-up delay-4 mt-6">
              <a
                href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black/60 border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-black transition-colors"
              >
                <XLogo size={13} /> Follow @{X_HANDLE}
              </a>
            </div>
          </div>
        </div>

        {/* Profile photo bleeding into hero bottom-right */}
        <div className="hidden lg:block absolute bottom-0 right-16 w-72 h-80 overflow-hidden rounded-t-full border-l-4 border-r-4 border-t-4 border-[#C9A227]/30">
          <img
            src="/ronald-profile.PNG"
            alt="Ronald Obal"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A43] via-transparent to-transparent" />
        </div>
      </section>

      {/* ── PROFESSIONAL BIO ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Photo — visible on mobile too */}
            <div className="lg:hidden mb-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C9A227]/30 mx-auto shadow-xl">
                <img src="/ronald-profile.PNG" alt="Ronald Obal" className="w-full h-full object-cover object-top" />
              </div>
            </div>

            <div>
              <div className="gold-rule">
                <h2 className="about-display text-4xl font-bold text-[#0A2A43]">Professional Bio</h2>
              </div>
              <div className="about-serif space-y-5 text-gray-700 text-lg leading-relaxed mt-6">
                <p>
                  Ronald Obal is a Monitoring, Evaluation, Accountability and Learning (MEAL) professional
                  with strong experience in designing evidence-based systems, strengthening program performance,
                  and generating actionable insights for learning and accountability.
                </p>
                <p>
                  He has led MEAL functions across child protection, livelihoods, education, youth empowerment,
                  GBV response, trauma care, and community development, with expertise in MEL framework development,
                  Outcome Harvesting, digital data collection (ODK, KoboToolbox, and SurveyCTO), capacity building,
                  baseline and endline studies, data quality management, and reporting.
                </p>
                <p>
                  Ronald has experience supporting both community-based and institutional programs through
                  data-driven decision-making, performance tracking, and learning systems that improve program
                  effectiveness and accountability.
                </p>
                <p>
                  He is known for strong analytical skills, field coordination experience, and the ability to translate
                  data into practical programmatic learning and improvement. Ronald is also passionate about youth
                  participation, service delivery accountability, and evidence generation for social impact.
                </p>
              </div>
            </div>

            {/* Right: contextual card */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="/chart-data-desk.jpg"
                  alt="Ronald Obal at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A43]/90 via-[#0A2A43]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="about-serif text-white/90 text-sm italic leading-relaxed">
                    "Every data point is a person. Every insight is an opportunity to serve better."
                  </p>
                  <p className="mt-3 text-[#C9A227] text-xs font-bold uppercase tracking-widest">— Ronald Obal</p>
                </div>
              </div>
              {/* Decorative offset border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#C9A227]/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE BLOCK ──────────────────────────────────────────────────── */}
      <section className="bg-[#0A2A43] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)',
          backgroundSize: '14px 14px',
        }} />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
          <div className="text-[#C9A227] about-display text-8xl leading-none mb-4 opacity-30 select-none">"</div>
          <blockquote className="about-display text-2xl md:text-3xl font-bold text-white leading-snug -mt-10">
            Through evidence, accountability, and continuous learning, we shape programs that truly change lives.
          </blockquote>
          <p className="mt-8 text-[#C9A227] text-sm font-bold uppercase tracking-[0.3em]">Ronald Obal</p>
        </div>
      </section>

      {/* ── WHAT I BELIEVE ───────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Photo */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/ronald-profile.PNG"
                  alt="Ronald Obal"
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A2A43]/60 to-transparent" />
              </div>
              <p className="mt-4 about-serif text-sm text-gray-500 italic text-center">
                Ronald Obal · MEAL Manager & Specialist
              </p>
            </div>

            {/* Beliefs */}
            <div className="lg:col-span-7">
              <div className="gold-rule">
                <h2 className="about-display text-4xl md:text-5xl font-black text-[#0A2A43]">
                  What I Believe
                </h2>
              </div>

              <div className="mt-10 space-y-8">
                {beliefs.map((b, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] font-bold about-display text-lg group-hover:bg-[#C9A227] group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="about-display text-xl font-bold text-[#0A2A43] mb-2">{b.title}</h3>
                      <p className="about-serif text-gray-600 leading-relaxed text-lg">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="about-serif italic text-gray-500 text-lg">— Ronald Obal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SKILLS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-14">
            <div className="inline-block">
              <p className="text-[#C9A227] text-xs font-bold uppercase tracking-[0.3em] mb-3">Expertise</p>
              <h2 className="about-display text-4xl md:text-5xl font-black text-[#0A2A43]">Technical Skills</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-pill bg-[#f7f5f0] border border-gray-200 p-4 rounded-xl flex items-start gap-3 hover:border-[#C9A227] hover:shadow-md transition-all duration-200 cursor-default"
              >
                <CheckCircle className="text-[#C9A227] flex-shrink-0 mt-0.5" size={18} />
                <span className="about-serif text-gray-700 text-sm leading-relaxed">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION & POSITIONS ────────────────────────────────────────── */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-16">

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center">
                  <GraduationCap className="text-[#C9A227]" size={22} />
                </div>
                <h2 className="about-display text-3xl font-bold text-[#0A2A43]">Education</h2>
              </div>

              <div className="relative space-y-0">
                {/* vertical line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-[#C9A227]/20" />

                {education.map((ed, idx) => (
                  <div key={idx} className="relative pl-10 pb-10 last:pb-0">
                    {/* dot */}
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#C9A227] flex items-center justify-center shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <h3 className="about-display text-lg font-bold text-[#0A2A43] leading-snug mb-1">{ed.title}</h3>
                    <p className="text-[#C9A227] font-semibold text-sm">{ed.org}</p>
                    {ed.meta && <p className="text-gray-400 text-xs mt-1">{ed.meta}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Positions */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center">
                  <Briefcase className="text-[#C9A227]" size={22} />
                </div>
                <h2 className="about-display text-3xl font-bold text-[#0A2A43]">Current Positions</h2>
              </div>

              <div className="space-y-5">
                {positions.map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#C9A227]/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-[#C9A227] mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="about-display text-xl font-bold text-[#0A2A43] mb-1">{p.title}</h3>
                        <p className="text-[#C9A227] font-semibold text-sm mb-2">{p.org}</p>
                        {p.meta && (
                          <span className="inline-block bg-[#0A2A43]/5 text-[#0A2A43] text-xs font-semibold px-3 py-1 rounded-full">
                            {p.meta}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#0A2A43] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="about-display text-3xl font-bold text-white mb-3">Let's Connect</h2>
          <p className="about-serif text-gray-400 mb-8">
            Open to collaborations, consultancies, and conversations about MEAL in development and humanitarian contexts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:ronaldobal20@gmail.com"
              className="inline-flex items-center gap-2 bg-[#C9A227] text-[#0A2A43] font-bold px-6 py-3 rounded-full hover:bg-[#b8911f] transition-colors text-sm"
            >
              <Mail size={15} /> Send an Email
            </a>
            <a
              href={`https://twitter.com/intent/follow?screen_name=${X_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors text-sm"
            >
              <XLogo size={14} /> Follow on X
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}