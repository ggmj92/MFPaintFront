import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirm from '../components/DeleteConfirm';
import ArtistDetails from '../components/ArtistDetailsCard';
import ArtistImage from '../components/ArtistImage';
import EditDeleteButtons from '../components/EditDeleteButtons';

function Artist() {
  const navigate = useNavigate();
  
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`http://localhost:3000/artist/${artistId}`);
        const artistData = await result.json();
        setArtist(artistData);
      } catch (error) {
        console.error('Error fetching artist details:, ', error);
      }
    };
    fetchData();
  }, [artistId]);

  if (!artist) {
    return <div>Loading... </div>;
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
      navigate('/artists');
      setSuccessMessage('Artist deleted successfully');
      setShowModal(false);
      setSelectedArtistId(null);
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  return (
    <>
      <div>
        <h1>{artist.firstname} {artist.lastname}</h1>
        <p>Id: {artist._id}</p>
      </div>
      <ArtistDetails artist={artist} key={artist._id}/>
      <ArtistImage artist={artist} />
      <EditDeleteButtons
        id={artist._id}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        type="artist"
      />
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

export default Artist;