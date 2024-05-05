import React from 'react';
import Card from 'react-bootstrap/Card';

const BlogPostDetails = ({ blogPost }) => {
    if (!blogPost) {
        return <div>Loading...</div>
    }

    return (
        <Card className='blogpost-details'>
            <Card.Body>
                <Card.Title>{blogPost.title}</Card.Title>
                <Card.Text>{blogPost.subtitle}</Card.Text>
                <Card.Text>{blogPost.body}</Card.Text>
                <Card.Text>{blogPost.author}</Card.Text>
                <Card.Img src={blogPost.image} alt={blogPost.title} />
            </Card.Body>
        </Card>
    );
};

export default BlogPostDetails; 