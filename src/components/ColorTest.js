import { Container, Row, Col } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { Popout } from './Popout'
import getCanvasPixelColor from 'get-canvas-pixel-color';
import questionRobot from '../assets/img/question_robot.png';
import questionRobotActive from '../assets/img/question_robot_active.png';

export const ColorTest = () => {
    const canvas1 = useRef(null);
    const canvas2 = useRef(null);
    const [isActivePopout, setActivePopout] = useState(false);
    const [openPopout, setOpenPopout] = useState(false);
    const [colorSliderValue, setColorSliderValue] = useState(0);
    const [currHSVCoordinates, setCurrHSVCoordinates] = useState({ 
        isSet: false, 
        x: 0, 
        y: 0
    })

    useEffect(() => {
        let context1 = canvas1.current.getContext("2d");
        context1.fillStyle = "white";
        context1.fillRect(0, 0, canvas1.current.width, canvas1.current.height);

        let context2 = canvas2.current.getContext("2d");
        context2.fillStyle = "white";
        context2.fillRect(0, 0, canvas2.current.width, canvas2.current.height);
    }, []);

    const setPopoutState = (state) => {
        setActivePopout(state)
        setOpenPopout(!state);
    }

    const dragStartHandler = (e) => {
        e.preventDefault();
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault();
    }

    const onDropHandler = (e) => {
        e.preventDefault();
        drawImageWithFile(e.dataTransfer.files[0])
    }

    const onSelectImage = (e) => {
        drawImageWithFile(e.target.files[0]);
    }

    const drawImageWithFile = (file) => {
        document.getElementById('color-display-R').innerHTML = 255;
        document.getElementById('color-display-G').innerHTML = 255;
        document.getElementById('color-display-B').innerHTML = 255;
        document.getElementById('first-dispay-color-block').style.backgroundColor = 'rgb(255, 255, 255)';

        document.getElementById('color-display-H').innerHTML = '0°';
        document.getElementById('color-display-S').innerHTML = '0%';
        document.getElementById('color-display-V').innerHTML = '100%';
        document.getElementById('second-dispay-color-block').style.backgroundColor = 'rgb(255, 255, 255)';
        setColorSliderValue(0);
        document.getElementById('color-slider-value').style.marginLeft = '0px';
        document.getElementById('color-slider').value = 0;
        setCurrHSVCoordinates({
            isSet: false, 
            x: 0, 
            y: 0
        });

        let context1 = canvas1.current.getContext("2d");
        let context2 = canvas2.current.getContext("2d");
        context1.fillStyle = "white";
        context2.fillStyle = "white";
        context1.fillRect(0, 0, canvas1.current.width, canvas1.current.height);
        context2.fillRect(0, 0, canvas2.current.width, canvas2.current.height);
        let img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function() {
            context1.drawImage(img, 0, 0);
            context2.drawImage(img, 0, 0);
        }
    }

    const mouseOver = () => {
        document.getElementById('circled-table').style.display = 'block';
        document.getElementById('pixel-coordinates-panel').style.display = 'block';
    }

    const mouseOut = () => {
        document.getElementById('circled-table').style.display = 'none';
        document.getElementById('pixel-coordinates-panel').style.display = 'none';
    }

    const mouseMove = (currCanvas, event) => {
        let canvas = currCanvas === 'canvas-1' ? canvas1.current : canvas2.current;
        let table = document.getElementById('circled-table');
        table.style.left = event.clientX + 'px';
        table.style.top = event.clientY + 'px';
        document.getElementById('pixel-coordinates-panel').style.left = event.clientX + 'px';
        document.getElementById('pixel-coordinates-panel').style.top = event.clientY + 100 + 'px';
        let rect = canvas.getBoundingClientRect();
        let x = parseInt(((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width);
        let y = parseInt(((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height);
        let [ r, g, b ] = [];
        for(var i = -5; i < 6; ++i)
        {
            for(var j = -5; j < 6; ++j)
            {
                if (x + i < 0 || y + j < 0 || x + i >= canvas.width || y + j >= canvas.height)
                    [ r, g, b ] = [ 8, 12, 60 ];
                else 
                    [ r, g, b ] = getCanvasPixelColor(canvas, x + i, y + j);
                document.getElementById(`row-${j + 5}-col-${i + 5}`).style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
        }
        document.getElementById('pixel-coordinates').innerHTML = `x: ${x}⠀y: ${y}`;
    }


    const getPixel = (currCanvas, event) => {
        let canvas = currCanvas === 'canvas-1' ? canvas1.current : canvas2.current;
        let rect = canvas.getBoundingClientRect();
        let x = parseInt(((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width);
        let y = parseInt(((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height);
        setPixelWithXY(currCanvas, x, y);
        if(currCanvas === 'canvas-2' && !currHSVCoordinates.isSet) 
            currHSVCoordinates.isSet = true;
        currHSVCoordinates.x = x;
        currHSVCoordinates.y = y;
    }

    const setPixelWithXY = (currCanvas, x, y) => {
        let canvas = currCanvas === 'canvas-1' ? canvas1.current : canvas2.current;
        let [ r, g, b ] = getCanvasPixelColor(canvas, x, y);
        if(currCanvas === 'canvas-1') {
            document.getElementById('color-display-R').innerHTML = r;
            document.getElementById('color-display-G').innerHTML = g;
            document.getElementById('color-display-B').innerHTML = b;
            document.getElementById('first-dispay-color-block').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        } else {
            let [h, s, v] = RGBToHSV([r, g, b]);
            document.getElementById('color-display-H').innerHTML = `${Math.round(h)}°`;
            document.getElementById('color-display-S').innerHTML = `${Math.round(s)}%`;
            document.getElementById('color-display-V').innerHTML = `${Math.round(v)}%`;
            document.getElementById('second-dispay-color-block').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
    }

    const RGBToHSV = ([r, g, b]) => {
        [r, g, b] = [r/255, g/255, b/255];
        let cmax = Math.max(Math.max(r, g), b);
        let cmin = Math.min(Math.min(r, g), b);
        let [h, s, v] = [0, 0, 0];

        if(cmax === cmin ) {
            h = 0;
        }
        else if(cmax === r && g >= b) {
            h = 60 * (g - b) / (cmax - cmin);
        } 
        else if(cmax === r && g < b) {
            h = 60 * (g - b) / (cmax - cmin) + 360;
        }
        else if(cmax === g) {
            h = 60 * (b - r) / (cmax - cmin) + 120;
        } 
        else //if(cmax === b) 
        {
            h = 60 * (r - g) / (cmax - cmin) + 240;
        }

        if(cmax === 0) {
            s = 0;
        } else {
            s = 1 - (cmin / cmax);
        }

        v = cmax;
        return [h, s * 100, v * 100];
    }

    const HSVToRGB = ([h, s, v]) => {
        [h, s, v] = [h/360, s/100, v/100];
        var r, g, b, i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

    const setSaturation = (saturation) => {
        let context1 = canvas1.current.getContext('2d');
        let context2 = canvas2.current.getContext('2d');
        let { width, height } = canvas1.current.getBoundingClientRect();
        let imageData = context1.getImageData(0, 0, width, height);
        let rgbPixels = imageData.data;
        let [h, s, v] = [];
        for(var i = 0; i < rgbPixels.length; i += 4) {
            [h, s, v] = RGBToHSV([rgbPixels[i], rgbPixels[i + 1], rgbPixels[i + 2]]);
            if(h >= 70 && h <= 170) {
                s += saturation;
                if(s > 100) s = 100;
                if(s < 0) s = 0;
            }
            [rgbPixels[i], rgbPixels[i + 1], rgbPixels[i + 2]] = HSVToRGB([h, s, v]);
        }
        context2.putImageData(imageData, 0, 0);
        if(currHSVCoordinates.isSet) {
            setPixelWithXY('canvas-2', currHSVCoordinates.x, currHSVCoordinates.y);
        }
    }

    const setCurrHue = () => {
        if(currHSVCoordinates.isSet) 
            document.getElementById('color-display-H').innerHTML = `${Math.round(RGBToHSV(getCanvasPixelColor(canvas1.current, currHSVCoordinates.x, currHSVCoordinates.y))[0])}°`;
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
                    {/* className='color-left-side' */}
                        <Col xs={12} md={6} xl={6}>
                            <div className='question-panel'>
                                <div className='file-input-group'>
                                    <input type="file" id='image-uploader'
                                        accept="image/*" 
                                        className='popout-button' 
                                        onChange={onSelectImage}
                                        onClick={e => e.target.value = ''}
                                    >
                                    </input>
                                    <label htmlFor="image-uploader" className='input-group-text'>Select image</label>
                                </div>
                            </div>          
                            <div className='circled-table' id='circled-table'>
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
                            </div>
                            <div className='pixel-coordinates-panel' id='pixel-coordinates-panel'>
                                <h1 className='pixel-coordinates' id='pixel-coordinates'>x : y :</h1>
                            </div>
                            <canvas ref={canvas1} className='image-container'
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => onDropHandler(e)}

                                    onMouseOver={() => mouseOver()}
                                    onMouseOut={() => mouseOut()}
                                    onMouseMove={e => mouseMove('canvas-1', e)}
                                    onClick={e => getPixel('canvas-1', e)}
                            />
                            <div className='border border-3 bordered-block'>
                                <Row>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>R</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 id='color-display-R' className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>G</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 id='color-display-G' className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>B</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 id='color-display-B' className='text-black'>255</h1>
                                        </div>
                                    </Col>
                                </Row>
                                <div id='first-dispay-color-block' className='color-display border border-3'></div>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={6}>      
                            <div className='question-panel question-panel-color'>
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
                            <canvas ref={canvas2} className='image-container'
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => onDropHandler(e)}

                                    onMouseOver={() => mouseOver()}
                                    onMouseOut={() => mouseOut()}
                                    onMouseMove={e => mouseMove('canvas-2', e)}
                                    onClick={e => getPixel('canvas-2',e)}
                                />
                            <div className='border border-3 bordered-block'>
                                <Row>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>H</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 id='color-display-H' className='text-black'>0°</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>S</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 id='color-display-S' className='text-black'>0%</h1>
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6} xl={4}>
                                        <h1>V</h1>
                                        <div className='bg-white w-75 m-auto'>
                                            <h1 id='color-display-V' className='text-black'>100%</h1>
                                        </div>
                                    </Col>
                                </Row>
                                <div id='second-dispay-color-block' className='color-display border border-3'></div>
                            </div>
                        </Col>
                    </Row>
                    <div className='border border-3 bordered-block bordered-block-saturation'>
                        <h1>Green color saturation</h1>
                        <p className='fs-4' id='color-slider-value'>{colorSliderValue}%</p>
                        <div className="slider-container w-auto color-slider">
                            <input id='color-slider' defaultValue='0' type="range" min="-100" max="100" step='1' onInput={(event) => {
                                setSaturation(Number(event.target.value));
                                setCurrHue();
                                setColorSliderValue(event.target.value);
                                document.getElementById('color-slider-value').style.marginLeft = Number(event.target.value) * 13.8 + 'px';
                            }}/>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}