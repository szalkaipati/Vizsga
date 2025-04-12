import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,  // Disable the default body parser
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  
  // Set up upload directory and keep original file name
  form.uploadDir = path.join(process.cwd(), 'public/videos');
  form.keepExtensions = true;
  
  // Parse the incoming form data
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to upload video' });
      return;
    }
    
    // The video file will be available in `files.video`
    const videoPath = files.video[0].filepath;

    // Send the file path in the response
    res.status(200).json({
      videoUrl: `/videos/${path.basename(videoPath)}`,
    });
  });
}
