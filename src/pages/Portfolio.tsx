import { Briefcase, Calendar, MapPin, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function Portfolio() {
  const experiences = [
    {
      role: 'MEAL Manager',
      organization: 'Laminopabo Child and Youth Development Center',
      period: '2025 – Present',
      location: 'Gulu & Kampala, Uganda',
      type: 'Current Position',
      achievements: [
        'Designed and managed MEAL systems for mental health and addiction recovery programs',
        'Led data collection, case tracking, and client progress monitoring',
        'Strengthened program accountability and reporting systems',
        'Supported learning for counseling, rehabilitation, and advocacy programs',
      ],
      impact: ['Improved program quality', 'Enhanced accountability', 'Data-driven decisions'],
    },
    {
      role: 'MEARL Asistant',
      organization: 'Life + Limb Trauma Care Foundation Uganda Chapter',
      period: '2025',
      location: 'Uganda (Nationwide)',
      type: 'Previous Position',
      achievements: [
        'Established national MEARL system for trauma care programs across Uganda',
        'Developed tools, data flows, and reporting structures',
        'Supported scale-up from Northern Uganda to nationwide operations',
        'Strengthened monitoring for emergency trauma response programs',
      ],
      impact: ['National scale-up', 'Systematic monitoring', 'Quality improvement'],
    },
    {
      role: 'Project Officer – Child & Community Development',
      organization: 'Laminopabo Child Development Center',
      period: '2024 – 2025',
      location: 'Northern Uganda',
      type: 'Previous Position',
      achievements: [
        'Successfully reintegrated 31 school dropouts through home visits, counseling, and ICT support',
        'Trained 52 caregivers in baking & horticulture, with 24 starting independent enterprises',
        'Implemented financial literacy programs & supported VSLA formation',
        'Represented the center in district-level advocacy and planning platforms',
        'Conducted youth monitoring presented on Speak FM (EU-funded YATA initiative)',
        'Led positive parenting training for 1000+ caregivers',
      ],
      impact: ['31 children reintegrated', '1000+ caregivers trained', '24 enterprises started'],
    },
  ];

  const communityWork = [
    {
      title: 'Community Development & Advocacy',
      items: [
        'Facilitated caregiver CBO registration (HIV+ support group)',
        'Coordinated advocacy representation during IWD, DAC, World AIDS Day',
        'Conducted MEL support for Primary Trauma Care Foundation Uganda',
        'Education Development Lead in clan leadership',
      ],
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfolio</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              A track record of designing and implementing MEAL systems that strengthen program performance across mental health, child protection, trauma care, and community development sectors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Years of Experience', value: '3+' },
              { label: 'Organizations Engaged', value: '4+' },
              { label: 'Projects Completed', value: '10+' },
              { label: 'Beneficiaries Served', value: '1,000+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C9A227] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="text-[#C9A227]" size={24} />
                      <h3 className="text-2xl font-bold text-[#0A2A43]">{exp.role}</h3>
                    </div>
                    <p className="text-lg font-semibold text-gray-700 mb-2">{exp.organization}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {exp.period}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      exp.type === 'Current Position'
                        ? 'bg-[#C9A227] text-[#0A2A43]'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {exp.type}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#0A2A43] mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle
                          className="text-[#C9A227] flex-shrink-0 mt-0.5"
                          size={18}
                        />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-[#0A2A43] mb-3 flex items-center">
                    <TrendingUp className="mr-2" size={18} />
                    Impact Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.impact.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border border-[#C9A227] text-[#0A2A43] rounded-full text-sm font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Users className="text-[#C9A227] mr-3" size={32} />
            <h2 className="text-3xl font-bold text-[#0A2A43]">Community Development & Advocacy</h2>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8">
            {communityWork.map((work, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-[#0A2A43] mb-4">{work.title}</h3>
                <ul className="space-y-3">
                  {work.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Award
                        className="text-[#C9A227] flex-shrink-0 mt-0.5"
                        size={18}
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A43] mb-4">Sectors & Thematic Areas</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Mental Health & Addiction', 'Child Protection', 'Trauma Care', 'Community Development', 'Education', 'Youth Empowerment', 'GBV Response', 'Livelihoods', 'HIV/AIDS Programming', 'Financial Inclusion', 'Advocacy & Representation', 'Capacity Building'].map((sector, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-4 rounded-lg text-center font-semibold text-[#0A2A43] hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
