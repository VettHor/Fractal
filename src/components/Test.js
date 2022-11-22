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

export const Test = () => {
    const topics = ["Fractal", "Color", "Transformation", "Mixed"];
    const rightFractalAnswers = ["in some sense similar", "Koch snowflake", "2", "Square", "Square"];
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
        for(let i = 0; i < rightFractalAnswers.length; ++i) {
            let selectedRadio = document.querySelector(`input[name="fractal-question-${i + 1}"]:checked`);
            if(selectedRadio === null) {
                setTimeout(() => {
                    document.getElementsByName(`fractal-question-${i + 1}`)[0].reportValidity();
                }, 800);
                return false;
            }
        }
        setRightTestsAmount(0);
        for(let i = 0; i < rightFractalAnswers.length; ++i) {
            let radios = document.getElementsByName(`fractal-question-${i + 1}`);
            let selectedRadio = document.querySelector(`input[name="fractal-question-${i + 1}"]:checked`);
            if(selectedRadio.value === rightFractalAnswers[i])
                setRightTestsAmount(rightTestsAmount => rightTestsAmount + 1);
            else 
                selectedRadio.classList.add("wrong-answers");

            for(let j = 0; j < radios.length; ++j) {
                if(radios[j].value === rightFractalAnswers[i])
                    radios[j].classList.add("right-answers");
                radios[j].disabled = true;
            }
        }
        return true;
    }

    const tryAgain = () => {
        setRightTestsAmount(0);
        for(let i = 0; i < rightFractalAnswers.length; ++i) {
            let radios = document.getElementsByName(`fractal-question-${i + 1}`);
            let selectedRadio = document.querySelector(`input[name="fractal-question-${i + 1}"]:checked`);
            if(selectedRadio.value !== rightFractalAnswers[i]) 
                selectedRadio.classList.remove("wrong-answers");

            for(let j = 0; j < radios.length; ++j) {
                if(radios[j].value === rightFractalAnswers[i])
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
                                                        <input type="radio" name="fractal-question-1" value="in some sense similar" required
                                                            onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                            onInput={e => e.target.setCustomValidity('')}/>
                                                        <label>in some sense similar</label>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className='d-flex align-items-center'>
                                                        <input type="radio" name="fractal-question-1" value="completely dissimilar"/>
                                                        <label>completely dissimilar</label>
                                                    </div>
                                                </Row>
                                            </div>


                                            <h2 className='header-question'>2. What is the given fractal called?</h2>
                                            <div className='d-flex justify-content-left'>
                                                <div className='answers'>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-2" value="Koch snowflake" required
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>Koch snowflake</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-2" value="Serpinsky carpet"/>
                                                            <label>Serpinsky carpet</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-2" value="Julia set"/>
                                                            <label>Julia set</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-2" value="Mandelbrot set"/>
                                                            <label>Mandelbrot set</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-2" value="Newton"/>
                                                            <label>Newton</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-2" value="Barnsley fern"/>
                                                            <label>Barnsley fern</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-2" value="Cesaro"/>
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
                                                            <input type="radio" name="fractal-question-3" value="1" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>1</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-3" value="2"/>
                                                            <label>2</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-3" value="3"/>
                                                            <label>3</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-3" value="4"/>
                                                            <label>4</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-3" value="5"/>
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
                                                            <input type="radio" name="fractal-question-4" value="Parallelogram" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>Parallelogram</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-4" value="Pentagon"/>
                                                            <label>Pentagon</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-4" value="Circle"/>
                                                            <label>Circle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-4" value="Triangle"/>
                                                            <label>Triangle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-4" value="Square"/>
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
                                                            <input type="radio" name="fractal-question-5" value="Parallelogram" required 
                                                                onInvalid={e => e.target.setCustomValidity('Choose your answer')}
                                                                onInput={e => e.target.setCustomValidity('')}/>
                                                            <label>Parallelogram</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-5" value="Pentagon"/>
                                                            <label>Pentagon</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-5" value="Circle"/>
                                                            <label>Circle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-5" value="Triangle"/>
                                                            <label>Triangle</label>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className='d-flex align-items-center'>
                                                            <input type="radio" name="fractal-question-5" value="Square"/>
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