import { Container, Row, Col } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';
import fractalImg from '../assets/img/fractal_test.png'
import colorImg from '../assets/img/color_test.png'
import transformationImg from '../assets/img/transformation_test.png'
import mixedImg from '../assets/img/mixed_test.png'

export const Test = () => {

    return(
        <section className='test' id="test">
            <ParticleBackground/>
            <Container fluid>
                <Row className='text-center'>
                    <h1 className='header-selector'>Select the topic of the test</h1>
                </Row>
                <Row>
                    {
                        [fractalImg, colorImg, transformationImg, mixedImg].map((img, i) => {
                            const topics = ["Fractal", "Color", "Transformation", "Mixed"];
                            return <Col>
                                <span className="navbar-button navbar-button-slide home-button">
                                    <button onClick={() => { 

                                        }}>
                                        <span className='test-option'>{topics[i]}</span>
                                        <img src={img}></img>
                                    </button>
                                </span>
                            </Col>
                        })
                    }
                </Row>
            </Container>
        </section>
    );
}