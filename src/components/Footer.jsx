import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import '../App.css';

function Footer() {
    return (
        <footer className="bg-dark text-light py-5">
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h4>MFPaint</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi alias repudiandae ea magnam optio at molestias perspiciatis fuga veniam reiciendis!
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h3>Social Media</h3>
                            <Row className="d-flex flex-column">
                                <Col>
                                    <a href="https://web.facebook.com/p/ET-vestido-de-gitana-100050376254835/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
                                        <Button variant="link" className="p-0 me-2">
                                            <i className="fab fa-facebook-f"></i>
                                        </Button>
                                    </a>
                                </Col>
                                <Col>
                                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
                                        <Button variant="link" className="p-0 me-2">
                                            <i className="fab fa-youtube"></i>
                                        </Button>
                                    </a>
                                </Col>
                                <Col>
                                    <a href="https://www.instagram.com/pitbull/" target="_blank" rel="noopener noreferrer">
                                        <Button variant="link" className="p-0 me-2">
                                            <i className="fab fa-instagram"></i>
                                        </Button>
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <p>
                                <a href="https://www.google.com/maps/search/Jirón+Pérez+Roca+299,+15063,+Lima,+Perú" target="_blank" rel="noopener noreferrer">
                                    Jirón Pérez Roca 299, 15063, Lima, Perú
                                </a>
                            </p>
                            <p>
                                <a href="mailto:info@example.com">info@example.com</a>
                            </p>
                            <p>(+51) 234567890</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>© 2024 Gabriel Garcia-Miro. Lima, Peru. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;

