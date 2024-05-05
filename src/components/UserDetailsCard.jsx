import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MakeAdminButton from './MakeAdminButton';

const UserCard = ({ user, onDeleteClick }) => {
    return (
        <Card className="mb-3" style={{ margin: '10px', padding: '10px' }}>
            <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>{user.firstname}</Card.Text>
            <Card.Text>{user.lastname}</Card.Text>
            <Card.Text>{user.email}</Card.Text>
            <Card.Text>{user._id}</Card.Text>
            <Card.Text>{user.isAdmin}</Card.Text>
            <MakeAdminButton user={user} />
            </Card.Body>
            <Button variant="danger" onClick={() => onDeleteClick(user._id)}>Delete</Button>
        </Card>
    );
};

export default UserCard;