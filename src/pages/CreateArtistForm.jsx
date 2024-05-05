import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LoadingPopup from '../components/LoadingPopup';
import '../App.css'

function CreateArtist() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [born, setBorn] = useState('');
    const [based, setBased] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('born', born);
        formData.append('based', based);
        formData.append('about', about);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:3000/createartist', {
                method: 'POST',
                body: formData,
            });
            const artist = await response.json();
            navigate(`/artist/${artist._id}`);
        } catch (error) {
            console.error('Error when creating artist', error);
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <h1>Create Artist</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstname">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                        placeholder="Enter first name"
                    />
                </Form.Group>
                <Form.Group controlId="lastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        placeholder="Enter last name"
                    />
                </Form.Group>
                <Form.Group controlId="born">
                    <Form.Label>Born in</Form.Label>
                    <Form.Control
                        type="text"
                        value={born}
                        onChange={(event) => setBorn(event.target.value)}
                        placeholder="Enter birthplace"
                    />
                </Form.Group>
                <Form.Group controlId="based">
                    <Form.Label>Based in</Form.Label>
                    <Form.Control
                        type="text"
                        value={based}
                        onChange={(event) => setBased(event.target.value)}
                        placeholder="Enter current location"
                    />
                </Form.Group>
                <Form.Group controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={about}
                        onChange={(event) => setAbout(event.target.value)}
                        placeholder="Enter artist bio"
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
        </div>
    );
}

export default CreateArtist;
