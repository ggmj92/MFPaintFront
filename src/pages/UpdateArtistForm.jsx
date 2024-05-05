import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPopup from '../components/LoadingPopup';
import '../App.css'

function UpdateArtist() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { artistId } = useParams();
    const [artist, setArtist] = useState({});
    const [image, setImage] = useState(null);

    if (!artistId) {
        return <div>Artist not found.</div>
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/artist/${artistId}`)
                const artistData = await response.json();
                setArtist(artistData);
            } catch (error) {
                console.error('Error fetching artist details: ', error)
            }
        };
        fetchData();
    }, [artistId]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        const formElements = event.target.elements;
        formData.append('_id', artistId);
        formData.append('firstname', formElements.firstname.value);
        formData.append('lastname', formElements.lastname.value);
        formData.append('born', formElements.born.value);
        formData.append('based', formElements.based.value);
        formData.append('about', formElements.about.value);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:3000/updateartist/${artistId}`, {
                method: 'PATCH',
                body: formData,
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedArtist = await response.json();
            navigate(`/artist/${artistId}`);

        } catch (error) {
            console.error('Error updating artist: ', error);
        }
        setLoading(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'year' && !/^\d+$/.test(value)) {
            return;
        }

        setArtist((prevArtist) => ({ ...prevArtist, [name]: value }));
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    if (Object.keys(artist).length === 0) {
        return <div>Loading...</div>;
    }

    return (

        <>
            <Form onSubmit={handleUpdate}>

                <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        defaultValue={artist.firstname}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="lastnamename">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastname"
                        defaultValue={artist.lastname}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="born">
                    <Form.Label>Born</Form.Label>
                    <Form.Control
                        type="text"
                        name="born"
                        defaultValue={artist.born}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="based">
                    <Form.Label>Based</Form.Label>
                    <Form.Control
                        type="text"
                        name="based"
                        defaultValue={artist.based}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                        type="text"
                        name="about"
                        defaultValue={artist.about}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Upload image</Form.Label>
                    <Form.Control
                        type="file"
                        name=""
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
            {loading && <LoadingPopup />}
        </>
    )
};



export default UpdateArtist;