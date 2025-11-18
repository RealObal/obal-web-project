import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogPost as BlogPostType } from '../types';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        navigate('/blog');
        return;
      }

      setPost(data);

      const { data: related } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', data.category)
        .neq('id', data.id)
        .order('published_date', { ascending: false })
        .limit(3);

      setRelatedPosts(related || []);
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Blog
          </Link>

          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-4">
            <span className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {formatDate(post.published_date)}
            </span>
            <span className="flex items-center">
              <Tag size={16} className="mr-2" />
              {post.category}
            </span>
            <span className="flex items-center">
              <User size={16} className="mr-2" />
              {post.author}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.image_url && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-bold text-[#0A2A43] mt-8 mb-4"
                  >
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }

              if (paragraph.startsWith('# ')) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold text-[#0A2A43] mt-10 mb-4"
                  >
                    {paragraph.replace('# ', '')}
                  </h2>
                );
              }

              if (paragraph.match(/^\d+\./)) {
                const items = paragraph.split('\n');
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-gray-700">
                        {item.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }

              if (paragraph.startsWith('-')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4">
                    {items.map((item, idx) => (
                      <li key={idx} className="text-gray-700">
                        {item.replace(/^-\s*/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#0A2A43] mb-8">Related Articles</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="h-40 overflow-hidden bg-gray-200">
                    <img
                      src={relatedPost.image_url || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#0A2A43] mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
