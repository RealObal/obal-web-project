import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, FileText, ArrowRight, Award } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Organizations Served', value: '10+' },
    { label: 'Lives Impacted', value: '1000+' },
  ];

  const highlights = [
    {
      icon: BarChart3,
      title: 'MEAL System Design',
      description: 'Comprehensive monitoring, evaluation, accountability and learning frameworks',
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Insights',
      description: 'Transform raw data into actionable insights for program improvement',
    },
    {
      icon: Users,
      title: 'Capacity Building',
      description: 'Training and mentorship in MEAL best practices and digital tools',
    },
    {
      icon: FileText,
      title: 'Impact Evaluation',
      description: 'Baseline, midline, and endline studies with rigorous analysis',
    },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-[#0A2A43] via-[#0A2A43] to-[#0A2A43]/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A227] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A227] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="text-[#C9A227]" size={18} />
              <span className="text-sm font-medium">MEAL Manager | MEARL Specialist</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Evidence-Based Systems for <span className="text-[#C9A227]">Social Impact</span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Transforming programs through robust monitoring, evaluation, accountability, and learning systems. Specialized in mental health, child protection, and community development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#C9A227] text-[#0A2A43] font-semibold rounded-lg hover:bg-[#C9A227]/90 transition-all transform hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0A2A43] transition-all"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#C9A227] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A43] mb-4">Core Expertise</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive MEAL services designed to strengthen program performance and accountability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="text-[#C9A227]" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#0A2A43] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Currently Serving as MEAL Manager</h2>
              <p className="text-xl text-gray-200 mb-6">
                Leading monitoring, evaluation, accountability and learning at Mouthpiece Initiative for Mental Health and Addiction (MIMHA) — strengthening mental health program systems across Uganda.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-[#C9A227] font-semibold hover:underline"
              >
                Learn more about my journey
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
