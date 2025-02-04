import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {
  const imgRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);

  async function fetchLatestImage() {
    try {
      const response = await fetch('https://img-sender-worker.robotfunny.workers.dev/latest-image', {
        headers: {
          'Accept': 'image/jpeg',
        }
      }); 

      if (response.ok) {
        const imageBlob = await response.blob(); // Get the image as a Blob
        const imageUrl = URL.createObjectURL(imageBlob); // Convert the Blob to a URL

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

  useEffect(function() {
    if(isRunning){

    fetchLatestImage(); 
    const interval = setInterval(fetchLatestImage, 3000); 
    return function() {
      clearInterval(interval); // Cleanup interval on component unmount
    }
  }
  }, [isRunning]); // Empt

  function toggleInterval() {
    setIsRunning(!isRunning); // Toggle the isRunning state
  }
  return (
    <>
       <img ref={imgRef} alt="Live video feed" />   
       <button onClick={toggleInterval}>
        {isRunning ? 'Stop' : 'Start'} Interval
      </button>   
    </>
  );
}

export default App
