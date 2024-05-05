import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LoadingPopup from '../components/LoadingPopup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const SignupForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: username,
            });

            const db = getFirestore(); 
            const userDocRef = doc(db, 'users', user.uid); 

            const userData = {
                firstname,
                lastname,
                username,
                email,
            };

            await setDoc(userDocRef, userData);

            const formData = {
                firstname,
                lastname,
                username,
                email,
            };

            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const userMongo = await response.json();
            console.log("User created in MongoDB:", userMongo);
            navigate(`/user/${user.displayName}/home`);

        } catch (error) {
            console.error('Error when signing up', error);
        }
        setLoading(false);
    };

    return (
        <div className='container'>
            <h1>Sign up</h1>
            <Form onSubmit={handleSignupSubmit}>
                <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                        placeholder="Enter first name"
                    />
                </Form.Group>
                <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        placeholder="Enter last name"
                    />
                </Form.Group>
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
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign up
                </Button>
            </Form>
            {loading && <LoadingPopup />}
        </div>
    );
};

export default SignupForm;
