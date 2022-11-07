import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { Popout } from './Popout'
import parallelogram from '../assets/img/parallelogram.png';
import questionRobot from '../assets/img/question_robot.png';
import questionRobotActive from '../assets/img/question_robot_active.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle, faStopCircle, faPauseCircle, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import { Magnet } from 'react-bootstrap-icons';

export const Transformation = () => {
    const canvas = useRef(null);
    const [isActivePopout, setActivePopout] = useState(false);
    const [openPopout, setOpenPopout] = useState(false);
    const [point1, SetPoint1] = useState({x : '', y : ''});
    const [point2, SetPoint2] = useState({x : '', y : ''});
    const [point3, SetPoint3] = useState({x : '', y : ''});
    const [point4, SetPoint4] = useState({x : '', y : ''});
    const [reduction, SetReduction] = useState('');
    const [isActiveDrawing, setIsActiveDrawing] = useState(false);
    const [interval, setCurrInterval] = useState(null);
    const [currZoom, setCurrZoom] = useState(6)
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);

    useEffect(() => {
        drawCoordinateSystem();
    }, []);

    useEffect(() => {
        drawCoordinateSystem();
    }, [dx, dy, currZoom]);

    const drawCoordinateSystem = () => {
        let coordinatesWidth = 5 * currZoom;
        let context = canvas.current.getContext("2d");

        context.clearRect(0, 0, canvas.current.width, canvas.current.height);
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.current.width, canvas.current.height);

        context.beginPath();
        for(var i = coordinatesWidth; i <= canvas.current.width + 2 * coordinatesWidth; i += coordinatesWidth) {
            context.moveTo(i + dx % coordinatesWidth - coordinatesWidth, 0 - coordinatesWidth);
            context.lineTo(i + dx % coordinatesWidth - coordinatesWidth, canvas.current.height + coordinatesWidth);

            context.moveTo(0 - coordinatesWidth, i + dy % coordinatesWidth - coordinatesWidth);
            context.lineTo(canvas.current.width + coordinatesWidth, i + dy % coordinatesWidth - coordinatesWidth);

            context.strokeStyle = "#f0f0f0";
            context.stroke();
        }

        let linesAmount = parseInt(canvas.current.width / coordinatesWidth);
        let movedLinesX = parseInt(dx / coordinatesWidth);
        let movedLinesY = parseInt(dy / coordinatesWidth);
        // if(Math.abs(dx) <= canvas.current.width / 2) {
        // } 
        // context.beginPath();
        // context.moveTo(0, canvas.current.height / 2 + dy);
        // context.lineTo(canvas.current.width, canvas.current.height / 2 + dy);

        // context.moveTo(canvas.current.width / 2 - 15 + dx, 25);
        // context.lineTo(canvas.current.width / 2 + dx, 0);
        // context.lineTo(canvas.current.width / 2 + 15 + dx, 25);

        // context.font = "30px serif";
        // context.fillStyle = "#CB2E81";
        // context.strokeStyle = "#CB2E81";
        // context.fillText('y', canvas.current.width / 2 - 30 + dx, 20);
        // context.stroke();

        let XAxys_Y = parseInt(linesAmount / 2) * coordinatesWidth + dy;
        context.beginPath();
        context.moveTo(0, XAxys_Y);
        context.lineTo(canvas.current.width, XAxys_Y);

        context.moveTo(canvas.current.width - 25, XAxys_Y - 15);
        context.lineTo(canvas.current.width, XAxys_Y);
        context.lineTo(canvas.current.width - 25, XAxys_Y + 15);

        context.font = "30px serif";
        context.fillStyle = "#CB2E81";
        context.strokeStyle = "#CB2E81";
        context.fillText('x', canvas.current.width - 15, XAxys_Y + 30);
        context.stroke();
        
        // if(Math.abs(dy) <= canvas.current.height / 2) {
        // }

        let YAxys_X = parseInt(linesAmount / 2) * coordinatesWidth + dx;
        context.beginPath();
        context.moveTo(YAxys_X, 0);
        context.lineTo(YAxys_X, canvas.current.height);

        
        context.moveTo(YAxys_X - 15, 25);
        context.lineTo(YAxys_X, 0);
        context.lineTo(YAxys_X + 15, 25);

        context.font = "30px serif";
        context.fillStyle = "#CB2E81";
        context.strokeStyle = "#CB2E81";
        context.fillText('y', YAxys_X - 30, 20);
        context.stroke();

        context.beginPath();
        context.font = "20px serif"
        context.fillStyle = "black";
        console.log(linesAmount - movedLinesX)
        // for(var i = coordinatesWidth, counter = linesAmount - movedLinesX; i <= canvas.current.width; i += coordinatesWidth) {
        //     if(i < canvas.current.width - coordinatesWidth) {
        //         context.moveTo(i + dx, XAxys_Y - 4);
        //         context.lineTo(i + dx, XAxys_Y + 4);
        //         if(i !== canvas.current.width / 2)
        //             context.fillText(counter, i - 5 + dx, XAxys_Y + 24);
        //         else 
        //             context.fillText(0, i + 3 + dx, XAxys_Y + 24);
        //     }

        //     if(i !== 5) {
        //         context.moveTo(YAxys_X - 4, i + dy);
        //         context.lineTo(YAxys_X + 4, i + dy);
        //         if(i !== canvas.current.width / 2)
        //             context.fillText(-counter, YAxys_X + 8, i + 5 + dy);
        //     }
        //     counter++;
        // }
        for(var i = 1, counter = linesAmount - movedLinesX; i < linesAmount; i++) {
            context.moveTo(i * coordinatesWidth + dx, XAxys_Y - 4);
            context.lineTo(i * coordinatesWidth + dx, XAxys_Y + 4);
            if(i * coordinatesWidth + dx !== YAxys_X)
                context.fillText(counter, i * coordinatesWidth - 5 + dx, XAxys_Y + 24);
            else 
                context.fillText(0, i * coordinatesWidth + 3 + dx, XAxys_Y + 24);


            context.moveTo(YAxys_X - 4, i * coordinatesWidth + dy);
            context.lineTo(YAxys_X + 4, i * coordinatesWidth + dy);
            if(i * coordinatesWidth + dy !== XAxys_Y)
                context.fillText(-counter, YAxys_X + 8, i * coordinatesWidth + 5 + dy);
            counter++;
        }
        context.strokeStyle = "#CB2E81";
        context.stroke();
    }

    const setPopoutState = (state) => {
        setActivePopout(state)
        setOpenPopout(!state);
    }

    const isParallelogram = () => {
        if(((point2.y - point1.y) / (point2.x - point1.x) === (point4.y - point3.y) / (point4.x - point3.x)) &&
            ((point1.y - point3.y) / (point1.x - point3.x) === (point2.y - point4.y) / (point2.x - point4.x)))
            return true;
        return false;
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
        });
        if(reduction === '') {
            document.getElementById('reduction').reportValidity();
            return;
        }

        if(!isParallelogram()) {
            alert("This is not parallelogram!")
            return;
        }
        drawParallelogram();
    }

    const convertPointToRealCanvasPoint = (point) => {
        const currZoom = 35;
        return {
            x: Number(point.x) * currZoom + canvas.current.width / 2,
            y: -Number(point.y) * currZoom  + canvas.current.height / 2
        }
    }

    const drawParallelogram = () => {
        drawCoordinateSystem();
        let realPoints = [convertPointToRealCanvasPoint(point1), convertPointToRealCanvasPoint(point2), convertPointToRealCanvasPoint(point3), convertPointToRealCanvasPoint(point4)];
        let context = canvas.current.getContext("2d");
        context.beginPath();
        context.moveTo(realPoints[0].x, realPoints[0].y);
        context.lineTo(realPoints[1].x, realPoints[1].y);
        context.lineTo(realPoints[3].x, realPoints[3].y);
        context.lineTo(realPoints[2].x, realPoints[2].y);
        context.lineTo(realPoints[0].x, realPoints[0].y);
        context.strokeStyle = "#CB2E81";
        context.fillStyle = "rgb(203, 46, 129, 0.2)";
        context.stroke();
        context.fill();

        const movePointName = 5;
        context.font = "20px serif";
        context.fillStyle = "#CB2E81";
        context.fillText(`A(${Number(point1.x.toFixed(2))};${Number(point1.y.toFixed(2))})`, realPoints[0].x - movePointName * 10, realPoints[0].y - movePointName);
        context.fillText(`B(${Number(point2.x.toFixed(2))};${Number(point2.y.toFixed(2))})`, realPoints[1].x + movePointName, realPoints[1].y - movePointName);
        context.fillText(`C(${Number(point3.x.toFixed(2))};${Number(point3.y.toFixed(2))})`, realPoints[2].x - movePointName * 10, realPoints[2].y + movePointName * 5);
        context.fillText(`D(${Number(point4.x.toFixed(2))};${Number(point4.y.toFixed(2))})`, realPoints[3].x + movePointName, realPoints[3].y + movePointName * 5);
    }

    const permanentDrawingParallelogram = () => {
        let vectorFromCenterPoint = {
            x: -(Number(point1.x) + Number(point4.x)) / 2,
            y: -(Number(point1.y) + Number(point4.y)) / 2
        };
        
        let reductionNumber = Number(reduction);
        SetPoint1(point1 => ({
            x: 1 / reductionNumber * (Number(point1.x) + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: 1 / reductionNumber * (Number(point1.y) + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }));
        SetPoint2(point2 => ({
            x: 1 / reductionNumber * (Number(point2.x) + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: 1 / reductionNumber * (Number(point2.y) + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }));
        SetPoint3(point3 => ({
            x: 1 / reductionNumber * (Number(point3.x) + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: 1 / reductionNumber * (Number(point3.y) + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }));
        SetPoint4(point4 => ({
            x: 1 / reductionNumber * (Number(point4.x) + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: 1 / reductionNumber * (Number(point4.y) + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }));
    }

    useEffect(() => {
        if([point1, point2, point3, point4].map((point, _) => {
            if(point.x === '' || point.y === '')
                return false;
            return true;
        }).some(boolVal => boolVal === false)) {
            return;
        }
            drawParallelogram();
    }, [point1, point2, point3, point4])

    const startDrawingParallelogram = () => {
        setCurrInterval(setInterval(() => {
            permanentDrawingParallelogram();
        }, 1500));
    }

    const stopDrawingParallelogram = () => {
        clearInterval(interval);
        setCurrInterval(null);
    }

    const setDefaultCoordinates = () => {
        const defaultPoints = [
            { x: -6, y: 10 },
            { x: 9, y: 10 },
            { x: -9, y: 2 },
            { x: 6, y: 2 }
        ];

        defaultPoints.map((point, i) => {
            document.getElementById(`p${i + 1}X`).value = point.x;
            document.getElementById(`p${i + 1}Y`).value = point.y;
        })
        SetPoint1(defaultPoints[0]);
        SetPoint2(defaultPoints[1]);
        SetPoint3(defaultPoints[2]);
        SetPoint4(defaultPoints[3]);
    }

    const mouseDown = (event) => {
        setStartX(parseInt(event.clientX));
        setStartY(parseInt(event.clientY));
        setIsDragging(true);
        event.currentTarget.style.cursor = 'pointer';
    } 

    const mouseUp = (event) => {
        if(!isDragging) 
            return;
        setIsDragging(false);
        event.currentTarget.style.cursor = 'default';
    }

    const mouseOut = (event) => {
        if(!isDragging)
            return;
        setIsDragging(false);
        event.currentTarget.style.cursor = 'default';
    }

    const mouseMove = (event) => {
        if(!isDragging)
            return;
        let mouseX = parseInt(event.clientX);
        let mouseY = parseInt(event.clientY);
        setStartX(mouseX);
        setStartY(mouseY);
        setDx(dx + mouseX - startX);
        setDy(dy + mouseY - startY);
    }

    const zoom = (event) => {
        const scrollValue = 1;
        const maxZoom = 30;
        const minZoom = 3;
        if(event.deltaY < 0) {
            if(currZoom < maxZoom)
                setCurrZoom(currZoom + scrollValue);
        } else { 
            if(currZoom > minZoom)
                setCurrZoom(currZoom - scrollValue);
        }
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
                                <FontAwesomeIcon icon={faLightbulb} size="3x" className='cursor-pointer-bulb'
                                    onClick={() => {
                                        setDefaultCoordinates();
                                    }}
                                />
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
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>A(</h2>
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
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>B(</h2>
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
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>C(</h2>
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
                                                        <h2 className='transformation-input-h2 input-point-1-h2-margin'>D(</h2>
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

                                    <Row className="justify-content-center">
                                        <h1>Sides reduction</h1>
                                        <div className='bg-white border-custom-line color-position w-25'>
                                            <Form.Group>
                                                <Row className="justify-content-center">
                                                    <Form.Control
                                                        className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center"
                                                        placeholder='0'
                                                        type="number"
                                                        id='reduction'
                                                        name="reduction"
                                                        pattern="[1-9][0-9]*"
                                                        onChange={(event) => SetReduction(event.target.value)}
                                                        onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                        onInput={e => e.target.setCustomValidity('')}
                                                        required
                                                    />
                                                </Row>
                                            </Form.Group>
                                        </div>
                                    </Row>
                                    <Form.Group className="mt-1">
                                        <Row className="justify-content-center">
                                            <span className='navbar-button navbar-button-slide home-button justify-content-center'>
                                                <button className='calc-button' type="button" onClick={() => validateInputs()}>
                                                    <span>Save points</span>
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

                                <div className='record-transformation-panel justify-content-center text-center'>
                                    { isActiveDrawing ?
                                        <div>
                                            <FontAwesomeIcon icon={faPauseCircle} size="3x" className='mt-play-buttons' 
                                                onClick={() => {
                                                    setIsActiveDrawing(false);
                                                    stopDrawingParallelogram();
                                                }}
                                            /> 
                                            <FontAwesomeIcon icon={faStopCircle} size="3x" className='mt-play-buttons' 
                                                onClick={() => setIsActiveDrawing(false)}
                                            /> 
                                        </div> :
                                        <div>
                                            <FontAwesomeIcon icon={faPlayCircle} size="3x" className='mt-play-buttons' 
                                                onClick={() => {
                                                    setIsActiveDrawing(true);
                                                    startDrawingParallelogram();
                                                }}
                                            />
                                        </div>
                                    }
                                </div>

                                <canvas ref={canvas} width={'700xp'} height={'700px'} className="transformation-canvas"
                                    onMouseDown={(event) => mouseDown(event)}
                                    onMouseUp={(event) => mouseUp(event)}
                                    onMouseOut={(event) => mouseOut(event)}
                                    onMouseMove={(event) => mouseMove(event)}
                                    onWheel={(event) => zoom(event)}>
                                </canvas>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}