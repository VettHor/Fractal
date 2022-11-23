import { Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { Popout } from './Popout'
import parallelogram from '../assets/img/parallelogram.png';
import questionRobot from '../assets/img/question_robot.png';
import questionRobotActive from '../assets/img/question_robot_active.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle, faStopCircle, faPauseCircle, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import reductionImage from '../assets/img/reduction.png'
import reductionActiveImage from '../assets/img/reduction_active.png'
import increasingImage from '../assets/img/increasing.png'
import increasingActiveImage from '../assets/img/increasing_active.png'
import clockwiseImage from '../assets/img/clockwise.png'
import clockwiseActiveImage from '../assets/img/clockwise_active.png'
import counterclockwiseImage from '../assets/img/counterclockwise.png'
import counterclockwiseActiveImage from '../assets/img/counterclockwise_active.png'
import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)


export const Transformation = () => {
    const [isActiveReduction, setIsActiveReduction] = useState(true);
    const [isActiveCounterclockwise, setIsActiveCounterclockwise] = useState(true);


    const defaultPoints = [
        { x: -5, y: -2 },
        { x: 8, y: -2 },
        { x: -9, y: -8 },
        { x: 4, y: -8 }
    ];
    // const defaultPoints = [
    //     { x: -5, y: 3 },
    //     { x: 9, y: 3 },
    //     { x: -9, y: -3 },
    //     { x: 5, y: -3 }
    // ];

    const canvas = useRef(null);
    const [isActivePopout, setActivePopout] = useState(false);
    const [openPopout, setOpenPopout] = useState(false);
    const [x1, setX1] = useState(0);
    const [y1, setY1] = useState(0);
    const [x2, setX2] = useState(0);
    const [y2, setY2] = useState(0);
    const [x3, setX3] = useState(0);
    const [y3, setY3] = useState(0);
    const [x4, setX4] = useState(0);
    const [y4, setY4] = useState(0);

    const [figureScale, setFigureScale] = useState('');
    const [angle, SetAngle] = useState('');
    const [isActiveDrawing, setIsActiveDrawing] = useState(false);

    const zoomDefaultValue = 6;
    const [currZoom, setCurrZoom] = useState(zoomDefaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [dx, setDx] = useState(0);
    const [dy, setDy] = useState(0);
    const [arePointsSet, setArePointsSet] = useState(false);
    let originX = 0;
    let originY = 0;

    let isPausedOrStoped = false;

    const [parallelogramPoints, setParallelogramPoints] = useState([]);

    useEffect(() => {
        drawCoordinateSystem();
        if(arePointsSet) 
            drawParallelogram();
    }, [dx, dy, currZoom, parallelogramPoints]);

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


        let XAxys_Y = parseInt(linesAmount / 2) * coordinatesWidth + dy;
        originY  = XAxys_Y;
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


        let YAxys_X = parseInt(linesAmount / 2) * coordinatesWidth + dx;
        originX = YAxys_X;
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
        context.font = `${currZoom < zoomDefaultValue ? 5 + currZoom * 2 : 20}px serif`;
        context.fillStyle = "black";

        let zoomDiffNumberLineX = currZoom < zoomDefaultValue ? 6 + currZoom * 2 : 24;
        let zoomDiffNumberLineY = 8;
        for(var i = YAxys_X, counterLeftX = 0; i >= 0; i -= coordinatesWidth, counterLeftX--) {
            context.moveTo(i, XAxys_Y - 4);
            context.lineTo(i, XAxys_Y + 4);
            if(i !== YAxys_X)
                context.fillText(counterLeftX, i - 5, XAxys_Y + zoomDiffNumberLineX);
            else 
            context.fillText(counterLeftX, i + 5, XAxys_Y + zoomDiffNumberLineX);
        }

        for(var i = YAxys_X + coordinatesWidth, counterRightX = 1; i <= canvas.current.width - coordinatesWidth; i += coordinatesWidth, counterRightX++) {
            context.moveTo(i, XAxys_Y - 4);
            context.lineTo(i, XAxys_Y + 4);
            context.fillText(counterRightX, i - 5, XAxys_Y + zoomDiffNumberLineX);
        }

        for(var i = XAxys_Y - coordinatesWidth, counterTopY = 1; i >= coordinatesWidth; i -= coordinatesWidth, counterTopY++) {
            context.moveTo(YAxys_X - 4, i);
            context.lineTo(YAxys_X + 4, i);
            context.fillText(counterTopY, YAxys_X + zoomDiffNumberLineY, i + 5);
        }

        for(var i = XAxys_Y + coordinatesWidth, counterBottomY = -1; i <= canvas.current.height; i += coordinatesWidth, counterBottomY--) {
            context.moveTo(YAxys_X - 4, i);
            context.lineTo(YAxys_X + 4, i);
            context.fillText(counterBottomY, YAxys_X + zoomDiffNumberLineY, i + 5);
        }

        context.strokeStyle = "#CB2E81";
        context.stroke();
    }

    const setPopoutState = (state) => {
        setActivePopout(state)
        setOpenPopout(!state);
    }

    const isParallelogram = () => {
        if(((y2 - y1) / (x2 - x1) === (y4 - y3) / (x4 - x3)) &&
            ((y1 - y3) / (x1 - x3) === (y2 - y4) / (x2 - x4)))
            return true;
        return false;
    }

    const validateInputs = () => {
        for(let i = 0; i < 4; ++i) {
            if(document.getElementById(`p${i + 1}X`).value === '') {
                document.getElementById(`p${i + 1}X`).reportValidity();
                return;
            }
            if(document.getElementById(`p${i + 1}Y`).value === '') {
                document.getElementById(`p${i + 1}Y`).reportValidity();
                return;
            }
        }
        if(document.getElementById('reduction').value === '') {
            document.getElementById('reduction').reportValidity();
            return;
        }
        // if(!isParallelogram()) {
        //     alert("This is not parallelogram!")
        //     return;
        // }
        setX1(Number(document.getElementById('p1X').value));
        setY1(Number(document.getElementById('p1Y').value));
        setX2(Number(document.getElementById('p2X').value));
        setY2(Number(document.getElementById('p2Y').value));
        setX3(Number(document.getElementById('p3X').value));
        setY3(Number(document.getElementById('p3Y').value));
        setX4(Number(document.getElementById('p4X').value));
        setY4(Number(document.getElementById('p4Y').value));

        setArePointsSet(true);
        setParallelogramPoints([
            [Number(document.getElementById('p1X').value), Number(document.getElementById('p1Y').value), 1],
            [Number(document.getElementById('p2X').value), Number(document.getElementById('p2Y').value), 1],
            [Number(document.getElementById('p3X').value), Number(document.getElementById('p3Y').value), 1],
            [Number(document.getElementById('p4X').value), Number(document.getElementById('p4Y').value), 1],
        ]);
    }

    const convertPointToRealCanvasPoint = (point) => {
        let coordinatesWidth = 5 * currZoom;
        return [
            point[0] * coordinatesWidth + originX,
            -point[1] * coordinatesWidth + originY
        ]
    }

    const drawParallelogram = () => {
        let realPoints = [convertPointToRealCanvasPoint(parallelogramPoints[0]), convertPointToRealCanvasPoint(parallelogramPoints[1]), 
            convertPointToRealCanvasPoint(parallelogramPoints[2]), convertPointToRealCanvasPoint(parallelogramPoints[3])];
        let context = canvas.current.getContext("2d");
        context.beginPath();
        context.moveTo(realPoints[0][0], realPoints[0][1]);
        context.lineTo(realPoints[1][0], realPoints[1][1]);
        context.lineTo(realPoints[3][0], realPoints[3][1]);
        context.lineTo(realPoints[2][0], realPoints[2][1]);
        context.lineTo(realPoints[0][0], realPoints[0][1]);
        context.strokeStyle = "#CB2E81";
        context.fillStyle = "rgb(203, 46, 129, 0.2)";
        context.stroke();
        context.fill();
        const movePointName = 5;
        context.font = "20px serif";
        context.fillStyle = "#CB2E81";
        context.fillText(`A(${Number(Number(parallelogramPoints[0][0]).toFixed(2))};${Number(Number(parallelogramPoints[0][1]).toFixed(2))})`, realPoints[0][0] - movePointName * 10, realPoints[0][1] - movePointName);
        context.fillText(`B(${Number(Number(parallelogramPoints[1][0]).toFixed(2))};${Number(Number(parallelogramPoints[1][1]).toFixed(2))})`, realPoints[1][0] + movePointName, realPoints[1][1] - movePointName);
        context.fillText(`C(${Number(Number(parallelogramPoints[2][0]).toFixed(2))};${Number(Number(parallelogramPoints[2][1]).toFixed(2))})`, realPoints[2][0] - movePointName * 10, realPoints[2][1] + movePointName * 5);
        context.fillText(`D(${Number(Number(parallelogramPoints[3][0]).toFixed(2))};${Number(Number(parallelogramPoints[3][1]).toFixed(2))})`, realPoints[3][0] + movePointName, realPoints[3][1] + movePointName * 5);
    }

    const moveMatrix = (parallelogramPoints, ddx, ddy) => {
        let moveMatrix = [
            [1, 0, 0],
            [0, 1, 0],
            [ddx, ddy, 1]
        ];
        return math.multiply(parallelogramPoints, moveMatrix);
    }

    const transform = (parallelogramPoints, rotatingPoint, iterationsAngle, scale) => {
        let radians = (Math.PI / 180) * iterationsAngle;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let rotatingMatrix  = [
            [cos, -sin, 0], 
            [sin, cos, 0], 
            [0, 0, 1] 
        ];

        let scalingMatrix = [
            [scale, 0, 0],
            [0, scale, 0],
            [0, 0, 1]
        ];

        parallelogramPoints = moveMatrix(parallelogramPoints, -rotatingPoint[0], -rotatingPoint[1]);
        parallelogramPoints = math.multiply(parallelogramPoints, rotatingMatrix);
        parallelogramPoints = math.multiply(parallelogramPoints, scalingMatrix);
        parallelogramPoints = moveMatrix(parallelogramPoints, rotatingPoint[0], rotatingPoint[1]);
        return parallelogramPoints;
    }

    const startDrawingParallelogram = async function () {
        let startingPoints = parallelogramPoints;
        let angleValue = isActiveCounterclockwise ? -90 : 90;
        let scalingValue = isActiveReduction ? 1 / figureScale : figureScale;

        const iterationsAmount = 1000;
        let angleStep = angleValue / iterationsAmount;
        let scaleStep = (scalingValue - 1) / iterationsAmount;
        let rotatingPoint = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]][document.querySelector('input[name="parallelogramPoint"]:checked').value];

        for(let i = 0, iterationsScale = 1, iterationsAngle = 0; i < iterationsAmount; ++i, iterationsScale += scaleStep, iterationsAngle += angleStep) {
            if(i === iterationsAmount - 1) 
                iterationsScale = scalingValue;
            setParallelogramPoints(transform(startingPoints, rotatingPoint, iterationsAngle, iterationsScale));
            await new Promise(obj => setTimeout(obj, 3));
        }
        await new Promise(r => setTimeout(r, 1500));
        for(let i = 0, iterationsScale = scalingValue, iterationsAngle = angleValue; i < iterationsAmount; ++i, iterationsScale -= scaleStep, iterationsAngle -= angleStep) {
            setParallelogramPoints(transform(startingPoints, rotatingPoint, iterationsAngle, iterationsScale));
            await new Promise(obj => setTimeout(obj, 3));
        }
        setParallelogramPoints(startingPoints);
        setIsActiveDrawing(false);
    }

    useEffect(() => {
        if([[x1, y1], [x2, y2], [x3, y3], [x4, y4]].map((point, _) => {
            if(point[0] === '' || point[1] === '')
                return false;
            return true;
        }).some(boolVal => boolVal === false)) {
            return;
        }
            //drawParallelogram();
    }, [x1, y1, x2, y2, x3, y3, x4, y4]);

    const stopDrawingParallelogram = () => {

    }

    const setDefaultCoordinates = () => {
        defaultPoints.map((point, i) => {
            document.getElementById(`p${i + 1}X`).value = point.x;
            document.getElementById(`p${i + 1}Y`).value = point.y;
        })
        setParallelogramPoints([
           [defaultPoints[0].x, defaultPoints[0].y, 1],
           [defaultPoints[1].x, defaultPoints[1].y, 1],
           [defaultPoints[2].x, defaultPoints[2].y, 1],
           [defaultPoints[3].x, defaultPoints[3].y, 1]
        ]);
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
        setDx(dx => (dx + mouseX - startX));
        setDy(dy => (dy + mouseY - startY));
    }

    const zoom = (event) => {
        const scrollValue = 1;
        const maxZoom = 30;
        const minZoom = 3;
        if(event.deltaY < 0) {
            if(currZoom < maxZoom)
                setCurrZoom(currZoom => (currZoom + scrollValue));
        } else { 
            if(currZoom > minZoom)
                setCurrZoom(currZoom => (currZoom - scrollValue));
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
                                            value={i}
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
                                                            onChange={(event) => setX1(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter X coordinate!')}
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
                                                            onChange={(event) => setY1(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter Y coordinate!')}
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
                                                            onChange={(event) => setX2(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter X coordinate!')}
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
                                                            onChange={(event) => setY2(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter Y coordinate!')}
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
                                                            onChange={(event) => setX3(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter X coordinate!')}
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
                                                            onChange={(event) => setY3(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter Y coordinate!')}
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
                                                            onChange={(event) => setX4(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter X coordinate!')}
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
                                                            onChange={(event) => setY4(Number(event.target.value))}
                                                            onInvalid={e => e.target.setCustomValidity('Enter Y coordinate!')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                        <h2 className='transformation-input-h2'>)</h2>
                                                    </div>
                                                </Row>
                                            </Form.Group>
                                        </div>
                                    </Row>


                                    <Row className="justify-content-center mt-5">
                                        <Col>
                                            <span className={`navbar-button justify-content-center ${isActiveCounterclockwise ? "fractal-dotted-button" : "navbar-button-slide"}`}>
                                                <div className={isActiveCounterclockwise ? "gradient" : ""}>
                                                    <button className='figure-button' onClick={(event) => {
                                                            event.preventDefault();
                                                            setIsActiveCounterclockwise(true);
                                                        }}>
                                                        <img src={isActiveCounterclockwise ? counterclockwiseActiveImage : counterclockwiseImage} alt="reduction"/>
                                                    </button>
                                                </div>
                                            </span>
                                        </Col>
                                        <Col>
                                            <div className='bg-white border-custom-line color-position w-100 h-100'>
                                                <Form.Group>
                                                    <Row className="justify-content-center">
                                                        <div className='d-flex justify-content-center'>
                                                            <Form.Control
                                                                className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center mt-3"
                                                                placeholder='0'
                                                                type="number"
                                                                id='reduction'
                                                                name="reduction"
                                                                pattern="[1-9][0-9]*"
                                                                onChange={(event) => {
                                                                    SetAngle(event.target.value);
                                                                }}
                                                                onInvalid={e => e.target.setCustomValidity('Введіть чисельник дробу, що задає відношення поділу')}
                                                                onInput={e => e.target.setCustomValidity('')}
                                                                required
                                                            />
                                                            <h1 className='degree'>°</h1>
                                                        </div>
                                                    </Row>
                                                </Form.Group>
                                            </div>
                                        </Col>
                                        <Col>
                                            <span className={`navbar-button justify-content-center ${isActiveCounterclockwise ? "navbar-button-slide" : "fractal-dotted-button"}`}>
                                                <div className={isActiveCounterclockwise ? "" : "gradient"}>
                                                    <button className='figure-button' onClick={(event) => {
                                                            event.preventDefault();
                                                            setIsActiveCounterclockwise(false);
                                                        }}>
                                                        <img src={isActiveCounterclockwise ? clockwiseImage : clockwiseActiveImage} alt="increasing"/>
                                                    </button>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>



                                    <Row className="justify-content-center mt-4">
                                        <Col>
                                            <span className={`navbar-button justify-content-center ${isActiveReduction ? "fractal-dotted-button" : "navbar-button-slide"}`}>
                                                <div className={isActiveReduction ? "gradient" : ""}>
                                                    <button className='figure-button' onClick={(event) => {
                                                            event.preventDefault();
                                                            setIsActiveReduction(true);
                                                        }}>
                                                        <img src={isActiveReduction ? reductionActiveImage : reductionImage} alt="reduction"/>
                                                    </button>
                                                </div>
                                            </span>
                                        </Col>
                                        <Col>
                                            <div className='bg-white border-custom-line color-position w-100 h-100'>
                                                <Form.Group>
                                                    <Row className="justify-content-center">
                                                        <Form.Control
                                                            className="transformation-input fs-3 rounded-0 dotted-input-transformation text-center mt-3"
                                                            placeholder='0'
                                                            type="number"
                                                            id='reduction'
                                                            name="reduction"
                                                            pattern="[1-9][0-9]*"
                                                            onChange={(event) => {
                                                                setFigureScale(Number(event.target.value));
                                                            }}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть значення, що задаватиме масштабування')}
                                                            onInput={e => e.target.setCustomValidity('')}
                                                            required
                                                        />
                                                    </Row>
                                                </Form.Group>
                                            </div>
                                        </Col>
                                        <Col>
                                            <span className={`navbar-button justify-content-center ${isActiveReduction ? "navbar-button-slide" : "fractal-dotted-button"}`}>
                                                <div className={isActiveReduction ? "" : "gradient"}>
                                                    <button className='figure-button' onClick={(event) => {
                                                            event.preventDefault();
                                                            setIsActiveReduction(false);
                                                        }}>
                                                        <img src={isActiveReduction ? increasingImage : increasingActiveImage} alt="increasing"/>
                                                    </button>
                                                </div>
                                            </span>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mt-4">
                                        <Row className="justify-content-center">
                                            <span className='navbar-button navbar-button-slide home-button justify-content-center'>
                                                <button className='calc-button' type="button" onClick={() => {
                                                        validateInputs();
                                                        setIsActiveDrawing(false);
                                                    }}>
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

                                <div className='record-transformation-panel justify-content-center text-center border border-white border-3'>
                                    { isActiveDrawing ?
                                        <div>
                                            <FontAwesomeIcon icon={faStopCircle} size="3x" className='mt-play-buttons' 
                                                onClick={() => {
                                                    setIsActiveDrawing(false);
                                                    isPausedOrStoped = true;
                                                    stopDrawingParallelogram();
                                                }}
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
                                    onWheel={(event) => zoom(event)}
                                    >
                                </canvas>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}