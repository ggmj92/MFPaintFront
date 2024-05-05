import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function BlogPostImage({ blogPostId }) {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogPostId) {
            const fetchImageUrl = async () => {
                try {
                    const storage = getStorage();
                    const imageRef = ref(storage, `blogposts/${blogPostId}/image.jpg`);
                    const url = await getDownloadURL(imageRef);
                    setImageUrl(url);
                } catch (error) {
                    console.error('Error fetching image URL:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchImageUrl();
        }
    }, [blogPostId]);
};

export default BlogPostImage;