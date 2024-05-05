import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ArtworkDetails = ({ artwork, onPurchaseClick }) => {
  if (!artwork) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mb-3" style={{ margin: '10px', padding: '10px' }}>
      <Card.Body>
        <Card.Title>{artwork.title}</Card.Title>
        <Card.Title>{artwork.artist}</Card.Title>
        <Card.Text>Year: {artwork.year}</Card.Text>
        <Card.Text>Type: {artwork.type}</Card.Text>
        <Card.Text>Media: {artwork.media}</Card.Text>
        <Card.Text>Dimensions: {artwork.dimensions}</Card.Text>
        <Card.Text>Location: {artwork.location}</Card.Text>
        <Card.Text>Description: {artwork.description}</Card.Text>
        <Card.Img src={artwork.image} alt={artwork.title} />
        <Card.Text>Price: {artwork.price}</Card.Text>
      </Card.Body>
      <Button variant="primary" onClick={() => onPurchaseClick(artwork)}>Purchase</Button>
    </Card>
  );
};

export default ArtworkDetails;



