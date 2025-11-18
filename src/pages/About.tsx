import { GraduationCap, Briefcase, Heart, Globe, CheckCircle } from 'lucide-react';

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

  const values = [
    {
      icon: Heart,
      title: 'Empathy & Purpose',
      description:
        'Shaped by experience in children\'s ministries, I bring deep empathy and purpose-driven dedication to community impact.',
    },
    {
      icon: CheckCircle,
      title: 'Evidence-Based Practice',
      description:
        'Strong commitment to generating actionable insights through rigorous monitoring and evaluation.',
    },
    {
      icon: Globe,
      title: 'Field Adaptability',
      description:
        'Proven ability to work effectively in diverse environments, from remote communities to urban settings.',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              I'm a Monitoring, Evaluation, Accountability and Learning (MEAL) professional dedicated to designing evidence-based systems that strengthen program performance and generate actionable insights.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 h-full">
                <div className="w-32 h-32 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-[#C9A227] text-6xl font-bold">RO</span>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#0A2A43] mb-2">Ronald Obal</h2>
                  <p className="text-[#C9A227] font-semibold mb-4">MEAL Manager | MEARL Specialist</p>
                  <div className="space-y-2 text-gray-600">
                    <p>📍 Gulu & Kampala, Uganda</p>
                    <p>🌐 English, Luo</p>
                    <p>📧 ronaldobal20@gmail.com</p>
                    <p>📱 +256 776 280 494</p>
                  </div>
                </div>
              </div>
            </div>

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
                  He is known for his strong analytical skills, field coordination experience, and ability to work in any environment. His experience in children's ministries has also played a significant role in shaping his purpose, empathy, and dedication to community impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A43] mb-4">Core Values</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="text-[#C9A227]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0A2A43] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap className="text-[#C9A227] mr-3" size={32} />
                <h2 className="text-3xl font-bold text-[#0A2A43]">Education</h2>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-[#C9A227] pl-6 py-2">
                  <h3 className="text-xl font-bold text-[#0A2A43] mb-2">Postgraduate Diploma in Monitoring & Evaluation</h3>
                  <p className="text-gray-600 font-medium">Gulu University</p>
                  <p className="text-gray-500 text-sm">Completed</p>
                </div>

                <div className="border-l-4 border-[#C9A227] pl-6 py-2">
                  <h3 className="text-xl font-bold text-[#0A2A43] mb-2">Bachelor of Arts in Education</h3>
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
