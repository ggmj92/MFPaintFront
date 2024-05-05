import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPopup from '../components/LoadingPopup';
import '../App.css'

function UpdateBlogPost() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { blogPostId } = useParams();
    const [blogPost, setBlogPost] = useState({});
    const [image, setImage] = useState(null);

    if (!blogPostId) {
        return <div>Blog post not found.</div>
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/blogpost/${blogPostId}`);
                const blogPostData = await response.json();
                setBlogPost(blogPostData);
            } catch (error) {
                console.error('Error fetching blog post details: ', error)
            }
        };
        fetchData();
    }, [blogPostId]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        const formElements = event.target.elements;
        formData.append('_id', blogPostId);
        formData.append('title', formElements.title.value);
        formData.append('subtitle', formElements.subtitle.value);
        formData.append('body', formElements.body.value);
        formData.append('author', formElements.author.value);
        if (image) {
            formData.append('image', image);
        }
        try {
            const response = await fetch(`http://localhost:3000/updateblogpost/${blogPostId}`, {
                method: 'PATCH',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedBlogPost = await response.json();
            navigate(`/blogpost/${blogPostId}`);
        } catch (error) {
            console.error('Error updating blog post: ', error);
            alert('Error updating blog post. Please try again.');
        }
        setLoading(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'year' && !/^\d+$/.test(value)) {
            return;
        }
        setBlogPost((prevBlogPost) => ({ ...prevBlogPost, [name]: value }));
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        console.log("Image:", event.target.files[0]);
    };

    return (
        <>
            <Form onSubmit={handleUpdate}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        defaultValue={blogPost.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="subtitle">
                    <Form.Label>Subtitle</Form.Label>
                    <Form.Control
                        type="text"
                        name="subtitle"
                        defaultValue={blogPost.subtitle}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        type="text"
                        name="body"
                        defaultValue={blogPost.body}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        defaultValue={blogPost.author}
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
    );
};

export default UpdateBlogPost;