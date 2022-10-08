import { useState, useEffect } from "react";
import { Nav, Navbar, Container} from "react-bootstrap";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Fractal } from "./Fractal";
import { ColorTest } from "./ColorTest";
import { Transformation } from "./Transformation";
import logo from '../assets/img/logo.png';

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState(window.location.pathname.length === 1 ? 'home' : window.location.pathname.replace('/', ''));
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        activeLink === 'fractal' ? document.body.style.overflow = "hidden" : document.body.style.overflow = "visible";
    }, [activeLink]);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }
    
    return (
        <BrowserRouter>
            <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="navbar-toggler-icon"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto justify-content-between w-100">
                            <Nav.Link as={Link} to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/fractal" className={activeLink === 'fractal' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('fractal')}>Fractal</Nav.Link>
                            <Nav.Link as={Link} to="/color" className={activeLink === 'color' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('color')}>Color</Nav.Link>
                            <Nav.Link as={Link} to="/transformation" className={activeLink === 'transformation' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('transformation')}>Transformation</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
            <div>
                <Routes>
                    <Route path="/" element={<Home changeLink={link => setActiveLink(link)}/>}/>
                    <Route path="/fractal" element={<Fractal/>}/>
                    <Route path="/color" element={<ColorTest/>}/>
                    <Route path="/transformation" element={<Transformation/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}