import React from 'react';
import { Container } from 'react-bootstrap';
import Search from './Search';

function Header({ authUser }) {
  return (
    <header className="bg-dark text-light py-4">
      <Container className="d-flex justify-content-between">
        <p className="my-auto">Welcome, {authUser?.displayName || authUser?.email || 'Guest'}!</p>
        <Search queryData={(data) => console.log(data)} />
      </Container>
    </header>
  );
}

export default Header;