import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function ArtworkImage({ artworkId }) {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (artworkId) {
            const fetchImageUrl = async () => {
                try {
                    const storage = getStorage();
                    const imageRef = ref(storage, `artworks/${artworkId}/image.jpg`);
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
    }, [artworkId]);
}


export default ArtworkImage;
