import { useEffect, useState } from 'react';

const FetchArtworks = ({ setArtworks }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('http://localhost:3000/artworks');
                const artworksData = await result.json();
                setArtworks(artworksData);
            } catch (error) {
                console.error('Error fetching artworks: ', error);
            }
        };
        fetchData();
    }, []);

    return null;
};

export default FetchArtworks;
