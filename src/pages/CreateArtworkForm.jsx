import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import FetchArtists from '../components/FetchArtists';
import Select from 'react-select';
import LoadingPopup from '../components/LoadingPopup';
import '../App.css'

function CreateArtwork() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('')
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [media, setMedia] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [artists, setArtists] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('year', year);
    formData.append('type', type);
    formData.append('media', media);
    formData.append('dimensions', dimensions);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('price', price);

    try {
      const response = await fetch('http://localhost:3000/createartwork', {
        method: 'POST',
        body: formData,
      });
      const artwork = await response.json();
      navigate(`/artwork/${artwork._id}`);
    } catch (error) {
      console.error('Error when creating artwork', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Create Artwork</h1>
      <FetchArtists setArtists={setArtists} />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Artwork title"
          />
        </Form.Group>

        <Form.Group controlId="artist">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            type="text"
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
            placeholder="Artist name"
          />
        </Form.Group>

        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="text"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            placeholder="Year"
          />
        </Form.Group>

        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            value={type}
            onChange={(event) => setType(event.target.value)}
            placeholder="Type of artwork"
          />
        </Form.Group>

        <Form.Group controlId="Media">
          <Form.Label>Media</Form.Label>
          <Form.Control
            type="text"
            value={media}
            onChange={(event) => setMedia(event.target.value)}
            placeholder="Media"
          />
        </Form.Group>

        <Form.Group controlId="dimensions">
          <Form.Label>Dimensions</Form.Label>
          <Form.Control
            type="text"
            value={dimensions}
            onChange={(event) => setDimensions(event.target.value)}
            placeholder="Dimensions"
          />
        </Form.Group>

        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Location"
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Price"
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Upload image</Form.Label>
          <Form.Control
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {loading && <LoadingPopup />}
    </div >
  );
}

export default CreateArtwork;