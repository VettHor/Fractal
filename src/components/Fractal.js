import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import triangle from '../assets/img/triangle.png';
import triangleActive from '../assets/img/triangle_active.png';
import rectangle from '../assets/img/rectangle.png';
import rectangleActive from '../assets/img/rectangle_active.png';
import questionRobot from '../assets/img/question_robot.png';
import questionRobotActive from '../assets/img/question_robot_active.png';
import { Popout } from './Popout'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css';
import { KochCurve } from '../fractal/KochCurve'

export const Fractal = () => {
    const [isActiveBasicFigure, setActiveBasicFigure] = useState(true);
    const [isActiveInternalFigure, setActiveInternalFigure] = useState(true);
    const [isActivePopout, setActivePopout] = useState(false);
    const [openPopout, setOpenPopout] = useState(false);
    const [numerator, setNumerator] = useState('');
    const [denumerator, setDenumerator] = useState('');
    const [currNumerator, setCurrNumerator] = useState('');
    const [currDenumerator, setCurrDenumerator] = useState('');
    const [isCheckedbox, setIsCheckedbox] = useState(false);
    
    const setPopoutState = (state) => {
        setActivePopout(state)
        setOpenPopout(!state);
    }

    const exportFractal = () => {
        var anchor = document.createElement("a");
        anchor.href = document.getElementById("koch-canvas").toDataURL("image/png");
        anchor.download = "Fractal.png";
        anchor.click();
    }

    const validateInputs = () => {
        if(numerator === '') {
            document.getElementById("numerator").reportValidity();
            return;
        }
        if(denumerator === '') {
            document.getElementById("denumerator").reportValidity();
            return;
        }
        setCurrNumerator(numerator);
        setCurrDenumerator(denumerator);
    }

    return(
        <div>
            <Popout 
                open={openPopout} 
                onClose={() => setOpenPopout(false)} 
                header='Fractal' 
                text='A fractal is a never-ending pattern. Fractals are infinitely complex patterns that are self-similar across different scales. They are created by repeating a simple process over and over in an ongoing feedback loop. Driven by recursion, fractals are images of dynamic systems – the pictures of Chaos.'
                nextHeader='Koch curve'
                nextText='Koch curve is a fractal curve. The Koch snowflake starts with an equilateral triangle or square, then recursively altering each line segment as follows: divide the line segment into three segments and draw an equilateral triangle that has the middle segment from step 1 as its base and points outward.'
                />
            <section className='fractal' id="fractal">
                <Container>
                    <Row> 
                        <Col xs={12} md={6} xl={3}>
                            <div className='fractal-input-panel-align'>
                            <h1>Koch curve</h1>
                            <div className='text-center'>
                                <p>Basic figure</p>
                                <Tippy placement='right' animation='scale' theme={'fractal'} content={
                                        <div className='text-center'>
                                            <span className='fs-4'>A geometric figure that will define a closed line</span>
                                        </div>}>
                                    <FontAwesomeIcon icon={faInfoCircle} size="2x" className='icon-3'/>
                                </Tippy>
                            </div>
                            <Row>
                                <Col>
                                    <span className={`navbar-button justify-content-start ${isActiveBasicFigure ? "fractal-dotted-button" : "navbar-button-slide"}`}>
                                        <div className={isActiveBasicFigure ? "gradient" : ""}>
                                            <button className='figure-button' onClick={() => setActiveBasicFigure(true)}>
                                                <img src={isActiveBasicFigure ? triangleActive : triangle} alt="triangle"/>
                                            </button>
                                        </div>
                                    </span>
                                </Col>
                                <Col>
                                    <span className={`navbar-button justify-content-end ${isActiveBasicFigure ? "navbar-button-slide" : "fractal-dotted-button"}`}>
                                        <div className={isActiveBasicFigure ? "" : "gradient"}>
                                            <button className='figure-button' onClick={() => setActiveBasicFigure(false)}>
                                                <img src={isActiveBasicFigure ? rectangle : rectangleActive} alt="rectangle"/>
                                            </button>
                                        </div>
                                    </span>
                                </Col>
                            </Row>

                            <div className='text-center'>
                                <p>Internal figure</p>
                                <Tippy placement='right' animation='scale' theme={'fractal'} content={
                                        <div className='text-center'>
                                            <span className='fs-4'>A geometric figure that will be drawn on each line</span>
                                        </div>}>
                                    <FontAwesomeIcon icon={faInfoCircle} size="2x" className='icon-3'/>
                                </Tippy>
                            </div>
                            <Row>
                                <Col>
                                    <span className={`navbar-button justify-content-start ${isActiveInternalFigure ? "fractal-dotted-button" : "navbar-button-slide"}`}>
                                        <div className={isActiveInternalFigure ? "gradient" : ""}>
                                            <button className='figure-button' onClick={() => setActiveInternalFigure(true)}>
                                                <img src={isActiveInternalFigure ? triangleActive : triangle} alt="triangle"/>
                                            </button>
                                        </div>
                                    </span>
                                </Col>
                                <Col>
                                    <span className={`navbar-button justify-content-end ${isActiveInternalFigure ? "navbar-button-slide" : "fractal-dotted-button"}`}>
                                        <div className={isActiveInternalFigure ? "" : "gradient"}>
                                            <button className='figure-button' onClick={() => setActiveInternalFigure(false)}>
                                                <img src={isActiveInternalFigure ? rectangle : rectangleActive} alt="rectangle"/>
                                            </button>
                                        </div>
                                    </span>
                                </Col>
                            </Row>

                            <div className='checkbox-panel text-center'>
                                <p>Reverse</p>
                                <div className='checkbox'>
                                    <input type='checkbox' id='reverse-input' onClick={() => setIsCheckedbox(!isCheckedbox)}/>
                                    <label htmlFor='reverse-input' className='reverse-input-tick'><div className="tick"></div></label>
                                </div>
                            </div>
                            <div className='checkbox-tooltip'>
                                <Tippy placement='right' animation='scale' theme={'fractal'} content={
                                        <div className='text-center'>
                                            <span className='fs-4'>Indicates whether the construction will be internal (reverse) or external (direct)</span>
                                        </div>}>
                                    <FontAwesomeIcon icon={faInfoCircle} size="2x" className='icon-3'/>
                                </Tippy>
                            </div>

                            <div className='text-center'>
                                <p>Division ratio</p>
                                <Tippy placement='right' animation='scale' theme={'fractal'} content={
                                        <div className='text-center'>
                                            <span className='fs-4'>The ratio in which the side of the selected shape will be divided</span>
                                        </div>}>
                                    <FontAwesomeIcon icon={faInfoCircle} size="2x" className='icon-3'/>
                                </Tippy>
                            </div>
                            <Form>
                                <Row className="justify-content-center">
                                    <div className='bg-white border-custom-line w-50'>
                                        <Form.Group>
                                            <Row className="justify-content-center">
                                                <Form.Control
                                                    className="top-input w-75 fs-3 rounded-0 dotted-input text-center"
                                                    placeholder='1'
                                                    type="number"
                                                    id='numerator'
                                                    name="numerator"
                                                    pattern="[1-9][0-9]*"
                                                    onChange={(event) => setNumerator(event.target.value)}
                                                    onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                    onInput={e => e.target.setCustomValidity('')}
                                                    required
                                                    >
                                                </Form.Control>
                                            </Row>
                                        </Form.Group>
                                        <hr className='solid'/>
                                        <Form.Group>
                                            <Row className="justify-content-center">
                                                <Form.Control
                                                    className="bottom-input w-75 fs-3 rounded-0 dotted-input text-center"
                                                    placeholder='3'
                                                    type="number"
                                                    id='denumerator'
                                                    name="denumerator"
                                                    required
                                                    pattern="[1-9][0-9]*"
                                                    onChange={(event) => setDenumerator(event.target.value)}
                                                    onInvalid={e => e.target.setCustomValidity('Введіть знаменник дробу, що задає відношення поділу')}
                                                    onInput={e => e.target.setCustomValidity('')}
                                                    >
                                                </Form.Control>
                                            </Row>
                                        </Form.Group>
                                    </div>
                                </Row>
                                <Form.Group className="mt-1">
                                    <Row className="justify-content-center">
                                        <span className='navbar-button navbar-button-slide home-button justify-content-center'>
                                            <button className='calc-button' type="button" onClick={() => validateInputs()}>
                                                <span>Save ratio</span>
                                            </button>
                                        </span>
                                    </Row>
                                </Form.Group>
                            </Form>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={9}>
                            <div className='question-panel'>
                                <div className='image-div'>
                                    <img src={isActivePopout ? questionRobotActive : questionRobot} alt="robot"/>
                                </div>
                                <div className='question-div'>
                                    <button className='popout-button' 
                                        onClick={() => {
                                            setPopoutState(false);
                                            document.body.style.overflow ='hidden';
                                        }}
                                        onMouseDownCapture={() => setActivePopout(true)}>
                                        <span>Fractal?</span>
                                    </button>
                                </div>
                            </div>
                            <KochCurve basicFigure={`${isActiveBasicFigure ? 'triangle' : 'square'}`} 
                                internalFigure={`${isActiveInternalFigure ? 'triangle' : 'square'}`} 
                                isReverse={isCheckedbox}
                                numerator={currNumerator} 
                                denumerator={currDenumerator}/>
                            <div className='export-div'>
                                <span className='navbar-button navbar-button-slide home-button export-span justify-content-center'>
                                    <button type='submit' className='export-button' onClick={() => exportFractal()}><span>Export</span></button>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}