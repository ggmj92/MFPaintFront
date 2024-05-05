import { useEffect, useState } from 'react';

const FetchBlogPosts = ({ setBlogPosts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`http://localhost:3000/blog?search=${searchTerm}`);
                const blogPostData = await result.json();
                setBlogPosts(blogPostData);
            } catch (error) {
                console.error('Error fetching blog posts: ', error);
            }
        };
        fetchData();
    }, [searchTerm]);
    
    return null;
};

export default FetchBlogPosts;