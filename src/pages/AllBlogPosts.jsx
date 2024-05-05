import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlogPostPreviewCard from '../components/BlogPostPreviewCard';
import FetchBlogPosts from '../components/FetchBlogPosts';
import DeleteConfirm from '../components/DeleteConfirm';

function AllBlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleViewClick = (blogPostId) => {
    navigate(`/blogpost/${blogPostId}`)
  }

  const handleEditClick = (blogPostId) => {
    navigate(`/updateblogpost/${blogPostId}/`);
  }

  const handleDeleteClick = (blogPostId) => {
    setSelectedBlogPostId(blogPostId);
    setShowModal(true);
  }

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:3000/deleteblogpost/${selectedBlogPostId}`, {
        method: 'DELETE',
      });
      setSuccessMessage('Blog post deleted successfully');
      setShowModal(false);
      setSelectedBlogPostId(null);
      setBlogPosts(prevBlogPosts => prevBlogPosts.filter(blogPost => blogPost._id !== selectedBlogPostId));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const navigate = useNavigate();


  return (
    <>
      <h1>MF Paint Blog</h1>
      <FetchBlogPosts setBlogPosts={setBlogPosts} />
      <Container className='blogpost-container'>
        <Row>
          {blogPosts.map(blogPost => (
            <Col md={4} key={blogPost._id}>
              <BlogPostPreviewCard
                blogPost={blogPost}
                onViewClick={handleViewClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <DeleteConfirm
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        confirmModal={handleConfirmDelete}
        id={selectedBlogPostId}
        type="blogpost"
        message="Are you sure you want to delete this blogpost?"
      />
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </>
  );
};

export default AllBlogPosts;