// Carousel.js
import React, { useState, useEffect } from 'react';
import CarouselCard from './CarouselCard';
import './Carousel.css';

const Carousel = () => {
  const img1 = "https://images.unsplash.com/photo-1526280760714-f9e8b26f318f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXhxdWlzaXRlJTIwU3RhdGlvbmFyeSUyMFV0aWxpdGllc3xlbnwwfHwwfHx8MA%3D%3D"; //pen
  const img2 = "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c291bCUyMGVucmljaGluZyUyMG11c2ljfGVufDB8fDB8fHww"; //music
  const img3 = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fHww"; //good-view
  const img4 = "https://images.unsplash.com/photo-1519664699825-ddb2c64076bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmZlc3Npb25hbCUyMG11c2ljYWwlMjBlcXVpcGVtZW50fGVufDB8fDB8fHww"; //music-instrument
  const img5 = "https://images.unsplash.com/photo-1525513688408-aef73a11a340?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hY2tib29rfGVufDB8fDB8fHww"; //gadgets

  const [currentCard, setCurrentCard] = useState(1);

  useEffect(() => {
    // Set the initial placement of images
    setCurrentCard(1);
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);

  const handleNext = () => {
    setCurrentCard((prevCard) => (prevCard % 5) + 1);
  };

  const handlePrev = () => {
    setCurrentCard((prevCard) => (prevCard - 2 + 5) % 5 + 1);
  };

  const handleDotClick = (dotNumber) => {
    setCurrentCard(dotNumber);
  };

  // Function to get the image URL and title based on the current card
  const getImageData = (cardNumber) => {
    switch (cardNumber) {
      case 1:
        return { imageUrl: img1, title: 'Exquisite Stationary Utilities' };
      case 2:
        return { imageUrl: img2, title: 'Soul Enriching music' };
      case 3:
        return { imageUrl: img3, title: 'Modern Work Desks' };
      case 4:
        return { imageUrl: img4, title: 'Professional Music Equipment' };
      case 5:
        return { imageUrl: img5, title: 'High-Performance Gadgets' };
      default:
        return { imageUrl: img1, title: 'Default Title' };
    }
  };

  return (
    <>
      <div className="carousel-frame">
        <div className="subframe-1">
          <div className="card-container-left">
            <CarouselCard imageData={getImageData((currentCard - 2 + 5) % 5 + 1)} containerType="left" />
          </div>
          <div className="card-container-right">
            <CarouselCard imageData={getImageData((currentCard % 5) + 1)} containerType="right" />
          </div>
        </div>
        <div className="subframe-2">
          <div className="card-container-left">
            <CarouselCard imageData={getImageData((currentCard + 1) % 5 + 1)} containerType="left" />
          </div>
          <div className="card-container-right">
            <CarouselCard imageData={getImageData((currentCard + 2) % 5 + 1)} containerType="right" />
          </div>
        </div>
        <div className="central-card">
          <CarouselCard imageData={getImageData(currentCard)} containerType="central" />
        </div>
      </div>
      <div className="navigation-buttons">
        <button className="arrow-button left" onClick={handlePrev}></button>
        {[1, 2, 3, 4, 5].map((dotNumber) => (
          <span
            key={dotNumber}
            className={`dot-indicator ${currentCard === dotNumber ? 'active' : ''}`}
            onClick={() => handleDotClick(dotNumber)}
          ></span>
        ))}
        <button className="arrow-button right" onClick={handleNext}></button>
      </div>
    </>
  );
};

export default Carousel;
