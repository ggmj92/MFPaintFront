import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ArtworkCard = ({ artwork, onViewClick, onEditClick, onDeleteClick, onPurchaseClick, isAdmin }) => {
    return (
        <Card className="mb-3">
            <Card.Img variant="top" src={artwork.image} alt={artwork.title} />
            <Card.Body>
                <Card.Title>{artwork.title}</Card.Title>
                <Card.Subtitle>{artwork.artist}</Card.Subtitle>
                <Card.Text>{artwork.price}</Card.Text>
                <Button variant="primary" onClick={() => onViewClick(artwork._id)}>View</Button>
                {isAdmin && (
                    <>
                        <Button variant="primary" onClick={() => onEditClick(artwork._id)}>Edit</Button>
                        <Button variant="primary" onClick={() => onDeleteClick(artwork._id)}>Delete</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default ArtworkCard;

