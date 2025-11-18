import { Workflow, BarChart3, Database, LineChart, FileText, Users, Settings, GraduationCap, Laptop, BookOpen, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      icon: Workflow,
      title: 'Monitoring & Evaluation System Design',
      description: 'Design and implement comprehensive MEAL systems tailored to your program needs.',
      features: ['MEL framework development', 'Logframes & Theory of Change', 'Indicator selection & definition', 'Data management systems'],
    },
    {
      icon: BarChart3,
      title: 'Surveys (Baseline/Midline/Endline)',
      description: 'Conduct rigorous assessments to measure program impact and inform decision-making.',
      features: ['Survey design & sampling', 'Field data collection', 'Statistical analysis', 'Comprehensive reporting'],
    },
    {
      icon: Database,
      title: 'Data Collection & Quality Assurance',
      description: 'Implement robust data collection processes with quality checks.',
      features: ['Digital data collection setup', 'Field team training', 'Real-time quality checks', 'Data validation protocols'],
    },
    {
      icon: LineChart,
      title: 'Data Analysis & Visualization',
      description: 'Transform raw data into meaningful insights through statistical analysis.',
      features: ['Quantitative & qualitative analysis', 'SPSS, STATA, Excel, PowerBI', 'Interactive dashboards', 'Trend analysis & forecasting'],
    },
    {
      icon: FileText,
      title: 'MEAL Frameworks & ToC Development',
      description: 'Develop clear program logic and measurement frameworks.',
      features: ['Theory of Change workshops', 'Results frameworks', 'Performance measurement plans', 'Learning agendas'],
    },
    {
      icon: Settings,
      title: 'Project Evaluations',
      description: 'Independent, rigorous evaluations that assess program effectiveness.',
      features: ['Formative & summative evaluations', 'Impact assessments', 'Outcome Harvesting', 'Utilization-focused evaluation'],
    },
    {
      icon: BookOpen,
      title: 'Reporting & Documentation',
      description: 'Clear, compelling reports that communicate findings to diverse audiences.',
      features: ['Donor reports', 'Learning briefs', 'Case studies', 'Program documentation'],
    },
    {
      icon: GraduationCap,
      title: 'Capacity Building and MEAL Training',
      description: 'Build organizational MEAL capacity through tailored training and mentorship.',
      features: ['Staff MEAL training', 'Community data collectors training', 'Organizational assessments', 'Mentorship programs'],
    },
    {
      icon: Laptop,
      title: 'Digital Tools Setup (Kobo, ODK, SurveyCTO)',
      description: 'Set up and optimize digital data collection platforms.',
      features: ['Tool customization', 'Form programming', 'Server configuration', 'User training & support'],
    },
    {
      icon: Users,
      title: 'Program Learning & Accountability',
      description: 'Foster a culture of learning and accountability through structured reflection.',
      features: ['Learning workshops', 'Feedback loops', 'Adaptive management support', 'Community accountability systems'],
    },
    {
      icon: Brain,
      title: 'Mental Health Program MEL Support',
      description: 'Specialized MEAL services for mental health and psychosocial support programs.',
      features: ['Client progress tracking', 'Outcome measurement', 'Case management systems', 'Program quality monitoring'],
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Services</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Comprehensive MEAL services designed to strengthen program performance, ensure accountability, and generate actionable insights for learning and impact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/80 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="text-[#C9A227]" size={28} />
                </div>

                <h3 className="text-xl font-bold text-[#0A2A43] mb-3">{service.title}</h3>

                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Strengthen Your MEAL Systems?</h2>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Let's discuss how I can support your organization with evidence-based monitoring, evaluation, accountability, and learning solutions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-[#C9A227] text-[#0A2A43] font-semibold rounded-lg hover:bg-[#C9A227]/90 transition-all transform hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A43] mb-4">Specialized Sectors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience across multiple development sectors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Mental Health & Addiction', 'Child Protection', 'Community Development', 'Education', 'Youth Empowerment', 'GBV Response', 'Trauma Care', 'Livelihoods'].map((sector, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg text-center font-semibold text-[#0A2A43] hover:bg-[#C9A227]/10 transition-colors"
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
