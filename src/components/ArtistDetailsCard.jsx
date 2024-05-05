import React from 'react';
import Card from 'react-bootstrap/Card';

const ArtistDetails = ({ artist }) => {
  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="artist-details">
      <Card.Body>
        <Card.Title>{artist.firstname} {artist.lastname}</Card.Title>
        <Card.Text>Born in: {artist.born}</Card.Text>
        <Card.Text>Based in: {artist.based}</Card.Text>
        <Card.Text>About: {artist.about}</Card.Text>
        <Card.Img src={artist.image} alt={artist.lastname} />
      </Card.Body>
    </Card>
  );
};

export default ArtistDetails;



