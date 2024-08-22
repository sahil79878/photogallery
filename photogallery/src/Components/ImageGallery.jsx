import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch images from local storage
  const fetchImages = () => {
    try {
      const imagesData = JSON.parse(localStorage.getItem('images')) || [];
      if (imagesData.length === 0) {
        throw new Error('No images found.');
      }
      setImages(imagesData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching images:', err.message);
      setError('Failed to load images.');
      setLoading(false);
    }
  };

  // Function to handle image deletion
  const handleDelete = (imageId) => {
    try {
      let imagesData = JSON.parse(localStorage.getItem('images')) || [];
      imagesData = imagesData.filter((img) => img.id !== imageId);
      localStorage.setItem('images', JSON.stringify(imagesData));
      setImages(imagesData);
      console.log(`Image with ID ${imageId} deleted successfully.`);
    } catch (err) {
      console.error('Error deleting image:', err.message);
      setError('Failed to delete image.');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Callback to refresh the gallery after upload
  const handleUploadSuccess = (uploadedImageData) => {
    setImages([uploadedImageData, ...images]); 
  };

  return (
    <div>
      {/* <ImageUpload onUploadSuccess={handleUploadSuccess} /> */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className='container' >
          <h1 className='mt-3 alert alert-primary text-center'>Image Gallery</h1>
          <div className='row' >
          {images.map((image) => (
            <div className='col-sm-4'  key={image.id}>
              <div className="card mt-5">
              <img 
                src={image.url}
                alt={image.name}
                style={{ maxWidth: '100%', height: '300px' }}
                onError={(e) => e.target.src = '/placeholder.png'} // Fallback image in case of error
              />
              <div className="card-body">
              <p >
                {image.name} ({image.size} bytes, {image.width}x{image.height})
              </p>
              <button className="btn btn-danger ml-3" onClick={() => handleDelete(image.id)}>Delete</button>
            </div>
          </div>
          </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

// images.map((im)=>{
//   <div class="card" style="width: 18rem;">
//   <img
//     src={image.url}
//     alt={image.name}
//     style={{ maxWidth: '100%', height: 'auto' }}
//     onError={(e) => e.target.src = '/placeholder.png'} // Fallback image in case of error
//   />
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p>
//       {image.name} ({image.size} bytes, {image.width}x{image.height})
//     </p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>
// })
