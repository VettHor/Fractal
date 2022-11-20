import { Container, Row, Col } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';
import fractalImg from '../assets/img/fractal_test.png'
import colorImg from '../assets/img/color_test.png'
import transformationImg from '../assets/img/transformation_test.png'
import mixedImg from '../assets/img/mixed_test.png'
import kochSnowflakeGif from '../assets/gif/koch-snowflake.gif'

export const Test = () => {
    const [topic, setTopic] = useState('');
    return(
        <section className='test' id="test">
            <ParticleBackground/>
            <Container fluid className='h-100'>
                { !topic &&
                    <Row className='text-center'>
                        <h1 className='header-selector'>Select the topic of the test</h1>
                    </Row>
                }
                <Row>
                    { !topic &&
                        [fractalImg, colorImg, transformationImg, mixedImg].map((img, i) => {
                            const topics = ["Fractal", "Color", "Transformation", "Mixed"];
                            return <Col>
                                <span className="navbar-button navbar-button-slide home-button transparent-button-active">
                                    <button onClick={() => { 
                                            setTopic(topics[i]);
                                        }}>
                                        <span className='test-option'>{topics[i]}</span>
                                        <img src={img} draggable="false"></img>
                                    </button>
                                </span>
                            </Col>
                        })
                    }
                </Row>

                { topic === 'Fractal' &&
                    <Row>
                        <h1 className='header-topic'>Fractal test</h1>
                        <div className='test-blank-container'>
                            <div className='test-blank'>
                                <h2 className='header-question'>1. Fractal is a structure made up of parts . . .</h2>
                                <div className='answers'>
                                    <Row>
                                        <div className='d-flex align-items-center'>
                                            <input type="radio" name="fractal-question-1" value="1"/>
                                            <label>that are in some sense similar to the whole</label>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className='d-flex align-items-center'>
                                            <input type="radio" name="fractal-question-1" value="1"/>
                                            <label>that are completely dissimilar to the whole</label>
                                        </div>
                                    </Row>
                                </div>


                                <h2 className='header-question'>2. What is the given fractal called?</h2>
                                <div className='d-flex justify-content-left'>
                                    <div className='answers'>
                                        <Row>
                                            <div className='d-flex align-items-center'>
                                                <input type="radio" name="fractal-question-1" value="1"/>
                                                <label>Koch snowflake</label>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='d-flex align-items-center'>
                                                <input type="radio" name="fractal-question-1" value="1"/>
                                                <label>Serpinsky carpet</label>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='d-flex align-items-center'>
                                                <input type="radio" name="fractal-question-1" value="1"/>
                                                <label>Julia set</label>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='d-flex align-items-center'>
                                                <input type="radio" name="fractal-question-1" value="1"/>
                                                <label>Mandelbrot set</label>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='d-flex align-items-center'>
                                                <input type="radio" name="fractal-question-1" value="1"/>
                                                <label>Newton</label>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='d-flex align-items-center'>
                                                <input type="radio" name="fractal-question-1" value="1"/>
                                                <label>Barnsley fern</label>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className='d-flex align-items-center'>
                                                <input type="radio" name="fractal-question-1" value="1"/>
                                                <label>Cesaro</label>
                                            </div>
                                        </Row>
                                    </div>
                                    <div className='m-auto right-gif-align'>
                                        <img src={kochSnowflakeGif} width={400} className='rounded-circle'></img>
                                    </div>
                                </div>

                                <h2 className='header-question'>3. How many iterations passed from the initial state to the final state?</h2>
                                <div className='d-flex justify-content-center'>
                                    {/* <div className='ratio ratio-16x9 w-50'>
                                        <iframe src="https://www.youtube.com/embed/MTYW4Re_RsY?enablejsapi=1&version=3&playerapiid=ytplayer" title="Fractal" allowFullScreen></iframe>
                                    </div> */}
                                </div>

                                <h2 className='header-question'>4. What is the base shape of the given fractal?</h2>

                                <h2 className='header-question'>5. What is the inner shape of the given fractal?</h2>
                            </div>
                        </div>
                    </Row>
                }
            </Container>
        </section>
    );
}