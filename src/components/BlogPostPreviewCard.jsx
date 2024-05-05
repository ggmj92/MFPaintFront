import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const BlogPostCard = ({ blogPost, onViewClick, onEditClick, onDeleteClick, isAdmin }) => {
    return (
        <Card className="mb-3" style={{ margin: '10px', padding: '10px' }}>
            <Card.Img variant="top" src={blogPost.image} alt={blogPost.title} />
            <Card.Title>{blogPost.title}</Card.Title>
            <Card.Text>{blogPost.author}</Card.Text>
            <Button variant="primary" onClick={() => onViewClick(blogPost._id)}>View</Button>
            {isAdmin && (
                <>
                    <Button variant="info" onClick={() => onEditClick(blogPost._id)}>Edit</Button>
                    <Button variant="danger" onClick={() => onDeleteClick(blogPost._id)}>Delete</Button>
                </>
            )}
        </Card>
    )
}

export default BlogPostCard;
