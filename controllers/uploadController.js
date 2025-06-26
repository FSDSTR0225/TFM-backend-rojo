const cloudinary = require('../utils/cloudinaryService');

const uploadImageController = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'No files uploaded' });
    }

    const uploadedUrls = [];

    for (const file of req.files) {
      if (!file.mimetype.startsWith('image/')) {
        return res.status(400).json({ msg: 'Only image files are allowed' });
      }

      console.log('Uploading file:', file.originalname);

      const base64 = file.buffer.toString('base64');
      const dataURI = `data:${file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI);
      console.log('Cloudinary upload result:', result);
      uploadedUrls.push(result.secure_url);
    }

    res.json({ secure_urls: uploadedUrls });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ msg: 'Error uploading images' });
  }
};

module.exports = { uploadImageController };