import { GraduationCap, Briefcase, Heart, Globe, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const skills = [
    'MEAL system design',
    'Baseline, midterm & endline surveys',
    import { GraduationCap, Briefcase, Heart, Globe, CheckCircle } from 'lucide-react';
    import { Helmet } from 'react-helmet-async';

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
        },
        {
          title: 'Bachelor of Arts in Education (Geography & Economics)',
          org: 'Gulu University',
          meta: '',
        },
      ];

      const positions = [
        {
          title: 'MEAL Manager',
          org: 'Mouthpiece Initiative for Mental Health and Addiction (MIMHA)',
          meta: '2025 – Present',
        },
        {
          title: 'MEARL Specialist',
          org: 'Life + Limb Trauma Care Foundation Uganda Chapter',
          meta: '2025',
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
        <div>
          <Helmet>
            <title>About — Ronald Obal</title>
            <meta name="description" content="Ronald Obal — MEAL Manager and MEARL Specialist. Professional bio, beliefs, education and skills." />
          </Helmet>

          {/* Hero */}
          <section className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  I'm Ronald Obal — a Monitoring, Evaluation, Accountability and Learning (MEAL) professional focused on designing evidence-based systems that strengthen program performance and generate actionable insights for learning and accountability.
                </p>
              </div>
            </div>
          </section>

          {/* Professional bio and overview */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-3xl font-bold text-[#0A2A43] mb-6">Professional Bio</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      Ronald Obal is a Monitoring, Evaluation, Accountability and Learning (MEAL) professional with strong experience in designing evidence-based systems, strengthening program performance, and generating actionable insights for learning and accountability.
                    </p>
                    <p>
                      He currently serves as the <span className="font-semibold text-[#0A2A43]">MEAL Manager at Mouthpiece Initiative for Mental Health and Addiction (MIMHA)</span>, where he oversees monitoring systems, supports mental health program learning, leads evaluation activities, and ensures quality data for decision-making.
                    </p>
                    <p>
                      Ronald has led MEAL functions in multiple sectors including child protection, livelihoods, education, youth empowerment, GBV response, trauma care, and community development. His work spans MEL framework development, Outcome Harvesting, digital data collection (ODK/Kobo/SurveyCTO), capacity building, baseline and endline studies, and reporting.
                    </p>
                    <p>
                      He is known for strong analytical skills, field coordination experience, and the ability to translate data into programmatic learning and improvement.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 h-full">
                    <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden">
                      <img src="/ronald-profile.PNG" alt="Ronald Obal" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-[#0A2A43]">Ronald Obal</h3>
                      <p className="text-[#C9A227] font-semibold">MEAL Manager | MEARL Specialist</p>
                      <div className="mt-4 text-sm text-gray-600 space-y-1">
                        <p>📍 Gulu & Kampala, Uganda</p>
                        <p>📧 ronaldobal20@gmail.com</p>
                        <p>📱 +256 776 280 494</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A43] mb-4">Technical Skills</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-start space-x-3 hover:shadow-md transition-shadow">
                    <CheckCircle className="text-[#C9A227] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Profile / What I Believe section - placed under Technical Skills */}
          <section className="mt-24 py-16 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                {/* LEFT SIDE: Your Profile Photo (Col 1-5) */}
                <div className="md:col-span-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl">
                    <img src="/ronald-profile.PNG" alt="Ronald Obal" loading="lazy" className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="mt-4 text-sm text-gray-500 font-serif italic text-center">Ronald Obal, MEAL Manager & Specialist</p>
                </div>

                {/* RIGHT SIDE: What I Believe (Col 6-12) */}
                <div className="md:col-span-7">
                  <h2 className="text-4xl font-serif font-bold text-[#15803d] mb-8">What I Believe!</h2>

                  <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                    {beliefs.map((b, i) => (
                      <div key={i}>
                        <h3 className="text-xl font-semibold text-[#0A2A43]">{b.title}</h3>
                        <p>{b.text}</p>
                      </div>
                    ))}

                    <div className="pt-4">
                      <p className="font-serif italic text-gray-900">— Ronald Obal</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Education & Current Positions */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    <GraduationCap className="text-[#C9A227] mr-3" size={28} />
                    <h2 className="text-3xl font-bold text-[#0A2A43]">Education</h2>
                  </div>

                  <div className="space-y-6">
                    {education.map((ed, idx) => (
                      <div key={idx} className="border-l-4 border-[#C9A227] pl-6 py-2">
                        <h3 className="text-xl font-bold text-[#0A2A43] mb-1">{ed.title}</h3>
                        <p className="text-gray-600 font-medium">{ed.org}</p>
                        {ed.meta && <p className="text-gray-500 text-sm">{ed.meta}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-6">
                    <Briefcase className="text-[#C9A227] mr-3" size={28} />
                    <h2 className="text-3xl font-bold text-[#0A2A43]">Current Positions</h2>
                  </div>

                  <div className="space-y-6">
                    {positions.map((p, idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-[#0A2A43] mb-1">{p.title}</h3>
                        <p className="text-[#C9A227] font-semibold mb-2">{p.org}</p>
                        {p.meta && <p className="text-gray-600 text-sm">{p.meta}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
                  <p className="text-gray-600 font-medium">Geography & Economics</p>
                  <p className="text-gray-500 text-sm">Gulu University</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <Briefcase className="text-[#C9A227] mr-3" size={32} />
                <h2 className="text-3xl font-bold text-[#0A2A43]">Current Positions</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[#0A2A43] mb-2">MEAL Manager</h3>
                  <p className="text-[#C9A227] font-semibold mb-2">Mouthpiece Initiative for Mental Health and Addiction (MIMHA)</p>
                  <p className="text-gray-600 text-sm">2025 – Present</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-[#0A2A43] mb-2">MEARL Specialist</h3>
                  <p className="text-[#C9A227] font-semibold mb-2">Life + Limb Trauma Care Foundation Uganda Chapter</p>
                  <p className="text-gray-600 text-sm">2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A43] mb-4">Technical Skills</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm flex items-start space-x-3 hover:shadow-md transition-shadow"
              >
                <CheckCircle
                  className="text-[#C9A227] flex-shrink-0 mt-0.5"
                  size={20}
                />
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
