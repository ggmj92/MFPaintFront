import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function ArtistImage({ artistId }) {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (artistId) {
            const fetchImageUrl = async () => {
                try {
                    const storage = getStorage();
                    const imageRef = ref(storage, `artists/${artistId}/image.jpg`);
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
    }, [artistId]);
};

export default ArtistImage;