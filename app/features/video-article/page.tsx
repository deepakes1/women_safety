'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: 'blog' | 'video';
  url: string;
  date: string;
  source: string;
}

export default function VideoArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState<'all' | 'blog' | 'video'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const generateArticles = async (apiKey: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates articles about women&apos;s safety. Generate 5 different articles with titles, descriptions, and relevant information."
            },
            {
              role: "user",
              content: "Please generate 5 articles about women&apos;s safety, including topics like self-defense, travel safety, workplace safety, digital safety, and emergency preparedness. Each article should have a title, detailed description, and practical tips."
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from OpenAI API');
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;

      // Parse the generated content into articles
      const parsedArticles = generatedContent.split('\n\n').map((content: string, index: number) => {
        const lines = content.split('\n');
        const title = lines[0].replace('Title: ', '');
        const description = lines.slice(1).join('\n');
        
        return {
          id: `article-${index}`,
          title: title,
          description: description,
          type: 'blog',
          url: '#',
          date: new Date().toISOString().split('T')[0],
          source: 'AI Generated'
        };
      });

      setArticles(parsedArticles);
    } catch (err) {
      setError('Failed to generate articles. Please try again later.');
      console.error('Error generating articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      setError('OpenAI API key is not configured');
      setLoading(false);
      return;
    }
    generateArticles(apiKey);
  }, []);

  const handleArticleClick = (articleId: string) => {
    router.push(`/features/video-article/${articleId}`);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = contentType === 'all' || article.type === contentType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Safety Resources
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            AI-Generated Articles on Women&apos;s Safety
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={contentType}
              onChange={(e) => setContentType(e.target.value as 'all' | 'blog' | 'video')}
            >
              <option value="all">All Content</option>
              <option value="blog">Blog Articles</option>
              <option value="video">Videos</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="text-center py-4 text-red-500">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Generating articles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {article.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {article.source}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <button
                      onClick={() => handleArticleClick(article.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No articles found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
