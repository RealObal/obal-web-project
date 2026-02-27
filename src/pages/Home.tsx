import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, FileText, ArrowRight, Award } from 'lucide-react';
import CountUp from 'react-countup';
import { Helmet } from 'react-helmet-async';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const stats = [
    { label: 'Years Experience', value: 2 },
    { label: 'Projects Completed', value: 20 },
    { label: 'Organizations Served', value: 10 },
    { label: 'Lives Impacted', value: 1000 },
  ];

  // configure sanity client exactly as in Blog.tsx
  const sanity = createClient({
    projectId: 'khbx2r3z',
    dataset: 'blog',
    useCdn: true,
    apiVersion: '2026-02-26',
  });
  const builder = imageUrlBuilder(sanity);
  const urlFor = (source: any) => builder.image(source);

  useEffect(() => {
    const q = `*[_type == "post"] | order(publishedAt desc)[0..2] { _id, title, mainImage, "created_at": _createdAt }`;
    sanity.fetch(q).then((data) => setRecentPosts(data));
  }, []);

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
      <Helmet>
        <title>Ronald Obal - MEAL Manager & MEARL Specialist | Evidence-Based Systems for Social Impact</title>
        <meta name="description" content="Ronald Obal is a MEAL Manager and MEARL Specialist designing evidence-based systems for monitoring, evaluation, accountability, and learning in mental health, child protection, and community development." />
        <link rel="canonical" href="https://ronaldobal.com/" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" type="image/png" href="/Logo1.png" />
      </Helmet>
      <section className="relative w-full">
        {/* The Curved Background Wrapper */}
        <div 
          className="absolute inset-0 bg-[#192a3d] z-0"
          style={{ clipPath: 'ellipse(150% 100% at 50% 0%)' }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 pt-24 pb-40 items-center">
          {/* Left Column: Information */}
          <div className="text-white">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              Ronald Obal
            </h1>
            <p className="text-xl md:text-2xl font-sans tracking-wide text-blue-200 mb-8 uppercase">
              MEAL Manager | MEARL Specialist
            </p>
            <div className="border-l-4 border-white/20 pl-6 italic text-lg opacity-90 max-w-md">
              "Evidence-based systems generating actionable insights for social impact."
            </div>
          </div>

          {/* Right Column: The Circular Overlapping Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-96 md:h-96 -mb-32 md:-mb-48 z-20">
              <div className="w-full h-full rounded-full border-[10px] border-white shadow-2xl overflow-hidden bg-gray-100">
                  <img 
                    src="/ronald-profile.PNG" 
                    alt="Ronald Obal" 
                    className="w-full h-full object-cover object-top"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Summary (split two-column) - image left, bio right */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: tall About image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-lg aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/About.JPG"
                alt="Ronald Obal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: heading, underline, and bio */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#15803d] mb-4">About Ronald Obal</h2>
            <div className="h-1 w-20 bg-[#15803d] mb-6 rounded"></div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                Ronald Obal is a MEAL Manager at Mouthpiece Initiative for Mental Health and Addiction (MIMHA),
                where he leads monitoring, evaluation, accountability and learning systems that strengthen program
                performance and accountability. He designs evidence-based systems and tools that turn field data into
                actionable insights for program improvement and strategic decision-making.
              </p>

              <p>
                With deep expertise in implementation research and MEARL approaches, Ronald supports organizations to
                build capacity, establish rigorous evaluation frameworks, and create feedback loops that improve
                outcomes for communities. His work focuses on developing sustainable data systems that prioritize
                learning and accountability in mental health, child protection, and community development programs.
              </p>

              <p>
                Ronald combines technical leadership with a collaborative approach to strengthen evidence-informed
                programming across low-resource settings.
              </p>
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
                  <CountUp end={stat.value} duration={2} suffix="+" />
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

      {/* Small green divider between Core Expertise and Read Recent Blog */}
      <div className="flex justify-center -mt-6">
        <div className="h-1 w-20 bg-[#15803d] rounded"></div>
      </div>

      {/* Recent blog posts preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A43] mb-4">Read Recent Blog</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Latest insights from the field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post._id}`}
                className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 overflow-hidden"
              >
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#0A2A43] mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </Link>
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
                Leading monitoring, evaluation, accountability and learning at Mouthpiece Initiative for Mental Health and Addiction (MIMHA) strengthening mental health program systems across Uganda.
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
