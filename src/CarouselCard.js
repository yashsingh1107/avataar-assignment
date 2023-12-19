// CarouselCard.js
import React from 'react';
import './CarouselCard.css';

const CarouselCard = ({ imageData = {}, containerType }) => {
  const { imageUrl, title } = imageData;

  const containerClassName =
    containerType === 'central'
      ? 'central-card'
      : containerType === 'left'
      ? 'card-container-left'
      : 'card-container-right';

  return (
    <div className={containerClassName}>
      <img src={imageUrl} alt={title} className="card-image" />
      
      {/* only for central card */}
      {containerType === 'central' && (
        <div className="title-frame">
          <p className="card-title">{title}</p>
        </div>
      )}
    </div>
  );
};

export default CarouselCard;
