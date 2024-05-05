import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ArtistCard = ({ artist, onViewClick, onEditClick, onDeleteClick, isAdmin }) => {
    return (
        <Card className="mb-3" style={{ margin: '10px', padding: '10px' }}>
            <Card.Img variant="top" src={artist.image} alt={artist.lastname || artist.lastname} />
            <Card.Body>
                <Card.Title>{artist.firstname}</Card.Title>
                <Card.Subtitle>{artist.lastname}</Card.Subtitle>
                <Button variant="primary" onClick={() => onViewClick(artist._id)}>View</Button>
                {isAdmin && (
                    <>
                        <Button variant="info" onClick={() => onEditClick(artist._id)}>Edit</Button>
                        <Button variant="danger" onClick={() => onDeleteClick(artist._id)}>Delete</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default ArtistCard;