import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { ParticleBackground } from './ParticleBackground';
import fractalImg from '../assets/img/fractal_test.png'
import colorImg from '../assets/img/color_test.png'
import transformationImg from '../assets/img/transformation_test.png'
import mixedImg from '../assets/img/mixed_test.png'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeftLong } from "@fortawesome/free-solid-svg-icons"

import mandelbrot from '../assets/img/study/Mandelbrot.jpg'

import KochSnowflake from '../assets/img/study/KochSnowflake.gif'
import KochCurve from '../assets/img/study/KochCurve.gif'
import HilbertPeanoCurve from '../assets/img/study/HilbertPeanoCurve.gif'
import Sierpinskicarpet from '../assets/img/study/Sierpinskicarpet.gif'
import Sierpinskitriangle from '../assets/img/study/Sierpinskitriangle.gif'
import Dragoncurve from '../assets/img/study/Dragoncurve.gif'

import ColouringPencils from '../assets/img/study/Colouring_pencils.jpg'
import RGB from '../assets/img/study/RGB.jpg'
import HSV from '../assets/img/study/HSV.jpg'

import translate from '../assets/img/study/translate.png'
import rotate from '../assets/img/study/rotate.png'
import scale from '../assets/img/study/scale.png'

export const Study = () => {
    const topics = ["Fractal", "Color", "Transformation"];
    const [topic, setTopic] = useState('');

    return(
        <section className='study' id="study">
            <ParticleBackground/>
            <Container fluid className='h-100'>
                { !topic && 
                    <div className='test-selection study-selection'>
                        <Row className='text-center'>
                            <h1 className='header-selector-study'>Select the topic to learn</h1>
                        </Row>
                        <Row>
                            {
                                [fractalImg, colorImg, transformationImg].map((img, i) => {
                                    return <Col>
                                        <span className="navbar-button navbar-button-slide home-button transparent-button-active">
                                            <button onClick={() => { 
                                                    setTopic(topics[i]);
                                                }}>
                                                <span className='test-option'>{topics[i]}</span>
                                                <img src={img} draggable="false" width={350}></img>
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



                        { topic === 'Fractal' &&
                            <Row>
                                <div className='test-blank-container'>
                                    <div className='test-blank'>
                                        <h1 className='study-header-topic'>What are fractals?</h1>
                                        <img className='centered-img' src={mandelbrot} height={350}></img>
                                        <p className='study-text'>A Fractal is a type of mathematical shape that are infinitely complex. In essence, a Fractal is a pattern that repeats forever, and every part of the Fractal, regardless of how zoomed in, or zoomed out you are, it looks very similar to the whole image.</p>

                                        <h1 className='study-header-topic'>Fractals in real world</h1>
                                        <p className='study-text'>Trees and ferns are fractal in nature and can be modeled on computers using recursive algorithms. Such recursiveness is clearly visible in the following examples: a branch of a tree or a frond of a fern is a miniature reproduction of the whole, not identical, but similar in nature.</p>
                                        <div className='d-flex justify-content-center align-items-center w-100 mb-5'>
                                            <div className='ratio ratio-16x9 w-50'>
                                                <iframe src="https://www.youtube.com/embed/rGwwydEWLiI?enablejsapi=1&version=3&playerapiid=ytplayer" title="Fractal" allowFullScreen></iframe>
                                                {/* <iframe src="https://www.youtube.com/embed/MTYW4Re_RsY?enablejsapi=1&version=3&playerapiid=ytplayer" title="Fractal" allowFullScreen></iframe> */}
                                            </div>
                                        </div>

                                        <h1 className='study-header-topic'>Classification by construction method</h1>
                                        <p className='study-text'>Classification by construction method is most often used :</p>
                                        <ul>
                                            <li><p className='study-text'>Geometric (constructive)</p></li>
                                            <li><p className='study-text'>Algebraic (recurrent, dynamic)</p></li>
                                            <li><p className='study-text'>Stochastic (random)</p></li>
                                        </ul>

                                        <h1 className='study-header-topic'>Geometric fractals</h1>
                                        <p className='study-text'>Fractals of this type are built in stages. First, the base is depicted. Then some parts of the base are replaced by a fragment. At each subsequent stage, the parts of the already constructed figure, similar to the replaced parts of the base, are again replaced by a fragment taken at the appropriate scale. Each time the scale decreases.</p>

                                        <p className='study-text mt-4'>The most famous fractals of this type :</p>
                                        <ul>
                                            <li><p className='study-text'>Koch snowflake</p></li>
                                            <div className='d-flex justify-content-center'>
                                                <img src={KochSnowflake} width={350}></img>
                                            </div>

                                            <li><p className='study-text'>Koch curve</p></li>
                                            <div className='d-flex justify-content-center'>
                                                <img src={KochCurve} width={500}></img>
                                            </div>

                                            <li><p className='study-text'>Hilbert-Peano curve</p></li>
                                            <div className='d-flex justify-content-center'>
                                                <img src={HilbertPeanoCurve} width={350}></img>
                                            </div>
                                            
                                            <li><p className='study-text'>Sierpinski carpet</p></li>
                                            <div className='d-flex justify-content-center'>
                                                <img src={Sierpinskicarpet} width={350}></img>
                                            </div>

                                            <li><p className='study-text'>Sierpinski triangle</p></li>
                                            <div className='d-flex justify-content-center'>
                                                <img src={Sierpinskitriangle} width={350}></img>
                                            </div>

                                            <li><p className='study-text'>Dragon curve</p></li>
                                            <div className='d-flex justify-content-center'>
                                                <img src={Dragoncurve} width={350}></img>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </Row>
                        }



                        { topic === 'Color' &&
                            <Row>
                                <div className='test-blank-container'>
                                    <div className='test-blank'>
                                        <h1 className='study-header-topic'>What is color?</h1>
                                        <div className='d-flex justify-content-center mb-4'>
                                            <img src={ColouringPencils} width={600}></img>
                                        </div>
                                        <p className='study-text'>Color is a characteristic of the effect of radiation on the human eye. It should be noted that color also has a psychophysical nature, that is, the perception of color is subjective and depends not only on the physical properties of light, but also on the interpretation of light by the human visual system.</p>

                                        <h1 className='study-header-topic'>Color models</h1>
                                        <p className='study-text mt-4'>There are many different color models :</p>
                                        <ul>
                                            <li><p className='study-text'>RGB</p></li>
                                            <li><p className='study-text'>CMYK</p></li>
                                            <li><p className='study-text'>HSV</p></li>
                                            <li><p className='study-text'>HSL</p></li>
                                        </ul>

                                        <h1 className='study-header-topic'>RGB</h1>
                                        <div className='d-flex justify-content-center mb-4'>
                                            <img src={RGB} width={600}></img>
                                        </div>
                                        <p className='study-text'>This model is used by monitors, televisions, scanners, slide projectors, color advertising lamps and other devices in which color is obtained by mixing light beams. It is also used to describe colors on web pages in a special hexadecimal form (#RRGGBB).</p>
                                        <p className='study-text'>It is a hardware-oriented model in which colors are described by adding three basic colors – red, green, blue – in different proportions. Therefore, the RGB model is called additive.</p>
                                        <p className='study-text'>There are a lot of colours when combining R, G adn B values :</p>
                                        <div className='d-flex justify-content-center align-items-center w-100 mb-5'>
                                            <div className='ratio ratio-16x9 w-50'>
                                                <iframe src="https://www.youtube.com/embed/lL0pxSslCzo?enablejsapi=1&version=3&playerapiid=ytplayer" title="Fractal" allowFullScreen></iframe>
                                            </div>
                                        </div>

                                        <h1 className='study-header-topic'>HSV</h1>
                                        <div className='d-flex justify-content-center mb-4'>
                                            <img src={HSV} width={400}></img>
                                        </div>
                                        <p className='study-text'>It is convenient to represent it in the form of a light hexagonal pyramid. At the same time, the value V is placed along the vertical axis, and the distance from the axis to the side face in the horizontal section corresponds to the parameter S. The hexagon at the base of the pyramid is a projection of the color cube in the direction of its main diagonal. The tone of the color H is given by the angle placed around the vertical axis, starting from red.</p>
                                        <div className='d-flex justify-content-center align-items-center w-100 mb-5'>
                                            <div className='ratio ratio-16x9 w-50'>
                                                <iframe src="https://www.youtube.com/embed/NAw2_NtGNaA?enablejsapi=1&version=3&playerapiid=ytplayer" title="Fractal" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        }



                        { topic === 'Transformation' &&
                            <Row>
                                <div className='test-blank-container'>
                                    <div className='test-blank'>
                                        <h1 className='study-header-topic'>Affine transformation</h1>
                                        <p className='study-text mt-4'>Affine transformations of three kinds are the basis for moving images :</p>
                                        <ul>
                                            <li><p className='study-text'>Translation</p></li>
                                            <li><p className='study-text'>Scaling</p></li>
                                            <li><p className='study-text'>Rotation</p></li>
                                        </ul>
                                        <div className='d-flex justify-content-center align-items-center w-100 mb-5'>
                                            <div className='ratio ratio-16x9 w-50'>
                                                <iframe src="https://www.youtube.com/embed/AheaTd_l5Is?enablejsapi=1&version=3&playerapiid=ytplayer" title="Fractal" allowFullScreen></iframe>
                                            </div>
                                        </div>

                                        <h1 className='study-header-topic'>Translation</h1>
                                        <p className='study-text'>An elementary translation is considered a parallel transfer of an object (coordinate system) by specified values relative to the origin of coordinates (0,0).</p>
                                        <div className='d-flex justify-content-center mb-4'>
                                            <img src={translate} width={600}></img>
                                        </div>

                                        <h1 className='study-header-topic'>Scaling</h1>
                                        <p className='study-text'>The scaling of the coordinate system is given as a change in unit segments.</p>
                                        <div className='d-flex justify-content-center mb-4'>
                                            <img src={scale} width={600}></img>
                                        </div>

                                        <h1 className='study-header-topic'>Rotation</h1>
                                        <p className='study-text'>The rotation of an object or a coordinate system by an angle is an elementary transformation if it is performed relative to the origin of the coordinates.</p>
                                        <div className='d-flex justify-content-center mb-5'>
                                            <img src={rotate} width={600}></img>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        }

                        <Row>
                            <div className='finish-div'>
                                <span className="navbar-button navbar-button-slide home-button finish-button transparent-button-active">
                                    <div className='d-flex gap-5'>
                                        <button onClick={(event) => { 
                                                window.scrollTo(0, 0);
                                            }}>
                                            <span className='test-option'>Scroll up</span>
                                        </button> 
                                        <button onClick={(event) => { 
                                                setTopic('');
                                            }}>
                                            <span className='test-option'>Back to menu</span>
                                        </button> 
                                    </div>
                                </span>
                            </div>
                        </Row>
                    </div>
                }
            </Container>
        </section>
    );
}