import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirm from '../components/DeleteConfirm';
import ArtworkDetails from '../components/ArtworkDetailsCard';
import ArtworkImage from '../components/ArtworkImage';
import EditDeleteButtons from '../components/EditDeleteButtons';
import Spinner from 'react-bootstrap/Spinner';

function Artwork() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(`http://localhost:3000/artwork/${artworkId}`);
        const artworkData = await result.json();
        setArtwork(artworkData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artwork details:, ', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [artworkId]);

  if (!artwork || loading) {
    return (
      <>
        <Spinner animation="border" />
        {!artwork && <div>Loading...</div>}
      </>
    )
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
      navigate('/artworks');
      setSuccessMessage('Artwork deleted successfully');
      setShowModal(false);
      setSelectedArtworkId(null);
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  return (
    <>
      <div>
        <h1>{artwork.title} {artwork.artist}</h1>
        <p>Id: {artwork._id}</p>
      </div>
      <ArtworkDetails artwork={artwork} key={artwork._id}/>
      <ArtworkImage artwork={artwork} />
      <EditDeleteButtons
        id={artwork._id}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        type="artwork"
      />
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
}

export default Artwork;
