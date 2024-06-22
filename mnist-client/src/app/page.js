"use client"
import {useRef, useEffect, useState} from 'react';
import { Card, Divider, Button } from "@nextui-org/react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Jimp from 'jimp/es';
import axios from 'axios';
import Voting from '../components/Voting'

async function createBitmapVector(imagePath) {
  try {
  
    const image = await Jimp.read(imagePath);

    // Resize to 28x28 while maintaining aspect ratio and converting to grayscale
    const resizedImage = await image
      .resize(28, 28, Jimp.RESIZE_BEZIER)
      .grayscale()
      .contrast(1)

   
    const vector = [];
    for(let i = 0; i < resizedImage.bitmap.height; i++) {
      for(let j = 0; j < resizedImage.bitmap.width; j++) {
        const rgba = Jimp.intToRGBA(resizedImage.getPixelColour(j,i));
        vector.push(rgba.r / 255);
      }
    }
    console.log(JSON.stringify(vector))
    return vector
  } catch (error) {
    console.error('Error creating bitmap matrix:', error);
    return null;
  }
}

export default function Home() {
  const canvasRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [stroke, setStroke] = useState(14);

  useEffect(() => {
    const element = document.getElementById('react-sketch-canvas');
    const eventHandler = async (ev) => {
      const imageUrl = await canvasRef.current?.exportImage("png");
      const vector = await createBitmapVector(imageUrl);
      const response = await axios.post('/api/predict', { value: vector });
      const { data } = response;
      setPredictions((prev) => [...prev, data.mightBe]);
      canvasRef.current?.clearCanvas();
    }
    element.addEventListener('mouseup', eventHandler)
    return () => {
      element.removeEventListener('mouseup', eventHandler)
    }
  }, [])

  return (
    <div className='wrapper'>
  <div className="container">
    <h1 className="title">Can model guest 👻?</h1>
      <ReactSketchCanvas ref={canvasRef}
       style={{width: '300px', height: '300px', marginBottom: '1rem', cursor: 'pointer'}} 
       strokeWidth={stroke} 
       strokeColor="white"  
       canvasColor="black"
      />
      <div>
      <input type="range" id="volume" name="volume" min="0" max="30" value={stroke} onChange={(e) => setStroke(e.target.value)} />
      <label for="volume" style={{color: 'black'}}>Tamaño de linea</label>
    </div>
    <h3 style={{color: 'black', marginBottom: '1rem' }}>Predicciones: {predictions.join(',')}</h3>
    
    <Button size="lg" onClick={() => setPredictions([])}>
        Limpiar
      </Button> 
  </div>
  <Voting hasPrediction={predictions.length > 0} />
  </div>
);
}
