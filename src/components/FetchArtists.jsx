import { useEffect, useState } from 'react';

const FetchArtists = ({ setArtists }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`http://localhost:3000/artists?search=${searchTerm}`);
                const artistsData = await result.json();
                setArtists(artistsData);
            } catch (error) {
                console.error('Error fetching artists: ', error);
            }
        };
        fetchData();
    }, [searchTerm]);

    return null;
};

export default FetchArtists;