'use client';

import { useState, useEffect } from 'react';
import './style.css';

export default function Videos() {
  const [videos, setVideos] = useState<{ url: string; title: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
    setVideos(storedVideos);
  }, []);

  const handleDelete = (videoUrl: string) => {
    const updatedVideos = videos.filter((video) => video.url !== videoUrl);
    localStorage.setItem('uploadedVideos', JSON.stringify(updatedVideos));
    setVideos(updatedVideos);
  };

  const isYouTubeOrVimeo = (url: string) => {
    if (typeof url !== 'string') return false;
    return url.includes('youtube') || url.includes('vimeo');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1>Uploaded Videos</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by video title"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>

        <div className="card-container">
          {filteredVideos.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-500">No videos found matching the title.</p>
          ) : (
            filteredVideos.map((video, index) => (
              <div key={index} className="video-card">
                <div className="flex justify-center items-center p-4">
                  {isYouTubeOrVimeo(video.url) ? (
                    <iframe
                      src={video.url}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      src={video.url}
                    />
                  )}
                </div>

                <div className="px-4 pb-4">
                  <h3>{video.title}</h3>
                </div>

                <div className="flex justify-between items-center px-4 pb-4">
                  <button
                    onClick={() => handleDelete(video.url)}
                    className="button delete-btn"
                  >
                    <span className="text-xl">🗑️</span> Delete
                  </button>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button view-btn"
                  >
                    <span className="text-xl">👁️</span> View
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
