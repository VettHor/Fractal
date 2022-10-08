import { Container, Row, Col } from 'react-bootstrap';
import { useState, useRef } from 'react';

export const Color = () => {
    const canvas1 = useRef(null)
    const [colorSliderValue, setColorSliderValue] = useState(0);
    const [drag, setDrag] = useState(true);

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
        console.log(files);

        const context = canvas1.current.getContext('2d');
        var img = new Image();


        const scaleX = 
        img.src = URL.createObjectURL(files[0]);
        img.onload = function() {
            context.drawImage(img, 0, 0);
        }
        setDrag(false);
    }

    return(
        <div>
            <section className='color' id="color">
                <Container fluid>
                    <Row> 
                        <Col xs={12} md={6} xl={6}>
                            <div className='border border-3 bordered-block'>
                                <Row className='mt-5'>
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
                            <div className='border border-3 bordered-block mt-2'>
                                <h1 className='mt-5'>Green color saturation</h1>
                                <p1 className='fs-4' id='color-slider-value'>{colorSliderValue}%</p1>
                                <div className="slider-container w-auto color-slider">
                                    <input id='color-slider' defaultValue='0' type="range" min="0" max="100" step='1' onInput={(event) => {
                                        setColorSliderValue(event.target.value);
                                        document.getElementById('color-slider-value').style.marginLeft = Number(event.target.value) * 14.1 + -700 + 'px';
                                    }}/>
                                </div>
                            </div>
                            <div className='border border-3 bordered-block mt-2'>
                                <Row className='mt-5'>
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
                        <Col xs={12} md={6} xl={6}>
                            <Row>
                                <canvas ref={canvas1} className='image-container'
                                    onDragStart={e => dragStartHandler(e)}
                                    onDragLeave={e => dragLeaveHandler(e)}
                                    onDragOver={e => dragStartHandler(e)}
                                    onDrop={e => onDropHandler(e)}
                                />
                            </Row>                              
                            <Row className='mt-2'>
                                <canvas className='image-container'/>
                            </Row>  
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}