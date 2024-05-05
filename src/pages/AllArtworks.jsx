import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtworkPreviewCard from '../components/ArtworkPreviewCard';
import FetchArtworks from '../components/FetchArtworks';
import DeleteConfirm from '../components/DeleteConfirm';
import CartPopup from '../components/CartPopup';

function AllArtworks() {
    const [artworks, setArtworks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedArtworkId, setSelectedArtworkId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleViewClick = (artworkId) => {
        navigate(`/artwork/${artworkId}`)
    }

    const handleEditClick = (artworkId) => {
        navigate(`/updateartwork/${artworkId}/`);
    }

    const handleDeleteClick = (artworkId) => {
        setSelectedArtworkId(artworkId);
        setShowModal(true);
    }

    const handleConfirmDelete = async () => {
        try {
            await fetch(`http://localhost:3000/deleteartwork/${selectedArtworkId}`, {
                method: 'DELETE',
            });
            setSuccessMessage('Artwork deleted successfully');
            setShowModal(false);
            setSelectedArtworkId(null);
            setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork._id !== selectedArtworkId));
        } catch (error) {
        }
    };

    const showCartPreview = () => {
        setShowPopup(true);
      };
    
      const closeCartPreview = () => {
        setShowPopup(false);
      };

    const handlePurchaseClick = (artwork) => {
        console.log('Artwork pruchased:', artwork);
        setCart([...cart, artwork]);
        setSuccessMessage('Artwork added to cart.')
    };

    return (
        <>
        {showPopup && <CartPopup cart={cart} onClose={closeCartPreview} />}
            <h1>All Artworks</h1>
            <FetchArtworks setArtworks={setArtworks} />
            <Container className="artworks-container">
                <Row>
                    {artworks.map(artwork => (
                        <Col md={4} key={artwork._id}>
                            <ArtworkPreviewCard
                                artwork={artwork}
                                onViewClick={handleViewClick}
                                onEditClick={handleEditClick}
                                onDeleteClick={handleDeleteClick}
                                onPurchaseClick={handlePurchaseClick}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <DeleteConfirm
                showModal={showModal}
                hideModal={() => setShowModal(false)}
                confirmModal={handleConfirmDelete}
                id={selectedArtworkId}
                type="artwork"
                message="Are you sure you want to delete this artwork?"
            />
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </>
    );
};

export default AllArtworks;