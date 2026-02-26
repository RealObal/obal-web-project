import { useState, useEffect } from 'react';
import { Calendar, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
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

      <div className="max-w-3xl mx-auto mt-12 px-4">
        {loading ? (
          <div className="text-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C9A227] mx-auto"></div></div>
        ) : posts.map((post) => {
          const isExpanded = expandedPosts[post._id];
          
          return (
            <article key={post._id} className="bg-white p-8 md:p-12 rounded-2xl shadow-md border border-gray-100 mb-12 transition-all">
              {post.mainImage && (
                <img src={urlFor(post.mainImage).url()} alt={post.title} className="w-full h-72 object-cover rounded-xl mb-8 shadow-sm" />
              )}
              
              {/* Date and Author Stack */}
              <div className="space-y-1 mb-6 text-sm">
                <div className="flex items-center text-gray-500 uppercase tracking-wider font-semibold">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center text-[#0A2A43]">
                  <span className="font-bold mr-1 text-gray-500 italic text-xs">Author:</span>
                  <span className="font-bold">{post.authorName || 'Ronald Obal'}</span>
                </div>
                
                {/* Categories (Tags) */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {post.categories.map((cat: string) => (
                      <span key={cat} className="bg-[#f0f7ff] text-[#0A2A43] px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-blue-100">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <h2 className="text-3xl font-extrabold text-[#0A2A43] mb-8 leading-tight">{post.title}</h2>
              
              <div className={`overflow-hidden transition-all ${!isExpanded ? 'max-h-40 relative' : 'max-h-full'}`}>
                <PortableText value={post.body} components={blogComponents} />
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </div>

              <button 
                onClick={() => toggleExpand(post._id)}
                className="mt-6 flex items-center gap-2 text-[#C9A227] font-bold hover:text-[#0A2A43] transition-colors"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp size={20} /></>
                ) : (
                  <>Read Full Article <ChevronDown size={20} /></>
                )}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}