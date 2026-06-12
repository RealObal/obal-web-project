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
            {['Published Research', 'Under Review', 'Research in Progress'].map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-[#C9A227] font-bold">{cat}</p>
                    <h3 className="text-2xl font-bold text-[#0A2A43] mt-3">{cat} updates and publications</h3>
                  </div>
                  <div className="text-[#0A2A43] text-sm font-semibold">Latest insights</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#f7f5f0] p-6 rounded-3xl border border-transparent hover:border-[#C9A227]/30 transition-all">
                    <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-[0.28em] text-[#C9A227] font-bold">
                      <span>{cat}</span>
                      <span>2024</span>
                    </div>
                    <h4 className="text-xl font-semibold text-[#0A2A43]">Representative work and progress summaries</h4>
                    <p className="mt-3 text-sm text-gray-600">Clear findings that help donors, partners, and program teams understand the impact of research and MEAL engagements.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-[#f7f5f0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227] font-bold mb-4">Ready to collaborate?</p>
          <h2 className="display-font text-4xl font-bold text-[#0A2A43] mb-6">Let’s turn your data into impact.</h2>
          <p className="text-gray-600 text-lg mb-10">If you’re looking for research, analytics, or MEAL support, I can help shape insights into strategy and results.</p>
          <a href="mailto:hello@ronaldobal.com" className="inline-flex items-center gap-3 bg-[#0A2A43] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#112d4a] transition-colors">
            <Mail size={20} /> Contact Me
          </a>
        </div>
      </section>
    </div>
  );
};

export default DataAnalyticsPortfolio;
