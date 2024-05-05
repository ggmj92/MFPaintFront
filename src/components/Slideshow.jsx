import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../styles/slick.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slideshow = ({ artworks }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (artworks && artworks.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % artworks.length);
            }, 40000);
            return () => clearInterval(interval);
        }
    }, [artworks]);

    if (!artworks || artworks.length === 0) {
        return <div>No artworks to display</div>;
    }

    const filteredArtworks = artworks.filter(artwork => artwork.image);

    if (filteredArtworks.length === 0) {
        return <div>No artworks with images to display</div>;
    }

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: currentSlide,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    return (
        <Slider {...settings} className='slider-container'>
            {filteredArtworks.map((artwork) => (
                <div key={artwork._id} className='slider-slide'>
                    <img src={artwork.image} alt={artwork._id} className='slider-image' />
                </div>
            ))}
        </Slider>
    );
};

export default Slideshow;

