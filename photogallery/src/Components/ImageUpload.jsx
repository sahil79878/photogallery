import React, { useState } from 'react';
import axios from 'axios';
import {API_URL,API_KEY} from './configure'

const ImageUpload = ({ onUploadSuccess }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('key', API_KEY);

    try {
      const response = await axios.post(API_URL, formData);
      setUploading(false);
      const uploadedImageData = response.data.data;
      console.log('Upload Response:', uploadedImageData);

      // Save image metadata to local storage
      const imageMetadata = {
        id: uploadedImageData.id,
        url: uploadedImageData.url,
        name: uploadedImageData.filename,
        size: uploadedImageData.size,
        width: uploadedImageData.width,
        height: uploadedImageData.height,
        delete_url: uploadedImageData.delete_url,
      };
      
      let images = JSON.parse(localStorage.getItem('images')) || [];
      images = [imageMetadata, ...images];
      localStorage.setItem('images', JSON.stringify(images));

      onUploadSuccess(imageMetadata); 
    } catch (error) {
      setUploading(false);
      // setError('Failed to upload image.');
      // console.error('Upload Error:', error.message);
    }
  };

  return (
    <div>
      <form action='' style={{alignItems:"center"}}>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ImageUpload;


