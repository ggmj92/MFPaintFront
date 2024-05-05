import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Search = ({ queryData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`http://localhost:3000/search?searchTerm=${searchTerm}`);
    const data = await response.json();
    queryData(data);
    setLoading(false);

    navigate(`/search?searchTerm=${searchTerm}`, { state: { artists: data.artists, artworks: data.artworks, blogPosts: data.blogPosts } });
  };

  return (
    <Form onSubmit={handleSearch} className="search-form">
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" className="search-button">Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
