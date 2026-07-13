import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, BarChart3, TrendingUp, Users, FlaskConical, 
  Globe, FileText, Database, Calendar, MapPin, Mail, 
  Phone, Award, GraduationCap, Briefcase, Settings, 
  Laptop, Brain, CheckCircle, Send, FileDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';

// SEO Component (mimicking the project's 'rr' utility)
const SEO = ({ title, description, path, jsonLd }) => (
  <React.Fragment>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`https://ronaldobal.com${path}`} />
    {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
  </React.Fragment>
);

const DataAnalyticsPortfolio = () => {
  const [formState, setFormState] = useState({ name: "", email: "", organization: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stats = [
    { label: "Caregivers Trained", value: 1000, suffix: "+" },
    { label: "Children Supported", value: 347, suffix: "" },
    { label: "Research & MEAL Activities", value: 30, suffix: "+" },
    { label: "Studies Conducted", value: 5, suffix: "+" }
  ];

  const researchProjects = [
    { title: "Educational Inequality in Uganda", status: "Ongoing", type: "DHS Analysis" },
    { title: "Impacts of Drought on Soybean Production", status: "Completed", type: "Agriculture" },
    { title: "Cultural Influences on Domestic Adoption", status: "Manuscript Development", type: "Social Research" },
    { title: "Problem Tree Analysis for Community Development", status: "Published", type: "Methodology" }
  ];

  const dashboards = [
    { title: "Education Inequality Dashboard", status: "Coming Soon", icon: BarChart3 },
    { title: "Child Protection Dashboard", status: "Planned", icon: Users },
    { title: "Community Development Dashboard", status: "Planned", icon: Globe }
  ];

  const PUBLICATIONS = [
    {
      category: 'Published Research',
      title: 'Cardiac Tamponade Secondary to Massive Pericardial Effusion in Severe Primary Hypothyroidism: A Case Report',
      authors: 'James Nelson Okema, Dan Langoya Oriba, Jerom Okot, Ivaan Pitua, Christopher Odong, Donald Otika, Felix Bongomin, Ronald Olum, Ronald Obal',
      journal: 'International Medical Case Reports Journal',
      year: '2026',
      doi: '10.2147/IMCRJ.S610746',
      url: 'https://doi.org/10.2147/IMCRJ.S610746',
      description: 'A clinical case report analyzing a rare presentation of severe primary hypothyroidism presenting as cardiac tamponade, highlighting diagnostic and management challenges in resource-limited settings.'
    },
    {
      category: 'Under Review',
      title: 'Data Collected, Intelligence Lost: The Structural Suppression of Learning in Community-Based MEAL Systems in Post-Conflict Northern Uganda',
      authors: 'Ronald Obal',
      journal: 'SocArXiv / OSF Preprints',
      year: '2026',
      doi: '10.31219/osf.io/wsd9a_v1',
      url: 'https://doi.org/10.31219/osf.io/wsd9a_v1',
      description: 'Examines how community-based MEAL systems are designed for upward donor reporting rather than adaptive learning, proposing a zero-added-burden operational blueprint for local organizations.'
    },
    {
      category: 'Research in Progress',
      title: 'Drought Impacts on Soybean Production and Smallholder Adaptation: Implications for Food and Nutrition Security in Northern Uganda',
      authors: 'Ronald Obal, James Nelson Okema',
      journal: 'ResearchGate Dataset & Preprint',
      year: '2026',
      url: 'https://www.researchgate.net/profile/Ronald-Obal',
      description: 'An empirical study based on survey responses from 384 soybean farmers and 10 years of historical rainfall data (2010–2020) in Omoro District, investigating climate adaptation strategies.'
    }
  ];

  const skills = [
    { title: "Data Analysis", icon: BarChart3, items: ["SPSS", "Power BI", "Excel", "KoboToolbox"] },
    { title: "Research", icon: FlaskConical, items: ["Quantitative Research", "Qualitative Research", "Systematic Reviews", "Survey Design"] },
    { title: "MEAL", icon: CheckCircle, items: ["Monitoring", "Evaluation", "Accountability", "Learning"] },
    { title: "Data Visualization", icon: Laptop, items: ["Dashboards", "Data Storytelling", "Reporting", "Mapping"] }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://ronaldobal.com/#person",
        "name": "Ronald Obal",
        "jobTitle": "MEAL Manager & Data Analyst"
      },
      {
        "@type": "ResearchProject",
        "name": "Educational Inequality in Uganda: Evidence from DHS 2024–25",
        "description": "Investigates household wealth, geography, and gender influences on educational outcomes.",
        "author": { "@id": "https://ronaldobal.com/#person" }
      }
    ]
  };

  return (
    <div className="font-sans text-[#374151]">
      <SEO 
        title="Data Analytics & Research Portfolio | Ronald Obal"
        description="Explore data analytics, monitoring and evaluation, research projects, and publications by Ronald Obal. Featuring DHS analysis and MEAL systems."
        path="/data-analytics-research-portfolio"
        jsonLd={jsonLd}
      />

      <style>{`
        .display-font { font-family: 'Playfair Display', Georgia, serif; }
        .serif-font { font-family: 'Source Serif 4', Georgia, serif; }
        .fade-up { opacity: 0; transform: translateY(28px); animation: fadeUp 0.75s ease forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .gold-bar::before { content:''; display:block; width:48px; height:3px; background:#C9A227; margin-bottom:1rem; }
        .project-card:hover { transform: translateY(-4px); border-color: #C9A227; }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-[#0A2A43] text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.045]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A227 0, #C9A227 1px, transparent 0, transparent 50%)", backgroundSize: "14px 14px" }}></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-[#C9A227] text-xs font-bold uppercase tracking-[0.35em] mb-5">Analytics & Research</p>
            <h1 className="display-font text-5xl md:text-7xl font-black leading-tight mb-6">
              Turning Data into <span className="text-[#C9A227]">Evidence</span>
            </h1>
            <p className="serif-font text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
              I use data analysis, M&E, and learning systems to generate actionable insights that improve education, health, and community outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-[#C9A227] text-[#0A2A43] font-bold px-8 py-3 rounded-full hover:bg-[#b8911f] transition-all">Explore Projects</a>
              <a href="#contact" className="border border-white/20 text-white font-semibold px-8 py-3 rounded-full hover:border-[#C9A227] hover:text-[#C9A227] transition-all">Contact Me</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 fade-up" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                <div className="display-font text-4xl font-black text-[#C9A227] mb-2">
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="gold-bar flex flex-col items-center">
            <h2 className="display-font text-4xl font-bold text-[#0A2A43]">About This Portfolio</h2>
          </div>
          <div className="serif-font text-lg text-gray-600 leading-relaxed space-y-6 mt-8">
            <p>
              This portfolio showcases data analytics, monitoring and evaluation, and research projects focused on education, child wellbeing, public health, and development programming.
            </p>
            <p>
              Using SPSS, Excel, Power BI, KoboToolbox, and advanced research methods, I transform complex datasets into evidence that supports decision-making, accountability, and program improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 bg-[#0A2A43] p-12 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A227] opacity-10 rounded-full -mr-16 -mt-16"></div>
              <span className="inline-block bg-[#C9A227] text-[#0A2A43] text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-6">Research in Progress</span>
              <h3 className="display-font text-3xl font-bold mb-6">Educational Inequality in Uganda: Evidence from DHS 2024–25</h3>
              <p className="serif-font text-gray-300 mb-8">
                This project investigates how household wealth, geographic location, gender, and socioeconomic characteristics influence educational outcomes among children in Uganda.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Database size={18} className="text-[#C9A227]" />
                  <span className="text-sm font-medium">Dataset: Uganda DHS/MIS 2024–25</span>
                </div>
                <div className="flex items-center gap-3">
                  <Settings size={18} className="text-[#C9A227]" />
                  <span className="text-sm font-medium">Methodology: Regression & Equity Analysis</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-12">
              <h4 className="font-bold text-[#0A2A43] mb-6 uppercase text-xs tracking-widest">Expected Outputs</h4>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {['Journal Article', 'Interactive Dashboard', 'Policy Brief', 'Data Story'].map((output, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500" /> {output}
                  </div>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 text-[#0A2A43] font-bold border-b-2 border-[#C9A227] pb-1 hover:text-[#C9A227] transition-colors">
                View Research Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Research Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="display-font text-4xl font-bold text-[#0A2A43]">Research Projects</h2>
            <div className="w-20 h-1 bg-[#C9A227] mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchProjects.map((p, i) => (
              <div key={i} className="project-card bg-[#f7f5f0] p-8 rounded-2xl border border-transparent transition-all">
                <p className="text-[10px] font-bold text-[#C9A227] uppercase tracking-widest mb-3">{p.status}</p>
                <h3 className="display-font font-bold text-[#0A2A43] mb-4 leading-snug">{p.title}</h3>
                <p className="text-xs text-gray-500 font-semibold">{p.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section className="py-24 bg-[#0A2A43] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="display-font text-4xl font-bold mb-12">Data Dashboards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {dashboards.map((db, i) => (
              <div key={i} className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-[#C9A227]/50 transition-colors">
                <div className="w-full aspect-video bg-black/20 rounded-lg flex items-center justify-center mb-6">
                  <db.icon size={48} className="text-white/10 group-hover:text-[#C9A227]/30 transition-colors" />
                </div>
                <h3 className="font-bold text-lg mb-2">{db.title}</h3>
                <p className="text-xs font-bold text-[#C9A227] uppercase tracking-widest">{db.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="display-font text-4xl font-bold text-[#0A2A43] mb-14">Publications</h2>
          
          <div className="space-y-12">
            {['Published Research', 'Under Review', 'Research in Progress'].map((cat, idx) => {
              const catPubs = PUBLICATIONS.filter(p => p.category === cat);
              return (
                <div key={idx}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9A227] mb-6 border-l-4 border-[#C9A227] pl-4">{cat}</h3>
                  <div className="space-y-4 mb-10">
                    {catPubs.map((pub, pIdx) => (
                      <div key={pIdx} className="bg-[#f7f5f0] p-8 rounded-2xl border border-gray-100 flex flex-col justify-between items-start gap-4">
                        <div className="w-full">
                          <div className="flex items-center gap-3 mb-2 text-xs font-bold text-gray-400">
                            <span>{pub.journal}</span>
                            <span>•</span>
                            <span>{pub.year}</span>
                          </div>
                          <h4 className="display-font text-xl font-bold text-[#0A2A43] mb-2">{pub.title}</h4>
                          <p className="text-xs text-gray-500 font-semibold mb-2">Authors: {pub.authors}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{pub.description}</p>
                        </div>
                        {(pub.doi || pub.url) && (
                          <div className="flex flex-wrap gap-4 items-center mt-2">
                            {pub.doi && (
                              <a 
                                href={`https://doi.org/${pub.doi}`}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A2A43] bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#C9A227] hover:text-[#C9A227] transition-all"
                              >
                                <span>DOI:</span>
                                <span className="font-mono text-gray-600">{pub.doi}</span>
                              </a>
                            )}
                            {pub.url && (
                              <a 
                                href={pub.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A227] hover:text-[#0A2A43] transition-colors"
                              >
                                View Publication <ArrowRight size={14} />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    {catPubs.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No publications listed in this category yet.</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-[#f7f5f0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="display-font text-4xl font-black text-[#0A2A43]">Technical Stack</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <skill.icon className="text-[#C9A227] mb-6" size={32} />
                <h3 className="font-bold text-[#0A2A43] mb-4">{skill.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span key={j} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-200">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="display-font text-4xl font-bold text-[#0A2A43] mb-12">Professional Journey</h2>
          <div className="space-y-12 relative border-l-2 border-gray-100 ml-4 pl-10">
            {[
              { role: "MEAL Manager", org: "Mouthpiece Initiative for Mental Health and Addiction (MIMHA)" },
              { role: "MEARL Specialist", org: "Life + Limb Trauma Care Foundation Uganda" },
              { role: "Education Development Lead", org: "Laminopabo Child Development Center" }
            ].map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[51px] top-1.5 w-5 h-5 rounded-full bg-[#C9A227] border-4 border-white shadow-sm"></div>
                <h3 className="font-bold text-[#0A2A43] text-lg">{exp.role}</h3>
                <p className="text-gray-500">{exp.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#0A2A43] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="display-font text-4xl font-bold mb-8">Contact & Collaboration</h2>
            <p className="serif-font text-gray-400 text-lg mb-10">
              I am available for research consulting, data analysis projects, and MEAL system design for development initiatives.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#C9A227]"><Mail /></div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">Email</p>
                  <a href="mailto:ronaldobal20@gmail.com" className="hover:text-[#C9A227]">ronaldobal20@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#C9A227]"><Phone /></div>
                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">Phone</p>
                  <a href="tel:+256776280494" className="hover:text-[#C9A227]">+256 776 280 494</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 text-gray-800">
            {isSubmitted ? (
              <div className="text-center py-10">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[#0A2A43]">Message Sent!</h3>
                <p className="text-gray-500 mt-2">I will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Name *</label>
                    <input 
                      type="text" required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C9A227]/40 outline-none"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Email *</label>
                    <input 
                      type="email" required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C9A227]/40 outline-none"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Organization</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C9A227]/40 outline-none"
                    value={formState.organization}
                    onChange={(e) => setFormState({...formState, organization: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Message *</label>
                  <textarea 
                    required rows="4"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C9A227]/40 outline-none resize-none"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-[#0A2A43] text-white font-bold py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : <>Send Message <Send size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataAnalyticsPortfolio;