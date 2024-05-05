import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LoadingPopup from '../components/LoadingPopup';
import { auth } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const UserSettings = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
          setEmail(user.email);
          setUsername(user.displayName);
      }
  }, []);

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const user = auth.currentUser;

        try {
            await updateProfile(user, {
                displayName: username,
            });

            const db = getFirestore();
            const userDocRef = doc(db, 'users', user.uid);

            await updateDoc(userDocRef, {
                username,
                email,
            });

            navigate(`/user/${user.displayName}/home`);
        } catch (error) {
            console.error('Error when updating user', error);
        }

        setLoading(false);
        setEditMode(false); 
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <div className='container'>
            <h1>User Settings</h1>
            {editMode ? (
                <Form onSubmit={handleUpdateSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Enter username"
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                    <Button variant="secondary" onClick={toggleEditMode}>
                        Cancel
                    </Button>
                </Form>
            ) : (
                <div>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <Button variant="primary" onClick={toggleEditMode}>
                        Edit
                    </Button>
                </div>
            )}
            {loading && <LoadingPopup />}
        </div>
    );
};

export default UserSettings;

