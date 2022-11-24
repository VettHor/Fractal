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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeftLong } from "@fortawesome/free-solid-svg-icons"

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css';
import robot from '../assets/img/light_robot.png'

import originalColor from '../assets/img/color_test/original_color.png' 
import yellowChanged from '../assets/img/color_test/yellow_changed.png' 
import redChanged from '../assets/img/color_test/red_changed.png' 
import greenChanged from '../assets/img/color_test/green_changed.png' 
import cyanChanged from '../assets/img/color_test/cyan_changed.png'

import vMinBalloons from '../assets/img/color_test/v_min_ballons.png'
import vMore0Balloons from '../assets/img/color_test/v_more_0_ballons.png'
import vMaxBalloons from '../assets/img/color_test/v_max_ballons.png'
import originalBalloons from '../assets/img/color_test/original_ballons.png'

import parallelogramStartImg from '../assets/img/transformation_test/parallelogram_start.png'
import parallelogramEndImg from '../assets/img/transformation_test/parallelogram_end.png'
import parallelogramScaledImg from '../assets/img/transformation_test/parallelogram_scaled.png'
import parallelogramRotatedImg from '../assets/img/transformation_test/parallelogram_rotated.png'
import parallelogramScaledRotatedImg from '../assets/img/transformation_test/parallelogram_scaled_rotated.png'

export const Test = () => {
    const topics = ["Fractal", "Color", "Transformation", "Mixed"];
    const rightFractalAnswers = ["in some sense similar", "Koch snowflake", "2", "Square", "Square"];
    const rightColorAnswers = ["True", "True", "Red", "Minimum", "HSV(0°, 0%, 100%)"];
    const rightTransformationAnswers = ["True", "A", "2", "45°", "90°, 2"];
    const rightMixedAnswers = ["True", "True", "2", "45°", "Square"];
    const [topic, setTopic] = useState('');
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [rightTestsAmount, setRightTestsAmount] = useState(0);


    useEffect(() => {
        if(isTestFinished) {
            setTimeout(() => {
                document.getElementById('result-mark').click();
            }, 1000);
        }
    }, [isTestFinished]);

    const checkAnswers = () => {
        let rightAnswers = topic === 'Fractal' ? rightFractalAnswers : 
                           topic === 'Color' ? rightColorAnswers :
                           topic === 'Transformation' ? rightTransformationAnswers :
                           topic === 'Mixed' ? rightMixedAnswers : null;

        for(let i = 0; i < rightAnswers.length; ++i) {
            let selectedRadio = document.querySelector(`input[name="${topic}-question-${i + 1}"]:checked`);
            if(selectedRadio === null) {
                setTimeout(() => {
                    document.getElementsByName(`${topic}-question-${i + 1}`)[0].reportValidity();
                }, 800);
                return false;
            }
        }
        setRightTestsAmount(0);
        for(let i = 0; i < rightAnswers.length; ++i) {
            let radios = document.getElementsByName(`${topic}-question-${i + 1}`);
            let selectedRadio = document.querySelector(`input[name="${topic}-question-${i + 1}"]:checked`);
            if(selectedRadio.value === rightAnswers[i])
                setRightTestsAmount(rightTestsAmount => rightTestsAmount + 1);
            else 
                selectedRadio.classList.add("wrong-answers");

            for(let j = 0; j < radios.length; ++j) {
                if(radios[j].value === rightAnswers[i])
                    radios[j].classList.add("right-answers");
                radios[j].disabled = true;
            }
        }
        return true;
    }

    const tryAgain = () => {
        let rightAnswers = topic === 'Fractal' ? rightFractalAnswers : 
                           topic === 'Color' ? rightColorAnswers :
                           topic === 'Transformation' ? rightTransformationAnswers :
                           topic === 'Mixed' ? rightMixedAnswers : null;

        setRightTestsAmount(0);
        for(let i = 0; i < rightAnswers.length; ++i) {
            let radios = document.getElementsByName(`${topic}-question-${i + 1}`);
            let selectedRadio = document.querySelector(`input[name="${topic}-question-${i + 1}"]:checked`);
            if(selectedRadio.value !== rightAnswers[i]) 
                selectedRadio.classList.remove("wrong-answers");

            for(let j = 0; j < radios.length; ++j) {
                if(radios[j].value === rightAnswers[i])
                    radios[j].classList.remove("right-answers");
                radios[j].disabled = false;
                radios[j].checked = false;
            }
        }
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
                                        setIsTestFinished(false);
                                        setTopic('');
                                    }}>
                                    <div className='icon-back'>
                                        <FontAwesomeIcon icon={faLeftLong} size="6x" style={{transform: 'scale(2, 1)'}}/>
                                    </div>
                                </button>
                            </span>
                            <h1 className='header-topic'>{topics[topics.indexOf(topic)]}</h1>
                        </div>
                        <Form>
                            { topic === 'Fractal' &&
                                <Row>
                                    <div className='test-blank-container'>
                                        <div className='test-blank'>
                                            { isTestFinished &&
                                                <div className='text-center'>
                                                    <Tippy 
                                                        trigger='click' 
                                                        duration={500} 
                                                        maxWidth={450} 
                                                        placement='bottom' 
                                                        animation='scale' 
                                                        theme={`${rightTestsAmount / rightFractalAnswers.length < 0.3 ? 'test-low' :
                                                                rightTestsAmount / rightFractalAnswers.length < 0.7 ? 'test-middle' : 'test-high'}`} 
                                                        content={
                                                            <div className='text-center'>
                                                                <Row>
                                                                    <span style={{fontSize: '3rem'}} className='mt-3'>
                                                                        {`${rightTestsAmount / rightFractalAnswers.length < 0.3 ? 'You can do better!' :
                                                                        rightTestsAmount / rightFractalAnswers.length < 0.7 ? 'Not bad! Try again!' : 'Good job!'}`}</span>
                                                                </Row>
                                                                <Row>
                                                                    <img src={robot}></img>
                                                                </Row>
                                                            </div>}>
                                                        <h1 id="result-mark" className='result-mark'
                                                            style={{color: `${rightTestsAmount / rightFractalAnswers.length < 0.3 ? '#a80b0b' :
                                                            rightTestsAmount / rightFractalAnswers.length < 0.7 ? '#ffb24a' : '#0c6b11'}`}}
                                                        >{rightTestsAmount} / {rightFractalAnswers.length} &nbsp;({rightTestsAmount / rightFractalAnswers.length * 100}%)</h1>
                                                    </Tippy>
                                                </div>
                                            }
                                            <h2 className='header-question'>1. Fractal is a structure made up of parts that are . . . to the whole</h2>
                                            <div className='answers'>
                                                <Row>
                                                    <div className='d-flex align-items-center'>
                                                        <input type="radio" name="Fractal-question-1" value="in some sense similar" required
                                                            onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                            onInput={e => e.target.setCustomValidity('')}/>
                                                        <label>in some sense similar</label>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className='d-flex align-items-center'>
                                                        <input type="radio" name="Fractal-question-1" value="completely dissimilar"/>
                                                        <label>completely dissimilar</label>
                                                    </div>
                                                </Row>
                                            </div>


                                            <h2 className='header-question'>2. What is the given fractal called?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-2" value="Koch snowflake" required
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>Koch snowflake</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-2" value="Serpinsky carpet"/>
                                                            <label>Serpinsky carpet</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-2" value="Julia set"/>
                                                            <label>Julia set</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-2" value="Mandelbrot set"/>
                                                            <label>Mandelbrot set</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-2" value="Newton"/>
                                                            <label>Newton</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-2" value="Barnsley fern"/>
                                                            <label>Barnsley fern</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-2" value="Cesaro"/>
                                                            <label>Cesaro</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-gif-align'>
                                                    <img src={kochSnowflakeGif} width={400} className='rounded-circle'></img>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>3. How many iterations passed from the initial state to the final state?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-3" value="1" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>1</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-3" value="2"/>
                                                            <label>2</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-3" value="3"/>
                                                            <label>3</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-3" value="4"/>
                                                            <label>4</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-3" value="5"/>
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
                                                            <input type="radio" name="Fractal-question-4" value="Parallelogram" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>Parallelogram</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-4" value="Pentagon"/>
                                                            <label>Pentagon</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-4" value="Circle"/>
                                                            <label>Circle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-4" value="Triangle"/>
                                                            <label>Triangle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-4" value="Square"/>
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
                                                            <input type="radio" name="Fractal-question-5" value="Parallelogram" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>Parallelogram</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-5" value="Pentagon"/>
                                                            <label>Pentagon</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-5" value="Circle"/>
                                                            <label>Circle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-5" value="Triangle"/>
                                                            <label>Triangle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Fractal-question-5" value="Square"/>
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



                            { topic === 'Color' &&
                                <Row>
                                    <div className='test-blank-container'>
                                        <div className='test-blank'>
                                            { isTestFinished &&
                                                <div className='text-center'>
                                                    <Tippy 
                                                        trigger='click' 
                                                        duration={500} 
                                                        maxWidth={450} 
                                                        placement='bottom' 
                                                        animation='scale' 
                                                        theme={`${rightTestsAmount / rightColorAnswers.length < 0.3 ? 'test-low' :
                                                                rightTestsAmount / rightColorAnswers.length < 0.7 ? 'test-middle' : 'test-high'}`} 
                                                        content={
                                                            <div className='text-center'>
                                                                <Row>
                                                                    <span style={{fontSize: '3rem'}} className='mt-3'>
                                                                        {`${rightTestsAmount / rightColorAnswers.length < 0.3 ? 'You can do better!' :
                                                                        rightTestsAmount / rightColorAnswers.length < 0.7 ? 'Not bad! Try again!' : 'Good job!'}`}</span>
                                                                </Row>
                                                                <Row>
                                                                    <img src={robot}></img>
                                                                </Row>
                                                            </div>}>
                                                        <h1 id="result-mark" className='result-mark'
                                                            style={{color: `${rightTestsAmount / rightColorAnswers.length < 0.3 ? '#a80b0b' :
                                                            rightTestsAmount / rightColorAnswers.length < 0.7 ? '#ffb24a' : '#0c6b11'}`}}
                                                        >{rightTestsAmount} / {rightColorAnswers.length} &nbsp;({rightTestsAmount / rightColorAnswers.length * 100}%)</h1>
                                                    </Tippy>
                                                </div>
                                            }

                                            <h2 className='header-question'>1. RGB is an additive color model</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Color-question-1" value="True" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>True</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Color-question-1" value="False"/>
                                                            <label>False</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>2. RGB is for the sensing, representation, and display of images in electronic systems</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Color-question-2" value="True" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>True</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Color-question-2" value="False"/>
                                                            <label>False</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>


                                            <h2 className='header-question'>3. In which image is the saturation (S) of the red color changed according to the HSV model?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center mb-2'>
                                                            <input type="radio" name="Color-question-3" value="Cyan"/>
                                                            <label><img src={cyanChanged} width={450}></img></label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center mb-2'>
                                                            <input type="radio" name="Color-question-3" value="Red"/>
                                                            <label><img src={redChanged} width={450}></img></label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Color-question-3" value="Green"/>
                                                            <label><img src={greenChanged} width={450}></img></label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-gif-align text-center'>
                                                    <img src={originalColor} width={600}></img>
                                                    <h1 className='image-description'>Original image</h1>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>4. In which image is the value (V) of the yellow color minimum according to the HSV model?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center mb-2'>
                                                            <input type="radio" name="Color-question-4" value="More 0" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label><img src={vMore0Balloons} width={450}></img></label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center mb-2'>
                                                            <input type="radio" name="Color-question-4" value="Maximum"/>
                                                            <label><img src={vMaxBalloons} width={450}></img></label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Color-question-4" value="Minimum"/>
                                                            <label><img src={vMinBalloons} width={450}></img></label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-gif-align text-center'>
                                                    <img src={originalBalloons} width={600}></img>
                                                    <h1 className='image-description'>Original image</h1>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>5. Convert RGB to HSV : RGB (255, 255, 255)</h2>
                                            <div className='answers'>
                                                <Row>
                                                    <div className='d-flex align-items-center'>
                                                        <input type="radio" name="Color-question-5" value="HSV(200°, 50%, 50%)" required
                                                            onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                            onInput={e => e.target.setCustomValidity('')}/>
                                                        <label>HSV (200°, 50%, 50%)</label>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className='d-flex align-items-center'>
                                                        <input type="radio" name="Color-question-5" value="HSV(50°, 100%, 100%)"/>
                                                        <label>HSV (50°, 100%, 100%)</label>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className='d-flex align-items-center'>
                                                        <input type="radio" name="Color-question-5" value="HSV(0°, 0%, 100%)"/>
                                                        <label>HSV (0°, 0%, 100%)</label>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className='d-flex align-items-center mb-5'>
                                                        <input type="radio" name="Color-question-5" value="HSV(100°, 50%, 100%)"/>
                                                        <label>HSV (100°, 50%, 100%)</label>
                                                    </div>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            }



                            { topic === 'Transformation' &&
                                <Row>
                                    <div className='test-blank-container'>
                                        <div className='test-blank'>
                                            { isTestFinished &&
                                                <div className='text-center'>
                                                    <Tippy 
                                                        trigger='click' 
                                                        duration={500} 
                                                        maxWidth={450} 
                                                        placement='bottom' 
                                                        animation='scale' 
                                                        theme={`${rightTestsAmount / rightTransformationAnswers.length < 0.3 ? 'test-low' :
                                                                rightTestsAmount / rightTransformationAnswers.length < 0.7 ? 'test-middle' : 'test-high'}`} 
                                                        content={
                                                            <div className='text-center'>
                                                                <Row>
                                                                    <span style={{fontSize: '3rem'}} className='mt-3'>
                                                                        {`${rightTestsAmount / rightTransformationAnswers.length < 0.3 ? 'You can do better!' :
                                                                        rightTestsAmount / rightTransformationAnswers.length < 0.7 ? 'Not bad! Try again!' : 'Good job!'}`}</span>
                                                                </Row>
                                                                <Row>
                                                                    <img src={robot}></img>
                                                                </Row>
                                                            </div>}>
                                                        <h1 id="result-mark" className='result-mark'
                                                            style={{color: `${rightTestsAmount / rightTransformationAnswers.length < 0.3 ? '#a80b0b' :
                                                            rightTestsAmount / rightTransformationAnswers.length < 0.7 ? '#ffb24a' : '#0c6b11'}`}}
                                                        >{rightTestsAmount} / {rightTransformationAnswers.length} &nbsp;({rightTestsAmount / rightTransformationAnswers.length * 100}%)</h1>
                                                    </Tippy>
                                                </div>
                                            }

                                            <h2 className='header-question'>1. Elementary transformations are Movement, Scaling, Rotation</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-1" value="True" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>True</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-1" value="False"/>
                                                            <label>False</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>2. Relative to which vertex of the parallelogram did a 90° counterclockwise turn occur?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center mt-5'>
                                                            <input type="radio" name="Transformation-question-2" value="A" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>A</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-2" value="B"/>
                                                            <label>B</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-2" value="C"/>
                                                            <label>C</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-2" value="D"/>
                                                            <label>D</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-koch-align'>
                                                    <img src={parallelogramStartImg} className='px-5' alt="Start parallelogram" width={600}></img>
                                                    <img src={arrowResult} alt="Arrow" width={150} height={100}></img>
                                                    <img src={parallelogramEndImg} className='px-5' alt="End parallelogram" width={600}></img>
                                                </div>
                                            </div>


                                            <h2 className='header-question'>3. How many times was the parallelogram reduced?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center mt-5'>
                                                            <input type="radio" name="Transformation-question-3" value="2" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>2</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-3" value="3"/>
                                                            <label>3</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-3" value="4"/>
                                                            <label>4</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-3" value="5"/>
                                                            <label>5</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-koch-align'>
                                                    <img src={parallelogramStartImg} className='px-5' alt="Start parallelogram" width={600}></img>
                                                    <img src={arrowResult} alt="Arrow" width={150} height={100}></img>
                                                    <img src={parallelogramScaledImg} className='px-5' alt="End parallelogram" width={600}></img>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>4. At what angle relative to point A was the parallelogram rotated clockwise?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center mt-5'>
                                                            <input type="radio" name="Transformation-question-4" value="30°" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>30°</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-4" value="45°"/>
                                                            <label>45°</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-4" value="60°"/>
                                                            <label>60°</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-4" value="90°"/>
                                                            <label>90°</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-parallelogram-scaled'>
                                                    <img src={parallelogramStartImg} className='px-5' alt="Start parallelogram" width={600}></img>
                                                    <img src={arrowResult} alt="Arrow" width={150} height={100}></img>
                                                    <img src={parallelogramRotatedImg} className='px-5' alt="End parallelogram" width={600}></img>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>5. At what angle relative to point A was the parallelogram turned clockwise and how many times was it scaled?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center mt-5'>
                                                            <input type="radio" name="Transformation-question-5" value="90°, 3" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>90°, 3</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-5" value="45°, 3"/>
                                                            <label>45°, 3</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-5" value="60°, 4"/>
                                                            <label>60°, 4</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Transformation-question-5" value="90°, 2"/>
                                                            <label>90°, 2</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-parallelogram-scaled-align mb-5'>
                                                    <img src={parallelogramStartImg} className='px-5' alt="Start parallelogram" width={600}></img>
                                                    <img src={arrowResult} alt="Arrow" width={150} height={100}></img>
                                                    <img src={parallelogramScaledRotatedImg} className='px-5' alt="End parallelogram" width={600}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            }


                            { topic === 'Mixed' &&
                                <Row>
                                    <div className='test-blank-container'>
                                        <div className='test-blank'>
                                            { isTestFinished &&
                                                <div className='text-center'>
                                                    <Tippy 
                                                        trigger='click' 
                                                        duration={500} 
                                                        maxWidth={450} 
                                                        placement='bottom' 
                                                        animation='scale' 
                                                        theme={`${rightTestsAmount / rightMixedAnswers.length < 0.3 ? 'test-low' :
                                                                rightTestsAmount / rightMixedAnswers.length < 0.7 ? 'test-middle' : 'test-high'}`} 
                                                        content={
                                                            <div className='text-center'>
                                                                <Row>
                                                                    <span style={{fontSize: '3rem'}} className='mt-3'>
                                                                        {`${rightTestsAmount / rightMixedAnswers.length < 0.3 ? 'You can do better!' :
                                                                        rightTestsAmount / rightMixedAnswers.length < 0.7 ? 'Not bad! Try again!' : 'Good job!'}`}</span>
                                                                </Row>
                                                                <Row>
                                                                    <img src={robot}></img>
                                                                </Row>
                                                            </div>}>
                                                        <h1 id="result-mark" className='result-mark'
                                                            style={{color: `${rightTestsAmount / rightMixedAnswers.length < 0.3 ? '#a80b0b' :
                                                            rightTestsAmount / rightMixedAnswers.length < 0.7 ? '#ffb24a' : '#0c6b11'}`}}
                                                        >{rightTestsAmount} / {rightMixedAnswers.length} &nbsp;({rightTestsAmount / rightMixedAnswers.length * 100}%)</h1>
                                                    </Tippy>
                                                </div>
                                            }

                                            <h2 className='header-question'>1. Elementary transformations are Movement, Scaling, Rotation</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-1" value="True" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>True</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-1" value="False"/>
                                                            <label>False</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>2. RGB is for the sensing, representation, and display of images in electronic systems</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-2" value="True" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>True</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-2" value="False"/>
                                                            <label>False</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </div>


                                            <h2 className='header-question'>3. How many iterations passed from the initial state to the final state?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-3" value="1" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>1</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-3" value="2"/>
                                                            <label>2</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-3" value="3"/>
                                                            <label>3</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-3" value="4"/>
                                                            <label>4</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-3" value="5"/>
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

                                            <h2 className='header-question'>4. At what angle relative to point A was the parallelogram rotated clockwise?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center mt-5'>
                                                            <input type="radio" name="Mixed-question-4" value="30°" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>30°</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-4" value="45°"/>
                                                            <label>45°</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-4" value="60°"/>
                                                            <label>60°</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-4" value="90°"/>
                                                            <label>90°</label>
                                                        </div>
                                                    </Row>
                                                </div>
                                                <div className='m-auto right-parallelogram-scaled'>
                                                    <img src={parallelogramStartImg} className='px-5' alt="Start parallelogram" width={600}></img>
                                                    <img src={arrowResult} alt="Arrow" width={150} height={100}></img>
                                                    <img src={parallelogramRotatedImg} className='px-5' alt="End parallelogram" width={600}></img>
                                                </div>
                                            </div>

                                            <h2 className='header-question'>5. What is the internal shape of the given fractal?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers koch-answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-5" value="Parallelogram" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>Parallelogram</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-5" value="Pentagon"/>
                                                            <label>Pentagon</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-5" value="Circle"/>
                                                            <label>Circle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-5" value="Triangle"/>
                                                            <label>Triangle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="Mixed-question-5" value="Square"/>
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
                                        {
                                            isTestFinished ? 
                                            <div className='d-flex gap-5'>
                                                <button onClick={(event) => { 
                                                        setIsTestFinished(false);
                                                        tryAgain();
                                                        window.scrollTo(0, 0);
                                                    }}>
                                                    <span className='test-option'>Try again</span>
                                                </button> 
                                                <button onClick={(event) => { 
                                                        setIsTestFinished(false);
                                                        setTopic('');
                                                    }}>
                                                    <span className='test-option'>Back to menu</span>
                                                </button> 
                                            </div>
                                            :
                                            <button onClick={(event) => { 
                                                    if(checkAnswers()) {
                                                        setIsTestFinished(true);
                                                        window.scrollTo(0, 0);
                                                    }
                                                }}>
                                                <span className='test-option'>Finish</span>
                                            </button>
                                        }
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