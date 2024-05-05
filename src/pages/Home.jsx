import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FetchArtworks from '../components/FetchArtworks';
import Slideshow from '../components/Slideshow'

export default function Home() {
    const [artworks, setArtworks] = useState();

    return (
        <Container className="py-4 d-flex justify-content-center align-items-center">
            <div style={{ width: '50%' }}>
                <h4>MFPaint es una plataforma y base de datos de inventario, ventas y sitio web diseñada para galerías, artistas y coleccionistas. Es un inventario que simplifica las operaciones de ventas y organización para agentes del circuito artístico. Te permite ahorrar tiempo para centrarte en lo que más importa: el arte.</h4>
            </div>
            <Container style={{ width: '50%' }} className="py-4 d-flex justify-content-center align-items-center">
                <FetchArtworks setArtworks={setArtworks} />
                <Slideshow artworks={artworks} />
            </Container> </Container>
    );
};