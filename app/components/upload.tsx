'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Upload() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');
  const [title, setTitle] = useState<string>(''); // State for the video title
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid video file.');
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value); // Update the title state
  };

  const handleUpload = async () => {
    if (!videoFile && !urlInput) return;

    let videoToStore = '';
    let videoTitle = title || 'Untitled Video'; // Default title if no title is provided

    if (videoFile) {
      const formData = new FormData();
      formData.append('video', videoFile);

      videoToStore = URL.createObjectURL(videoFile);
    }

    if (urlInput) {
      videoToStore = urlInput;
    }

    const existingVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
    existingVideos.push({ url: videoToStore, title: videoTitle });
    localStorage.setItem('uploadedVideos', JSON.stringify(existingVideos));

    setVideoFile(null);
    setVideoURL(null);
    setUrlInput('');
    setTitle(''); // Reset the title input field

    router.push('/videos');
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Videó feltöltése</h2>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-md"
      />

      <input
        type="text"
        placeholder="Enter video URL (e.g., YouTube)"
        value={urlInput}
        onChange={handleUrlChange}
        className="mb-4 p-2 border rounded-md"
      />

      {/* Title input */}
      <input
        type="text"
        placeholder="Enter video title"
        value={title}
        onChange={handleTitleChange}
        className="mb-4 p-2 border rounded-md"
      />

      {(videoFile || urlInput) && (
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Videó feltöltés
        </button>
      )}

      {videoURL && (
        <div className="w-full max-w-md mt-4">
          <video controls className="w-full rounded-md shadow-lg">
            <source src={videoURL} type={videoFile?.type} />
            A böngésződ nem támogatja ezt a videó típusot.
          </video>
        </div>
      )}
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Upload() {
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoURL, setVideoURL] = useState<string | null>(null);
//   const [urlInput, setUrlInput] = useState<string>('');
//   const router = useRouter();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith('video/')) {
//       setVideoFile(file);
//       setVideoURL(URL.createObjectURL(file));
//     } else {
//       alert('Please upload a valid video file.');
//     }
//   };

//   const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUrlInput(e.target.value);
//   };

//   const handleUpload = async () => {
//     if (!videoFile && !urlInput) return;

//     let videoToStore = '';

//     if (videoFile) {
//       const formData = new FormData();
//       formData.append('video', videoFile);

//       videoToStore = URL.createObjectURL(videoFile);
//     }

//     if (urlInput) {
//       videoToStore = urlInput;
//     }

//     const existingVideos = JSON.parse(localStorage.getItem('uploadedVideos') || '[]');
//     existingVideos.push(videoToStore);
//     localStorage.setItem('uploadedVideos', JSON.stringify(existingVideos));

//     setVideoFile(null);
//     setVideoURL(null);
//     setUrlInput('');

//     router.push('/videos');
//   };

//   return (
//     <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Videó feltöltése</h2>

//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//         className="mb-4 p-2 border rounded-md"
//       />

//       <input
//         type="text"
//         placeholder="Enter video URL (e.g., YouTube)"
//         value={urlInput}
//         onChange={handleUrlChange}
//         className="mb-4 p-2 border rounded-md"
//       />

//       {(videoFile || urlInput) && (
//         <button
//           onClick={handleUpload}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
//         >
//           Upload Video
//         </button>
//       )}

//       {videoURL && (
//         <div className="w-full max-w-md mt-4">
//           <video controls className="w-full rounded-md shadow-lg">
//             <source src={videoURL} type={videoFile?.type} />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </div>
//   );
// }
