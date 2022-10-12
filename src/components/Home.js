import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import light_robot from '../assets/img/light_robot.png';

export const Home = props => {
    const navigate = useNavigate();
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const fullText = "Hello young expert";
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(80);
    const period = 4500;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta)

        return () => { clearInterval(ticker)};
    }, [text]);

    const tick = () => {
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
        setText(updatedText);
        if(isDeleting) {
            setDelta(50);
        }
        if(!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if(isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(80);
        }
    }

    return(
        <section className='banner' id="home">
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} xl={7}>
                        <h1><span className='wrap'>{text + ' !'}</span></h1>
                        <p>Let's look into the world of<br/>graphics and interact with it!</p>
                        <span className="navbar-button navbar-button-slide home-button">
                            <button onClick={() => { 
                                props.changeLink('fractal');
                                navigate('/fractal');
                                }}>
                                <span>Get started</span>
                            </button>
                        </span>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={light_robot} alt="Robot"/>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}