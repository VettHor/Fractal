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
    const [point1, SetPoint1] = useState({x : '', y : ''});
    const [point2, SetPoint2] = useState({x : '', y : ''});
    const [point3, SetPoint3] = useState({x : '', y : ''});
    const [point4, SetPoint4] = useState({x : '', y : ''});
    const [startingPoint1, SetStartingPoint1] = useState({x : '', y : ''});
    const [startingPoint2, SetStartingPoint2] = useState({x : '', y : ''});
    const [startingPoint3, SetStartingPoint3] = useState({x : '', y : ''});
    const [startingPoint4, SetStartingPoint4] = useState({x : '', y : ''});
    const [reduction, SetReduction] = useState('');
    const [angle, SetAngle] = useState('');
    let currReduction = 1;
    let currAngle = 0;
    const [isActiveDrawing, setIsActiveDrawing] = useState(false);
    let interval = null;

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

    useEffect(() => {
        drawCoordinateSystem();
    }, []);

    useEffect(() => {
        drawCoordinateSystem();
        if(arePointsSet)
            drawParallelogram();
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
        if(((startingPoint2.y - startingPoint1.y) / (startingPoint2.x - startingPoint1.x) === (startingPoint4.y - startingPoint3.y) / (startingPoint4.x - startingPoint3.x)) &&
            ((startingPoint1.y - startingPoint3.y) / (startingPoint1.x - startingPoint3.x) === (startingPoint2.y - startingPoint4.y) / (startingPoint2.x - startingPoint4.x)))
            return true;
        return false;
    }

    const validateInputs = () => {
        let isBreak = false;
        [startingPoint1, startingPoint2, startingPoint3, startingPoint4].map((point, i) => {
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
        SetPoint1(startingPoint1);
        SetPoint2(startingPoint2);
        SetPoint3(startingPoint3);
        SetPoint4(startingPoint4);
        drawParallelogram();
    }

    const convertPointToRealCanvasPoint = (point) => {
        let coordinatesWidth = 5 * currZoom;
        return {
            x: Number(point.x) * coordinatesWidth + originX,
            y: -Number(point.y) * coordinatesWidth + originY
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
        context.fillText(`A(${Number(Number(point1.x).toFixed(2))};${Number(Number(point1.y).toFixed(2))})`, realPoints[0].x - movePointName * 10, realPoints[0].y - movePointName);
        context.fillText(`B(${Number(Number(point2.x).toFixed(2))};${Number(Number(point2.y).toFixed(2))})`, realPoints[1].x + movePointName, realPoints[1].y - movePointName);
        context.fillText(`C(${Number(Number(point3.x).toFixed(2))};${Number(Number(point3.y).toFixed(2))})`, realPoints[2].x - movePointName * 10, realPoints[2].y + movePointName * 5);
        context.fillText(`D(${Number(Number(point4.x).toFixed(2))};${Number(Number(point4.y).toFixed(2))})`, realPoints[3].x + movePointName, realPoints[3].y + movePointName * 5);
    }

    // const rotatee = (point, rotatingPoint, angle) => {
    //     var radians = (Math.PI / 180) * angle,
    //         cos = Math.cos(radians),
    //         sin = Math.sin(radians),
    //         nx = (cos * (point.x - rotatingPoint.x)) + (sin * (point.y - rotatingPoint.y)) + rotatingPoint.x,
    //         ny = (cos * (point.y - rotatingPoint.y)) - (sin * (point.x - rotatingPoint.x)) + rotatingPoint.y;
    //     return { x : nx, y : ny };
    // }

    const rotate = (point, rotatingPoint, angle) => {
        angle = -angle;
        var radians = (Math.PI / 180) * angle;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);

        var m1  = [[cos, -sin, 0], 
                   [sin, cos, 0], 
                   [0, 0, 1] 
                ];
        var m2 = [point.x - rotatingPoint.x, point.y - rotatingPoint.y, 1];
        var res = math.multiply(m1, m2);
        return { x : res[0] + rotatingPoint.x, y : res[1] + rotatingPoint.y };
    }

    const scale = (point, scale) => {
        let m1 = math.matrix([point.x, point.y]);
        let m2 = math.matrix([
            [scale, 0]
            [0, scale]
        ]);
        let res = math.multiply(m1, m2);
        return {
            x : res.get([0, 0]),
            y : res.get([0, 1]),
        }
    }


    const permanentDrawingParallelogram = () => {
        let vectorFromCenterPoint = {
            x: -(Number(point1.x) + Number(point4.x)) / 2,
            y: -(Number(point1.y) + Number(point4.y)) / 2
        };


        currReduction += 0.001;
        currAngle += Number(angle) / (Number(reduction - 1) / 0.001);


        let rotatingPoint = [startingPoint1, startingPoint2, startingPoint3, startingPoint4][document.querySelector('input[name="parallelogramPoint"]:checked').value];
        if(currReduction >= Number(reduction) && !isPausedOrStoped) {
            currReduction = Number(reduction);
            currAngle = Number(angle);
            isPausedOrStoped = true;
        }

        let scalingValue = isActiveReduction ? 1 / currReduction : currReduction;
        let angleValue = isActiveCounterclockwise ? -currAngle : currAngle;
        SetPoint1(rotate({
            x: scalingValue * (startingPoint1.x + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: scalingValue * (startingPoint1.y + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }, rotatingPoint, angleValue));
        SetPoint2(rotate({
            x: scalingValue * (startingPoint2.x + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: scalingValue * (startingPoint2.y + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }, rotatingPoint, angleValue));
        SetPoint3(rotate({
            x: scalingValue * (startingPoint3.x + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: scalingValue * (startingPoint3.y + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }, rotatingPoint, angleValue));
        SetPoint4(rotate({
            x: scalingValue * (startingPoint4.x + vectorFromCenterPoint.x) - vectorFromCenterPoint.x,
            y: scalingValue * (startingPoint4.y + vectorFromCenterPoint.y) - vectorFromCenterPoint.y
        }, rotatingPoint, angleValue));

        if(isPausedOrStoped) {
            stopDrawingParallelogram();
        }
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
        interval = setInterval(permanentDrawingParallelogram, 3);
    }

    const stopDrawingParallelogram = () => {
        clearInterval(interval);
        interval = null;
    }

    const setDefaultCoordinates = () => {
        setArePointsSet(true);

        defaultPoints.map((point, i) => {
            document.getElementById(`p${i + 1}X`).value = point.x;
            document.getElementById(`p${i + 1}Y`).value = point.y;
        })
        SetStartingPoint1(defaultPoints[0]);
        SetStartingPoint2(defaultPoints[1]);
        SetStartingPoint3(defaultPoints[2]);
        SetStartingPoint4(defaultPoints[3]);

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
                                                            onChange={(event) => SetStartingPoint1({x : Number(event.target.value), y : startingPoint1.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату X')}
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
                                                            onChange={(event) => SetStartingPoint1({x : startingPoint1.x, y : Number(event.target.value)})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату Y')}
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
                                                            onChange={(event) => SetStartingPoint2({x : Number(event.target.value), y : startingPoint2.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату X')}
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
                                                            onChange={(event) => SetStartingPoint2({x : startingPoint2.x, y : Number(event.target.value)})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату Y')}
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
                                                            onChange={(event) => SetStartingPoint3({x : Number(event.target.value), y : startingPoint3.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату X')}
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
                                                            onChange={(event) => SetStartingPoint3({x : startingPoint3.x, y : Number(event.target.value)})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату Y')}
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
                                                            onChange={(event) => SetStartingPoint4({x : Number(event.target.value), y : startingPoint4.y})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату X')}
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
                                                            onChange={(event) => SetStartingPoint4({x : startingPoint4.x, y : Number(event.target.value)})}
                                                            onInvalid={e => e.target.setCustomValidity('Введіть координату Y')}
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
                                                                SetReduction(event.target.value);
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

                                                    SetPoint1(startingPoint1);
                                                    SetPoint2(startingPoint2);
                                                    SetPoint3(startingPoint3);
                                                    SetPoint4(startingPoint4);
                                                }}
                                            /> 
                                        </div> :
                                        <div>
                                            <FontAwesomeIcon icon={faPlayCircle} size="3x" className='mt-play-buttons' 
                                                onClick={() => {
                                                    setIsActiveDrawing(true);
                                                    startDrawingParallelogram();
                                                    currReduction = 1;
                                                    currAngle = 0;
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