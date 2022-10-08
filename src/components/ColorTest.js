import { Container, Row, Col } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { Popout } from './Popout'
import getCanvasPixelColor from 'get-canvas-pixel-color';
import questionRobot from '../assets/img/question_robot.png';
import questionRobotActive from '../assets/img/question_robot_active.png';

export const ColorTest = () => {
    const canvas1 = useRef(null);
    const [isActivePopout, setActivePopout] = useState(false);
    const [openPopout, setOpenPopout] = useState(false);
    const [colorSliderValue, setColorSliderValue] = useState(0);
    const [drag, setDrag] = useState(true);
    const [isInsideCanvas, setIsInsideCanvas] = useState('inside-canvas-pointer');

    const setPopoutState = (state) => {
        setActivePopout(state)
        setOpenPopout(!state);
    }

    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    }

    const onDropHandler = (e) => {
        e.preventDefault();
        setDrag(false);
        let files = [...e.dataTransfer.files];

        const context = canvas1.current.getContext('2d');
        var img = new Image();

        img.src = URL.createObjectURL(files[0]);
        img.onload = function() {
            context.drawImage(img, 0, 0);
        }
        setDrag(false);
    }

    const mouseOver = () => {
        document.getElementById('circled-table-1').style.display = 'block';
    }

    const mouseOut = () => {
        document.getElementById('circled-table-1').style.display = 'none';
    }

    const mouseMove = (event) => {
        let table1 = document.getElementById('circled-table-1');
        table1.style.left = event.clientX + 'px';
        table1.style.top = event.clientY + 'px';

        var rect = canvas1.current.getBoundingClientRect();
        console.log(event.clientX - rect.left, event.clientY - rect.top);
        let {r, g, b} = getCanvasPixelColor(canvas1.current, 2, 1);
        console.log(r, g, b);
    }

    return(
        <div>
            <Popout 
                open={openPopout} 
                onClose={() => setOpenPopout(false)} 
                header='Color' 
                text='A fractal is a never-ending pattern. Fractals are infinitely complex patterns that are self-similar across different scales. They are created by repeating a simple process over and over in an ongoing feedback loop. Driven by recursion, fractals are images of dynamic systems – the pictures of Chaos.'
                nextHeader='Koch curve'
                nextText='Koch curve is a fractal curve. The Koch snowflake starts with an equilateral triangle or square, then recursively altering each line segment as follows: divide the line segment into three segments and draw an equilateral triangle that has the middle segment from step 1 as its base and points outward.'
            />
            <section className='color' id="color">
                <Container fluid className='justify-content-center text-center align-items-center'>
                    <Row> 
                        <Col xs={12} md={6} xl={6} className='color-left-side'>
                            <canvas ref={canvas1} className={`image-container ${isInsideCanvas}`}
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => onDropHandler(e)}

                                    onMouseOver={() => mouseOver()}
                                    onMouseOut={() => mouseOut()}
                                    onMouseMove={e => mouseMove(e)}
                                />
                            <div className='circled-table' id='circled-table-1'>
                                <table id='table-1' className='d-block'>
                                    <tbody>
                                        { Array.from({length : 11}, (_, i) => {
                                            return <tr className={`row-${i}`}>
                                                { Array.from({length : 11}, (_, j) => {
                                                    if(i === 4 && j === 5)
                                                        return <td id={`row-${i}-col-${j}`} className='pixel-color pixel-color-center-top'/>
                                                    if(i === 5 && j === 4)
                                                        return <td id={`row-${i}-col-${j}`} className='pixel-color pixel-color-center-left'/>
                                                    if(i === 5 && j === 5)
                                                        return <td id={`row-${i}-col-${j}`} className='pixel-color pixel-color-center'/>
                                                    return <td id={`row-${i}-col-${j}`} className='pixel-color'/>
                                                })}
                                            </tr>;
                                        })}
                                    </tbody>
                                </table>
                                <h1 className='pixel-coordinates'>x : y :</h1>
                            </div>
                            <div className='border border-3 bordered-block'>
                                <Row>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>R</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>G</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>B</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                </Row>
                                <div className='color-display border border-3'></div>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={6}>      
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
                                        <span>Color?</span>
                                    </button>
                                </div>
                            </div>                  
                            <canvas className='image-container'/>
                            <div className='border border-3 bordered-block'>
                                <Row>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>H</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>S</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>V</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                </Row>
                                <div className='color-display border border-3'></div>
                            </div>
                        </Col>
                    </Row>
                    <br></br>
                    <div className='border border-3 bordered-block bordered-block-saturation'>
                        <h1>Green color saturation</h1>
                        <p className='fs-4' id='color-slider-value'>{colorSliderValue}%</p>
                        <div className="slider-container w-auto color-slider">
                            <input id='color-slider' defaultValue='0' type="range" min="0" max="100" step='1' onInput={(event) => {
                                setColorSliderValue(event.target.value);
                                document.getElementById('color-slider-value').style.marginLeft = Number(event.target.value) * 27.6 + -1375 + 'px';
                            }}/>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}