import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArtistPreviewCard from '../components/ArtistPreviewCard';
import FetchArtists from '../components/FetchArtists';
import DeleteConfirm from '../components/DeleteConfirm';

function Artists() {
  const [artists, setArtists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleViewClick = (artistId) => {
    navigate(`/artist/${artistId}`)
  }

  const handleEditClick = (artistId) => {
    navigate(`/updateartist/${artistId}/`);
  }

  const handleDeleteClick = (artistId) => {
    setSelectedArtistId(artistId);
    setShowModal(true);
  }

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:3000/deleteartist/${selectedArtistId}`, {
        method: 'DELETE',
      });
      setSuccessMessage('Artist deleted successfully');
      setShowModal(false);
      setSelectedArtistId(null);
      setArtists(prevArtists => prevArtists.filter(artist => artist._id !== selectedArtistId));
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <h1>All Artists</h1>
      <FetchArtists setArtists={setArtists} />
      <Container className='artists-container'>
        <Row>
          {artists.map(artist => (
            <Col md={4} key={artist._id}>
              <ArtistPreviewCard
                artist={artist}
                onViewClick={handleViewClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <DeleteConfirm
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        confirmModal={handleConfirmDelete}
        id={selectedArtistId}
        type="artist"
        message="Are you sure you want to delete this artist?"
      />
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </>
  );
}

export default Artists;