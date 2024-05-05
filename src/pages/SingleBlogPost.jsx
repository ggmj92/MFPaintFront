import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteConfirm from '../components/DeleteConfirm';
import BlogDetails from '../components/BlogPostDetailsCard';
import BlogImage from '../components/BlogPostImage';
import EditDeleteButtons from '../components/EditDeleteButtons';

function BlogPost() {
    const navigate = useNavigate();

    const { blogPostId } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedBlogPostId, setSelectedBlogPostId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`http://localhost:3000/blogpost/${blogPostId}`);
                const blogPostData = await result.json();
                setBlogPost(blogPostData);
                
            } catch (error) {
                console.error('Error fetching blog post details:, ', error);
            }
        };
        fetchData();
    }, [blogPostId]);
    

    if (!blogPost) {
        return <div>Loading... </div>;
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
            navigate('/blog');
            setSuccessMessage('Blog post deleted successfully');
            setShowModal(false);
            setSelectedBlogPostId(null);
        } catch (error) {
            console.error('Error deleting blog post:', error);
        }
    };

    return (
        <>
            <div>
                <h1>{blogPost.title}</h1>
                <p>{blogPost._id}</p>
            </div>
            <BlogDetails blogPost={blogPost} key={blogPost._id} />
            <BlogImage blogPost={blogPost} />
            <EditDeleteButtons
                id={blogPost._id}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                type="blog"
            />
            <DeleteConfirm
                showModal={showModal}
                hideModal={() => setShowModal(false)}
                confirmModal={handleConfirmDelete}
                id={selectedBlogPostId}
                type="blog"
                message="Are you sure you want to delete this blog post?"
            />
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </>
    );
};

export default BlogPost;