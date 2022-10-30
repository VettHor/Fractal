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
    const [point1, SetPoint1] = useState({x : '', y : ''});
    const [point2, SetPoint2] = useState({x : '', y : ''});
    const [point3, SetPoint3] = useState({x : '', y : ''});
    const [point4, SetPoint4] = useState({x : '', y : ''});

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
        context.strokeStyle = "#CB2E81";
        context.stroke();

        context.beginPath();
        context.moveTo(canvas.current.width / 2 - 15, 25);
        context.lineTo(canvas.current.width / 2, 0);
        context.lineTo(canvas.current.width / 2 + 15, 25);

        context.moveTo(canvas.current.width - 25, canvas.current.height / 2 - 15);
        context.lineTo(canvas.current.width, canvas.current.height / 2);
        context.lineTo(canvas.current.width - 25, canvas.current.height / 2 + 15);
        context.strokeStyle = "#CB2E81";
        context.stroke();

        context.beginPath();
        context.font = "20px serif"
        context.fillStyle = "black";
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
        context.strokeStyle = "#CB2E81";
        context.stroke();
    }

    const setPopoutState = (state) => {
        setActivePopout(state)
        setOpenPopout(!state);
    }

    const validateInputs = () => {
        let isBreak = false;
        [point1, point2, point3, point4].map((point, i) => {
            if(isBreak) return;
            if(point.x === '') {
                document.getElementById(`p${i + 1}X`).reportValidity();
                isBreak = true;
                return;
            }
            if(point.y === '') {
                isBreak = true;
                document.getElementById(`p${i + 1}Y`).reportValidity();
                return;
            }
        })
        drawParallelogram();
    }

    const drawParallelogram = () => {
        const currZoom = 35;
        let context = canvas.current.getContext("2d");
        context.beginPath();
        context.moveTo(Number(point1.x * currZoom + canvas.current.width / 2), Number(-point1.y * currZoom  + canvas.current.height / 2));
        context.lineTo(Number(point2.x * currZoom + canvas.current.width / 2), Number(-point2.y * currZoom + canvas.current.height / 2));
        context.lineTo(Number(point4.x * currZoom + canvas.current.width / 2), Number(-point4.y * currZoom + canvas.current.height / 2));
        context.lineTo(Number(point3.x * currZoom + canvas.current.width / 2), Number(-point3.y * currZoom + canvas.current.height / 2));
        context.lineTo(Number(point1.x * currZoom + canvas.current.width / 2), Number(-point1.y * currZoom  + canvas.current.height / 2));
        context.strokeStyle = "#CB2E81";
        context.fillStyle = "rgb(203, 46, 129, 0.2)";
        context.stroke();
        context.fill();
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
                                        <div className='bg-white border-custom-line transformation-position transformation-position-1'>
                                            <Form.Group>
                                                <Row className="justify-content-center">
                                                    <div className='d-flex input-point parallelogram-input-point-1'>
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>(</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p1X'
                                                            name="p1X"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint1({x : event.target.value, y : point1.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>;</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p1Y'
                                                            name="p1Y"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint1({x : point1.x, y : event.target.value})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>)</h2>
                                                    </div>
                                                </Row>
                                            </Form.Group>
                                        </div>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <div className='bg-white border-custom-line transformation-position transformation-position-2'>
                                            <Form.Group>
                                                <Row className="justify-content-center">
                                                    <div className='d-flex input-point parallelogram-input-point-1'>
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>(</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p2X'
                                                            name="p2X"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint2({x : event.target.value, y : point2.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>;</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p2Y'
                                                            name="p2Y"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint2({x : point2.x, y : event.target.value})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>)</h2>
                                                    </div>
                                                </Row>
                                            </Form.Group>
                                        </div>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <div className='bg-white border-custom-line transformation-position transformation-position-3'>
                                            <Form.Group>
                                                <Row className="justify-content-center">
                                                    <div className='d-flex input-point parallelogram-input-point-1'>
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>(</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p3X'
                                                            name="p3X"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint3({x : event.target.value, y : point3.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>;</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p3Y'
                                                            name="p3Y"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint3({x : point3.x, y : event.target.value})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>)</h2>
                                                    </div>
                                                </Row>
                                            </Form.Group>
                                        </div>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <div className='bg-white border-custom-line transformation-position transformation-position-4'>
                                            <Form.Group>
                                                <Row className="justify-content-center">
                                                    <div className='d-flex input-point parallelogram-input-point-1'>
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>(</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p4X'
                                                            name="p4X"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint4({x : event.target.value, y : point4.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>;</h2>
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                            placeholder='0'
                                                            type="number"
                                                            id='p4Y'
                                                            name="p4Y"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => SetPoint4({x : point4.x, y : event.target.value})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>)</h2>
                                                    </div>
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