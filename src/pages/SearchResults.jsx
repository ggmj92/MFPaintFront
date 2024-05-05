import React, { useState } from 'react';
import ArtistCard from '../components/ArtistPreviewCard';
import ArtworkCard from '../components/ArtworkPreviewCard';
import BlogPostCard from '../components/BlogPostPreviewCard';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { artists, artworks, blogPosts } = location.state || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!artists && !artworks && !blogPosts) {
        return <div>No results found.</div>;
    }

    return (
        <>
            <h1>Search Results</h1>
            <div>
                {artists && artists.map((artist) => (
                    <ArtistCard
                        key={artist._id}
                        artist={artist}
                        onViewClick={() => onViewClick(artist._id)}
                        onEditClick={() => onEditClick(artist._id)}
                        onDeleteClick={() => onDeleteClick(artist._id)}
                    />
                ))}
                {artworks && artworks.map((artwork) => (
                    <ArtworkCard
                        key={artwork._id}
                        artwork={artwork}
                        onViewClick={() => onViewClick(artwork._id)}
                        onEditClick={() => onEditClick(artwork._id)}
                        onDeleteClick={() => onDeleteClick(artwork._id)}
                    />
                ))}
                {blogPosts && blogPosts.map((blogPost) => (
                    <BlogPostCard
                        key={blogPost._id}
                        blogPost={blogPost}
                        onViewClick={() => onViewClick(blogPost._id)}
                        onEditClick={() => onEditClick(blogPost._id)}
                        onDeleteClick={() => onDeleteClick(blogPost._id)}
                    />
                ))}
            </div>
        </>
    );
};

export default SearchResults;
