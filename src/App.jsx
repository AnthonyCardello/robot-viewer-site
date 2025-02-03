import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {
  async function fetchLatestImage() {
    try {
      const response = await fetch('https://e159d3d1-img-sender-worker.robotfunny.workers.dev/latest-image'); // Your Worker URL
      if (response.ok) {
        const imageBlob = await response.blob(); // Get the image as a Blob
        const imageUrl = URL.createObjectURL(imageBlob); // Convert the Blob to a URL
        const imgRef = useRef(null);

        // Set the src of the image element to the Blob URL
        const imageElement = document.getElementById('latest-image');
        imgRef.current.src = imageUrl;
      
      } else {
        console.error('Failed to fetch the image:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  fetchLatestImage(); // Fetch and display the image when the page loads

  return (
    <>
       <img ref={imgref} alt="Live video feed" />      
    </>
  );
}

export default App
