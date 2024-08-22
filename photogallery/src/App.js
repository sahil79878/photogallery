import React from 'react';
// import ImageUpload from './Components/ImageUpload';
// import ImageGallery from './Components/ImageGallery';
import Header from './Components/Navbar/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageUpload from './Components/ImageUpload';
import ImageGallery from './Components/ImageGallery'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/imageupload' element={<ImageUpload/>}></Route>
        <Route path='/imagegallery' element={<ImageGallery/>}></Route>
      </Routes>
      </BrowserRouter>
      {/* <h1>Photo Sharing Platform</h1>
      <ImageUpload/>
      <ImageGallery/> */}
    </div>
  );
};

export default App;
