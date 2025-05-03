'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'workshop';
  videoId?: string;
  channel?: string;
  date?: string;
  time?: string;
  instructor?: string;
  platform?: string;
  link?: string;
  category: string;
}

export default function WorkshopPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'workshop'>('all');

  const fetchResources = async (query: string = '') => {
    setLoading(true);
    try {
      const response = await fetch('/api/workshop-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }

      const data = await response.json();
      setResources(data.resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Safety Resources
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Find videos and workshops for women&apos;s and children&apos;s safety
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'all' | 'video' | 'workshop')}
            >
              <option value="all">All Resources</option>
              <option value="video">Videos</option>
              <option value="workshop">Workshops</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading resources...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {resource.type === 'video' && resource.videoId && (
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${resource.videoId}`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {resource.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    {resource.type === 'video' && (
                      <>
                        <p>Channel: {resource.channel}</p>
                        <p>Category: {resource.category}</p>
                      </>
                    )}
                    {resource.type === 'workshop' && (
                      <>
                        <p>Date: {resource.date}</p>
                        <p>Time: {resource.time}</p>
                        <p>Instructor: {resource.instructor}</p>
                        <p>Platform: {resource.platform}</p>
                      </>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {resource.type === 'video' ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${resource.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Watch Video
                      </a>
                    ) : (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Register for Workshop
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredResources.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No resources found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
