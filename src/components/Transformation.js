import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { Popout } from './Popout'
import parallelogram from '../assets/img/parallelogram.png';
import questionRobot from '../assets/img/question_robot.png';
import questionRobotActive from '../assets/img/question_robot_active.png';

export const Transformation = () => {
    const canvas = useRef(null);
    const [isActivePopout, setActivePopout] = useState(false);
    const [openPopout, setOpenPopout] = useState(false);
    const [point1X, SetPoint1X] = useState(0);

    useEffect(() => {
        let context = canvas.current.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);
        drawCoordinateSystem();
    }, []);

    const drawCoordinateSystem = () => {
        let context = canvas.current.getContext("2d");
        for(var i = 5; i <= canvas.current.width; i += 35) {
            context.moveTo(i, 5);
            context.lineTo(i, canvas.current.height - 5);

            context.moveTo(5, i);
            context.lineTo(canvas.current.width - 5, i);

            context.strokeStyle = "#f0f0f0";
            context.stroke();
        }

        context.beginPath();
        context.moveTo(0, canvas.current.height / 2);
        context.lineTo(canvas.current.width, canvas.current.height / 2);

        context.moveTo(canvas.current.width / 2, 0);
        context.lineTo(canvas.current.width / 2, canvas.current.height);
        context.strokeStyle = "#ff0000";
        context.stroke();

        context.beginPath();
        context.moveTo(canvas.current.width / 2 - 15, 25);
        context.lineTo(canvas.current.width / 2, 0);
        context.lineTo(canvas.current.width / 2 + 15, 25);

        context.moveTo(canvas.current.width - 25, canvas.current.height / 2 - 15);
        context.lineTo(canvas.current.width, canvas.current.height / 2);
        context.lineTo(canvas.current.width - 25, canvas.current.height / 2 + 15);
        context.strokeStyle = "#ff0000";
        context.stroke();

        context.beginPath();
        context.font = "20px serif"
        context.fillStyle = "#ff0000";
        for(var i = 5; i <= canvas.current.width; i += 35) {
            if(i < canvas.current.width - 35) {
                context.moveTo(i, canvas.current.height / 2 - 3);
                context.lineTo(i, canvas.current.height / 2 + 3);
                if(i !== canvas.current.width / 2)
                    context.fillText((i - 5) / 35 - 11, i - 5, canvas.current.height / 2 + 24);
                else 
                context.fillText(0, i + 3, canvas.current.height / 2 + 24);
            }

            if(i !== 5) {
                context.moveTo(canvas.current.width / 2 - 3, i);
                context.lineTo(canvas.current.width / 2 + 3, i);
                if(i !== canvas.current.width / 2)
                    context.fillText(-(i - 5) / 35 + 11, canvas.current.width / 2 + 8, i + 5);
            }
        }
        context.strokeStyle = "#ff0000";
        context.stroke();
    }

    const setPopoutState = (state) => {
        setActivePopout(state)
        setOpenPopout(!state);
    }

    return(
        <div>
            <Popout 
                open={openPopout} 
                onClose={() => setOpenPopout(false)} 
                header='Transformation' 
                text='The RGB color model is an additive color model in which the red, green, and blue primary colors of light are added together in various ways to reproduce a broad array of colors. The main purpose of the RGB color model is for the sensing, representation, and display of images in electronic systems.'
                nextHeader='HSV'
                nextText='HSV is closer to how humans perceive color. It has three components: hue, saturation, and value. This color space describes colors (hue or tint) in terms of their shade (saturation or amount of gray) and their brightness value. Moreover, the HSV color wheel also contributes to high-quality graphics.'
            />
            <section className='transformation' id="transformation">
                <Container fluid className='justify-content-center text-center align-items-center'>
                    <Row> 
                        <Col xs={12} md={6} xl={6}>
                            <div className='transformation-left-side'>
                                <h1>Parallelogram coordinates and rotation</h1>
                                <Form>
                                    <img src={parallelogram} alt="parallelogram"></img>
                                    { Array.from({length: 4}).map((_, i) => {
                                        return <input type="radio" 
                                            name="parallelogramPoint" 
                                            className={`radio-point parallelogram-point-${i + 1}`} 
                                            defaultChecked={i === 0}
                                        />
                                    })}
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
                                                        onChange={(event) => SetPoint1X(event.target.value)}
                                                        onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                        onInput={e => e.target.setCustomValidity('')}
                                                        required
                                                        >
                                                    </Form.Control>
                                                    <Form.Control
                                                        className="top-input w-75 fs-3 rounded-0 dotted-input text-center"
                                                        placeholder='1'
                                                        type="number"
                                                        id='numerator'
                                                        name="numerator"
                                                        pattern="[1-9][0-9]*"
                                                        onChange={(event) => SetPoint1X(event.target.value)}
                                                        onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                        onInput={e => e.target.setCustomValidity('')}
                                                        required
                                                        >
                                                    </Form.Control>
                                                </Row>
                                            </Form.Group>
                                        </div>
                                    </Row>
                                    <Form.Group className="mt-1">
                                        <Row className="justify-content-center">
                                            <span className='navbar-button navbar-button-slide home-button justify-content-center'>
                                                <button className='calc-button' type="button" onClick={() => function() {}}>
                                                    <span>Save ratio</span>
                                                </button>
                                            </span>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                            <div className='transformation-right-side'>
                                <div className='question-panel question-panel-transformation'>
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
                                            <span>Transformation?</span>
                                        </button>
                                    </div>
                                </div>   
                                <canvas ref={canvas} width={'780xp'} height={'780px'} className="transformation-canvas">

                                </canvas>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}