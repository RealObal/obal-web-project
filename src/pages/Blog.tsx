import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { createClient } from '@sanity/client';
import { PortableText } from '@portabletext/react'; 
import { createImageUrlBuilder } from '@sanity/image-url';

const sanity = createClient({
  projectId: 'khbx2r3z',
  dataset: 'blog',
  useCdn: true,
  apiVersion: '2026-02-26',
});

const builder = createImageUrlBuilder(sanity);
const urlFor = (source: any) => builder.image(source);

const blogComponents = {
  block: {
    h1: ({children}: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-[#0A2A43]">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-[#0A2A43]">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-bold mt-6 mb-3 text-[#0A2A43]">{children}</h3>,
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
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog image'}
            className="w-full rounded-lg object-cover"
          />
          {value.caption && <figcaption className="text-sm text-gray-500 mt-2">{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

export default function Blog() {
  const { slug } = useParams<{ slug?: string }>();
  const [posts, setPosts] = useState<any[]>([]);
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    if (slug) {
      const q = `*[_type == "post" && slug.current == $slug][0]{
        _id, title, mainImage, body,
        "created_at": _createdAt,
        "authorName": author->name,
        "categories": categories[]->title,
        "slug": slug
      }`;
      sanity.fetch(q, { slug }).then((data) => {
        setPost(data || null);
        setLoading(false);
      }).catch(() => setLoading(false));
    } else {
      const query = `*[_type == "post"] | order(publishedAt desc) {
        _id, title, mainImage, slug, body,
        "created_at": _createdAt,
        "authorName": author->name,
        "categories": categories[]->title
      }`;
      sanity.fetch(query).then((data) => {
        setPosts(data || []);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [slug]);

  const toggleExpand = (id: string) => {
    setExpandedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // LOADING STATE
  if (slug) {
    if (loading) {
      return <div className="text-center py-20"><div className="inline-block w-12 h-12 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin"></div></div>;
    }

    if (!post) {
      return <div className="text-center py-20">Article not found.</div>;
    }

    return (
      <div className="min-h-screen bg-white pb-20">
        <section className="bg-[#0A2A43] text-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#C9A227]">{post.title}</h1>
            <div className="text-sm text-gray-200">
              <span className="mr-4">By {post.authorName || 'Ronald Obal'}</span>
              <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        <article className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <div className="mb-4">
              <Link to="/blog" className="text-[#2872fa] hover:underline font-semibold">&larr; Back to All Posts</Link>
            </div>

            {post.mainImage && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} className="w-full h-auto object-cover" />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} components={blogComponents} />
            </div>
          </div>
        </article>
      </div>
    );
  }

  // LIST OF POSTS
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
          const imgSrc = post.mainImage ? urlFor(post.mainImage).width(600).url() : '/About.JPG';

          return (
            <article key={post._id} className="py-8 border-b border-gray-200">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 w-full">
                  <img
                    src={imgSrc}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-56 md:h-40 object-cover object-top rounded-lg"
                  />
                </div>

                <div className="md:w-2/3 w-full">
                  <Link to={`/blog/${post.slug?.current || post._id}`} className="no-underline hover:underline">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#192a3d] mb-2">{post.title}</h3>
                  </Link>

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
                    <Link to={`/blog/${post.slug?.current || post._id}`} className="inline-flex items-center bg-[#2872fa] text-white px-4 py-2 rounded font-semibold hover:bg-blue-600">
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