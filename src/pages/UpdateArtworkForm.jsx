import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPopup from '../components/LoadingPopup';
import '../App.css'

function UpdateArtwork() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState({});
  const [image, setImage] = useState(null);

  if (!artworkId) {
    return <div>Artwork not found</div>
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/artwork/${artworkId}`);
        const artworkData = await response.json();
        setArtwork(artworkData);
      } catch (error) {
        console.error('Error fetching artwork details: ', error);
      }
    };
    fetchData();
  }, [artworkId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const formElements = event.target.elements;
    formData.append('_id', artworkId);
    formData.append('artist', formElements.artist.value);
    formData.append('title', formElements.title.value);
    formData.append('year', formElements.year.value);
    formData.append('type', formElements.type.value);
    formData.append('media', formElements.media.value);
    formData.append('dimensions', formElements.dimensions.value);
    formData.append('location', formElements.location.value);
    formData.append('description', formElements.description.value);
    formData.append('price', formElements.price.value);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`http://localhost:3000/updateartwork/${artworkId}`, {
        method: 'PATCH',
        body: formData,
      });
      

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedArtwork = await response.json();
      navigate(`/artwork/${artworkId}`);
    } catch (error) {
      console.error('Error updating artwork: ', error);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'year' && !/^\d+$/.test(value)) {
      return;
    }

    setArtwork((prevArtwork) => ({ ...prevArtwork, [name]: value }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  if (Object.keys(artwork).length === 0) {
    return <div>Loading...</div>;
  }
  

  return (

    <>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            defaultValue={artwork.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="artist">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type="text"
            name="artist"
            defaultValue={artwork.artist}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            defaultValue={artwork.year}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            defaultValue={artwork.type}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="Media">
          <Form.Label>Media</Form.Label>
          <Form.Control
            type="text"
            name="media"
            defaultValue={artwork.media}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="dimensions">
          <Form.Label>Dimensions</Form.Label>
          <Form.Control
            type="text"
            name="dimensions"
            defaultValue={artwork.dimensions}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            defaultValue={artwork.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            defaultValue={artwork.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            defaultValue={artwork.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Upload image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            defaultValue=""
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      {loading && <LoadingPopup />}
    </>
  );
}

export default UpdateArtwork;