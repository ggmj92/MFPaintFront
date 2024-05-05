import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LoadingPopup from '../components/LoadingPopup';
import '../App.css'

function CreateBlogPost() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);
        formData.append('body', body);
        formData.append('author', author);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:3000/createblogpost', {
                method: 'POST',
                body: formData,
            });
            const blogPost = await response.json();
            navigate(`/blogpost/${blogPost._id}`);
        } catch (error) {
            console.error('Error when creating blog post', error);
        }
        setLoading(false);
    };

    return (
        <div className='container'>
            <h1>Create Blog Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter title"
                    />
                </Form.Group>
                <Form.Group controlId="subtitle">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control
                        type="text"
                        value={subtitle}
                        onChange={(event) => setSubtitle(event.target.value)}
                        placeholder="Enter subtitle"
                    />
                </Form.Group>
                <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        placeholder="Enter post body"
                    />
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Author Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        placeholder="Enter author name"
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
    )
};

export default CreateBlogPost;