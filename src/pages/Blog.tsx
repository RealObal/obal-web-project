import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createClient } from '@sanity/client';
import { PortableText } from '@portabletext/react'; 
import imageUrlBuilder from '@sanity/image-url';

const sanity = createClient({
  projectId: 'khbx2r3z',
  dataset: 'blog',
  useCdn: true,
  apiVersion: '2026-02-26',
});

const builder = imageUrlBuilder(sanity);
const urlFor = (source: any) => builder.image(source);

const blogComponents = {
  block: {
    h1: ({children}: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-[#0A2A43]">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-[#0A2A43]">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-[#0A2A43]">{children}</h3>,
    // ADDED text-justify HERE
    normal: ({children}: any) => <p className="mb-4 text-gray-700 leading-relaxed text-justify">{children}</p>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc ml-6 mb-6 space-y-2 text-gray-700 text-justify">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-gray-700 text-justify">{children}</ol>,
  },
  marks: {
    bold: ({children}: any) => <strong className="font-bold text-gray-900">{children}</strong>,
    link: ({value, children}: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#C9A227] hover:underline font-medium">
        {children} <ExternalLink size={14} className="inline mb-1" />
      </a>
    ),
  },
};

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const query = `*[_type == "post"] | order(publishedAt desc) { 
      _id, 
      title, 
      mainImage, 
      body, 
      "created_at": _createdAt,
      "authorName": author->name,
      "categories": categories[]->title
    }`;
    
    sanity.fetch(query).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <section className="bg-[#0A2A43] text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-[#C9A227]">MEAL Insights & Field Notes</h1>
          <p className="text-xl text-gray-300">Evidence-based lessons from the field</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto mt-12 px-4">
        {loading ? (
          <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C9A227] mx-auto"></div></div>
        ) : posts.map((post) => {
          const isExpanded = expandedPosts[post._id];
          const imgSrc = post.mainImage ? urlFor(post.mainImage).url() : '/About.JPG';

          return (
            <article key={post._id} className="py-8 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image column */}
                <div className="md:w-1/3 w-full">
                  <img
                    src={imgSrc}
                    alt={post.title}
                    className="w-full h-56 md:h-40 object-cover rounded-lg"
                  />
                </div>

                {/* Content column */}
                <div className="md:w-2/3 w-full">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#192a3d] mb-2">{post.title}</h3>

                  <div className="text-sm text-gray-500 mb-4">
                    <span className="mr-4">By {post.authorName || 'Ronald Obal'}</span>
                    <span className="mr-4">{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    {post.categories && post.categories.length > 0 && (
                      <span className="text-gray-400">{post.categories.join(', ')}</span>
                    )}
                  </div>

                  <div className={`text-gray-700 transition-all ${!isExpanded ? 'max-h-24 overflow-hidden relative' : 'max-h-full'}`}>
                    <PortableText value={post.body} components={blogComponents} />
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent"></div>
                    )}
                  </div>

                  <div className="mt-4">
                    <Link to={`/blog/${post._id}`} className="inline-flex items-center bg-[#2872fa] text-white px-4 py-2 rounded font-semibold hover:bg-blue-600">
                      Read More
                    </Link>
                    <button onClick={() => toggleExpand(post._id)} className="ml-4 text-sm text-gray-600 hover:underline">
                      {isExpanded ? 'Show Less' : 'Read Full Article'} {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}