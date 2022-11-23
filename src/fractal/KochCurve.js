import { useState, useEffect, useRef } from 'react'

export const KochCurve = ({basicFigure, internalFigure, isReverse, numerator, denumerator}) => {
    const defaultPointsTriangle = {
        p1: { x: 0, y: -159.8076211353316 },
        p2: { x: 150, y: 100 },
        p3: { x: -150, y: 100 }
    };
    const defaultPointsSquare = {
        p1: { x: -150, y: -150 },
        p2: { x: 150, y: -150 },
        p3: { x: 150, y: 150 },
        p4: { x: -150, y: 150 }
    };
    const canvas = useRef(null)
    const [currIteration, setCurrIteration] = useState(-1);
    const [startingPointsTriangle, setStartingPointsTriangle] = useState(defaultPointsTriangle);
    const [startingPointsSquare, setStartingPointsSquare] = useState(defaultPointsSquare);

    useEffect(() => {
        let context = canvas.current.getContext('2d');
        canvas.current.width = 810;
        canvas.current.height = 450;
        context.translate(.5 * canvas.current.width, .5 * canvas.current.height);
    }, [])

    useEffect(() => {
        basicFigure === 'square' ? setStartingPointsTriangle(defaultPointsTriangle) : setStartingPointsSquare(defaultPointsSquare);
    }, [basicFigure]);

    useEffect(() => {
        drawFractal(currIteration);
    }, [startingPointsTriangle, startingPointsSquare, internalFigure, isReverse, numerator, denumerator]);
    
    const koch = (a, b, limit) => {
        let [dx, dy] = [b.x - a.x, b.y - a.y]
        let dist = Math.sqrt(dx * dx + dy * dy)
        let h = 0;
        if(numerator === '' || denumerator === '')
            h = Math.sqrt(3) * dist / 6;
        else 
            h = dist * Number(numerator) / Number(denumerator);

        if(internalFigure === 'triangle') {
            let p1 = {
                x: a.x + dx / 3,
                y: a.y + dy / 3
            }
            let p3 = {
                x: b.x - dx / 3,
                y: b.y - dy / 3
            }
            let midPoint = {
                x: (a.x + b.x) / 2,
                y: (a.y + b.y) / 2
            }
            let [dxP, dyP] = [b.y - a.y, a.x - b.x];
            let p2 = {
                x: midPoint.x + dxP * h / dist * (isReverse ? (-1) : 1),
                y: midPoint.y + dyP * h / dist * (isReverse ? (-1) : 1)
            }
            if (limit > 0) {
                koch(a, p1, limit - 1)
                koch(p1, p2, limit - 1)
                koch(p2, p3, limit - 1)
                koch(p3, b, limit - 1)
            } else {
                let context = canvas.current.getContext('2d')
                context.strokeStyle = '#CB2E81';
                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(p1.x, p1.y)
                context.lineTo(p2.x, p2.y)
                context.lineTo(p3.x, p3.y)
                context.lineTo(b.x, b.y)
                context.stroke()
            }

        } else {
            let p1 = {
                x: a.x + dx / 3,
                y: a.y + dy / 3
            }
            let p4 = {
                x: b.x - dx / 3,
                y: b.y - dy / 3
            }
            let [dxP, dyP] = [b.y - a.y, a.x - b.x];
            let p2 = {
                x: p1.x + dxP * h / dist * (isReverse ? (-1) : 1),
                y: p1.y + dyP * h / dist * (isReverse ? (-1) : 1)
            }
            let p3 = {
                x: p4.x + dxP * h / dist * (isReverse ? (-1) : 1),
                y: p4.y + dyP * h / dist * (isReverse ? (-1) : 1)
            }
            
            if (limit > 0) {
                koch(a, p1, limit - 1)
                koch(p1, p2, limit - 1)
                koch(p2, p3, limit - 1)
                koch(p3, p4, limit - 1)
                koch(p4, b, limit - 1)
            } else {
                let context = canvas.current.getContext('2d')
                context.strokeStyle = '#CB2E81';
                context.beginPath()
                context.moveTo(a.x, a.y)
                context.lineTo(p1.x, p1.y)
                context.lineTo(p2.x, p2.y)
                context.lineTo(p3.x, p3.y)
                context.lineTo(p4.x, p4.y)
                context.lineTo(b.x, b.y)
                context.stroke()
            }
        }
    }

     const drawFractal = (value) => {
        let context = canvas.current.getContext('2d')
        context.clearRect(-700, -700, 1400, 1400);
        context.strokeStyle = '#CB2E81';
        context.beginPath();
        if(basicFigure === 'triangle') {
            if(value == -1) {
                context.moveTo(startingPointsTriangle.p1.x, startingPointsTriangle.p1.y);
                context.lineTo(startingPointsTriangle.p2.x, startingPointsTriangle.p2.y);
                context.lineTo(startingPointsTriangle.p3.x, startingPointsTriangle.p3.y);
                context.lineTo(startingPointsTriangle.p1.x, startingPointsTriangle.p1.y);
                context.stroke();
            } else {
                koch(startingPointsTriangle.p1, startingPointsTriangle.p2, value)
                koch(startingPointsTriangle.p2, startingPointsTriangle.p3, value)
                koch(startingPointsTriangle.p3, startingPointsTriangle.p1, value)
            }
        } else { 
            if(value == -1) {
                context.moveTo(startingPointsSquare.p1.x, startingPointsSquare.p1.y);
                context.lineTo(startingPointsSquare.p2.x, startingPointsSquare.p2.y);
                context.lineTo(startingPointsSquare.p3.x, startingPointsSquare.p3.y);
                context.lineTo(startingPointsSquare.p4.x, startingPointsSquare.p4.y);
                context.lineTo(startingPointsSquare.p1.x, startingPointsSquare.p1.y);
                context.stroke();
            } else {
                koch(startingPointsSquare.p1, startingPointsSquare.p2, value)
                koch(startingPointsSquare.p2, startingPointsSquare.p3, value)
                koch(startingPointsSquare.p3, startingPointsSquare.p4, value)
                koch(startingPointsSquare.p4, startingPointsSquare.p1, value)
            }
        }
    }

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

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
        let dx = mouseX - startX;
        let dy = mouseY - startY;
        setStartX(mouseX);
        setStartY(mouseY);
        basicFigure === 'triangle' ? setStartingPointsTriangle({
            p1: { x: startingPointsTriangle.p1.x + dx, y: startingPointsTriangle.p1.y + dy },
            p2: { x: startingPointsTriangle.p2.x + dx, y: startingPointsTriangle.p2.y + dy },
            p3: { x: startingPointsTriangle.p3.x + dx, y: startingPointsTriangle.p3.y + dy }
        }) : setStartingPointsSquare({
            p1: { x: startingPointsSquare.p1.x + dx, y: startingPointsSquare.p1.y + dy },
            p2: { x: startingPointsSquare.p2.x + dx, y: startingPointsSquare.p2.y + dy },
            p3: { x: startingPointsSquare.p3.x + dx, y: startingPointsSquare.p3.y + dy },
            p4: { x: startingPointsSquare.p4.x + dx, y: startingPointsSquare.p4.y + dy }
        })
    }

    const zoom = (event) => {
        const scrollValue = 1.5;
        if(event.deltaY < 0) {
            basicFigure === 'triangle' ? setStartingPointsTriangle({
                p1: { x: startingPointsTriangle.p1.x * scrollValue, y: startingPointsTriangle.p1.y * scrollValue },
                p2: { x: startingPointsTriangle.p2.x * scrollValue, y: startingPointsTriangle.p2.y * scrollValue },
                p3: { x: startingPointsTriangle.p3.x * scrollValue, y: startingPointsTriangle.p3.y * scrollValue }
            }) : setStartingPointsSquare({
                p1: { x: startingPointsSquare.p1.x * scrollValue, y: startingPointsSquare.p1.y * scrollValue },
                p2: { x: startingPointsSquare.p2.x * scrollValue, y: startingPointsSquare.p2.y * scrollValue },
                p3: { x: startingPointsSquare.p3.x * scrollValue, y: startingPointsSquare.p3.y * scrollValue },
                p4: { x: startingPointsSquare.p4.x * scrollValue, y: startingPointsSquare.p4.y * scrollValue },
            })
        } else { 
            basicFigure === 'triangle' ? setStartingPointsTriangle({
                p1: { x: startingPointsTriangle.p1.x / scrollValue, y: startingPointsTriangle.p1.y / scrollValue },
                p2: { x: startingPointsTriangle.p2.x / scrollValue, y: startingPointsTriangle.p2.y / scrollValue },
                p3: { x: startingPointsTriangle.p3.x / scrollValue, y: startingPointsTriangle.p3.y / scrollValue }
            }) : setStartingPointsSquare({
                p1: { x: startingPointsSquare.p1.x / scrollValue, y: startingPointsSquare.p1.y / scrollValue },
                p2: { x: startingPointsSquare.p2.x / scrollValue, y: startingPointsSquare.p2.y / scrollValue },
                p3: { x: startingPointsSquare.p3.x / scrollValue, y: startingPointsSquare.p3.y / scrollValue },
                p4: { x: startingPointsSquare.p4.x / scrollValue, y: startingPointsSquare.p4.y / scrollValue },
            });
        }
    }

    return(
        <div>
            <div className='canvas-container'>
                <h1 className="iteration-info">i = {currIteration + 1}</h1>
                <canvas ref={canvas} id='koch-canvas' className='koch-canvas'
                    onMouseDown={(event) => mouseDown(event)}
                    onMouseUp={(event) => mouseUp(event)}
                    onMouseOut={(event) => mouseOut(event)}
                    onMouseMove={(event) => mouseMove(event)}
                    onWheel={(event) => zoom(event)}
                    />
                <div className="slider-container">
                    <input id='slider' defaultValue='-1' type="range" min="-1" max="6" step='1' onInput={(event) => {
                        drawFractal(event.target.value);
                        setCurrIteration(Number(event.target.value));
                    }}/>
                </div>
            </div>
        </div>
    )
 }