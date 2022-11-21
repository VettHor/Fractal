import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';
import fractalImg from '../assets/img/fractal_test.png'
import colorImg from '../assets/img/color_test.png'
import transformationImg from '../assets/img/transformation_test.png'
import mixedImg from '../assets/img/mixed_test.png'
import kochSnowflakeGif from '../assets/gif/koch-snowflake.gif'

import kochInitialImg from '../assets/img/koch_initial.png'
import kochFinalImg from '../assets/img/koch_final.png'
import arrowResult from '../assets/img/arrow_result.png'
import kochBaseImg from '../assets/img/koch_base.png'
import kochInternalImg from '../assets/img/koch_internal.png'
import arrowBackImg from '../assets/img/arrow_back.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeftLong } from "@fortawesome/free-solid-svg-icons"

export const Test = () => {
    const topics = ["Fractal", "Color", "Transformation", "Mixed"];
    const [topic, setTopic] = useState('');

    const doSmth = () => {
        console.log('wor');
    }

    return(
        <section className='test' id="test">
            <ParticleBackground/>
            <Container fluid className='h-100'>
                { !topic && 
                    <div className='test-selection'>
                        <Row className='text-center'>
                            <h1 className='header-selector'>Select the topic of the test</h1>
                        </Row>
                        <Row>
                            {
                                [fractalImg, colorImg, transformationImg, mixedImg].map((img, i) => {
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
                    </div>
                }

                { topic && 
                    <div>
                        <div className='d-flex align-items-center justify-content-center mt-4'>
                            <span className="navbar-button navbar-button-slide home-button back-button transparent-button-active position-absolute">
                                <button onClick={() => { 
                                        setTopic('');
                                    }}>
                                    <div className='icon-back'>
                                        <FontAwesomeIcon icon={faLeftLong} size="6x" style={{transform: 'scale(2, 1)'}}/>
                                    </div>
                                </button>
                            </span>
                            <h1 className='header-topic'>{topics[topics.indexOf(topic)]}</h1>
                        </div>
                        <Form onSubmit={doSmth}>
                            { topic === 'Fractal' &&
                                <Row>
                                    <div className='test-blank-container'>
                                        <div className='test-blank'>
                                            <h2 className='header-question'>1. Fractal is a structure made up of parts . . .</h2>
                                            <div className='answers'>
                                                <Row>
                                                    <div className='d-flex align-items-center'>
                                                        <input type="radio" name="fractal-question-1" value="1" required
                                                        onInvalid={F => F.target.setCustomValidity('Enter User Name Here')} 
                                                        onInput={F => F.target.setCustomValidity('')} />
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
                                                            <input type="radio" name="fractal-question-1" value="1" required/>
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
                                            <div className='d-flex justify-content-center align-items-center w-100'>
                                                {/* <div className='ratio ratio-16x9 w-50'>
                                                    <iframe src="https://www.youtube.com/embed/MTYW4Re_RsY?enablejsapi=1&version=3&playerapiid=ytplayer" title="Fractal" allowFullScreen></iframe>
                                                </div> */}
                                            </div>

                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1" required/>
                                                            <label>1</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>2</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>3</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>4</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>5</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-koch-align'>
                                                    <img src={kochInitialImg} className='px-5 rounded-circle' alt="Initial Koch" width={500}></img>
                                                    <img src={arrowResult} alt="Arrow" width={150} height={100}></img>
                                                    <img src={kochFinalImg} className='px-5 rounded-circle' alt="Final Koch" width={500}></img>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>4. What is the base shape of the given fractal?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1" required/>
                                                            <label>Parallelogram</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Pentagon</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Circle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Triangle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Square</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-gif-align'>
                                                    <img src={kochBaseImg} width={450} className='rounded-circle'></img>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>5. What is the internal shape of the given fractal?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1" required/>
                                                            <label>Parallelogram</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Pentagon</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Circle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Triangle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-1" value="1"/>
                                                            <label>Square</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-gif-align mb-5'>
                                                    <img src={kochInternalImg} width={450} className='rounded'></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            }

                            <Row>
                                <div className='finish-div'>
                                    <span className="navbar-button navbar-button-slide home-button finish-button transparent-button-active">
                                        <button type="submit" onClick={() => { 
                            
                                            }}>
                                            <span className='test-option'>Finish</span>
                                        </button>
                                    </span>
                                </div>
                            </Row>
                        </Form>
                    </div>
                }
            </Container>
        </section>
    );
}