// Carousel.js
import React, { useState, useEffect } from 'react';
import CarouselCard from './CarouselCard';
import './Carousel.css';

const Carousel = () => {
  const img1 =
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGFlc3RoZXRpYyUyMGltYWdlcyUyMHdpdGglMjAlMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"; //pen
  const img2 = "https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3Ryb25pY3MlMjB3aXRoJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"; //desk
  const img3 = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fHww"; //good-view
  const img4 = "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVza3xlbnwwfHwwfHx8MA%3D%3D"; //dim light
  const img5 = "https://soltech.com/cdn/shop/articles/Photo-Courtesy-of-The-Spruce_600x.jpg?v=1652284445"; //plant

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
        return { imageUrl: img1, title: 'Custom Title 1' };
      case 2:
        return { imageUrl: img2, title: 'Custom Title 2' };
      case 3:
        return { imageUrl: img3, title: 'Custom Title 3' };
      case 4:
        return { imageUrl: img4, title: 'Custom Title 4' };
      case 5:
        return { imageUrl: img5, title: 'Custom Title 5' };
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
