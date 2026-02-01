import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all blog posts from the 'blogs' table, ordered by created_at descending
  const fetchPosts = async () => {
    try {
      setError(null); // Reset error state before fetching
      const { data, error } = await supabase
        .from('blog_posts') // Table name in Supabase
        .select('*')
        .order('created_at', { ascending: false }); // Order by created_at as specified

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching posts');
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

  // Check if content contains HTML formatting
  const isHTML = (content: string) => content.includes('<');

  // Toggle expanded state for a post
  const toggleExpanded = (postId: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Get truncated content (first 200 characters or first paragraph)
  const getTruncatedContent = (content: string) => {
    if (isHTML(content)) {
      // For HTML, strip tags and truncate
      const stripped = content.replace(/<[^>]*>/g, '');
      return stripped.length > 200 ? stripped.substring(0, 200) + '...' : stripped;
    } else {
      // For plain text, truncate by characters or first paragraph
      const paragraphs = content.split('\n\n');
      if (paragraphs[0].length > 200) {
        return paragraphs[0].substring(0, 200) + '...';
      }
      return paragraphs[0];
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#0A2A43] to-[#0A2A43]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Insights on monitoring, evaluation, accountability, learning, and social impact programming from the field.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-[#C9A227] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-600">Error: {error}</p>
              <button
                onClick={fetchPosts}
                className="mt-4 px-4 py-2 bg-[#C9A227] text-[#0A2A43] rounded-lg font-semibold hover:bg-[#C9A227]/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No articles found.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Optional performance improvement: For large number of posts, consider implementing pagination or "Load More" functionality */}
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden p-8"
                >
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(post.created_at)}
                  </div>

                  <h2 className="text-2xl font-bold text-[#0A2A43] mb-6">
                    {post.title}
                  </h2>

                  {/* Render content: Show truncated version initially, full content when expanded */}
                  <div className="prose prose-lg max-w-none text-gray-700">
                    {expandedPosts.has(post.id) ? (
                      // Full content when expanded
                      <>
                        {isHTML(post.content) ? (
                          <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        ) : (
                          <div>
                            {post.content.split('\n\n').map((paragraph, index) => (
                              <p key={index} className="mb-4 leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => toggleExpanded(post.id)}
                          className="mt-4 text-[#C9A227] font-semibold hover:underline"
                        >
                          Read Less
                        </button>
                      </>
                    ) : (
                      // Truncated content with Read More button
                      <>
                        <div>
                          {isHTML(post.content) ? (
                            <div dangerouslySetInnerHTML={{ __html: getTruncatedContent(post.content) }} />
                          ) : (
                            <p className="mb-4 leading-relaxed">
                              {getTruncatedContent(post.content)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => toggleExpanded(post.id)}
                          className="mt-4 text-[#C9A227] font-semibold hover:underline"
                        >
                          Read More
                        </button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
