import { useState } from 'react';
import robotPopout from '../assets/img/robot_popout.png'

export const Popout = ({open, onClose, header, text, nextHeader, nextText}) => {
    const [closeButtonAnimation, setCloseButtonAnimation] = useState('');
    const [arrowNextAnimation, setArrowNextAnimation] = useState('');
    const [arrowPrevAnimation, setArrowPrevAnimation] = useState('');
    const [currentPage, setCurrPage] = useState(1);
    const [currentHeader, setCurrentHeader] = useState(header);
    const [currentText, setCurrentText] = useState(text);

    return !open ? null :
    (
        <div className="overlay">
            <div className="modal-container">
                <div className="content">
                    { nextHeader === '' ? null :
                        <div>
                            <h1 className='popout-h1 page-position'>{currentPage} / 2</h1>
                            { currentPage === 1 ? <img className='arrow-position' 
                                src={require(`../assets/img/arrow_next${arrowNextAnimation}.png`)}
                                onClick={() => {
                                    setCurrPage(2);
                                    setCurrentHeader(nextHeader);
                                    setCurrentText(nextText);
                                }}
                                onMouseDownCapture={() => setArrowNextAnimation('_clicked')}
                                onMouseOver={() => setArrowNextAnimation('_hover')}
                                onMouseOut={() => setArrowNextAnimation('')}/>
                                : null
                            }
                            { currentPage === 2 ? <img className='arrow-position' 
                                src={require(`../assets/img/arrow_prev${arrowPrevAnimation}.png`)}
                                onClick={() => {
                                    setCurrPage(1);
                                    setCurrentHeader(header);
                                    setCurrentText(text);
                                }}
                                onMouseDownCapture={() => setArrowPrevAnimation('_clicked')}
                                onMouseOver={() => setArrowPrevAnimation('_hover')}
                                onMouseOut={() => setArrowPrevAnimation('')}/>
                                : null
                            }
                        </div>
                    }   
                    <h1 className='popout-h1'>{currentHeader}</h1>
                    <img className='close-btn' 
                        src={require(`../assets/img/close_button${closeButtonAnimation}.png`)} 
                        onClick={() => { 
                            setCurrPage(1);
                            setCurrentHeader(header);
                            setCurrentText(text);
                            onClose(); 
                            setCloseButtonAnimation('');
                            document.body.style.overflow = "hidden";
                        }}
                        onMouseDownCapture={() => setCloseButtonAnimation('_clicked')}
                        onMouseOver={() => setCloseButtonAnimation('_hover')}
                        onMouseOut={() => setCloseButtonAnimation('')}/>
                    <p className='popout-text'>{`⠀⠀⠀⠀⠀${currentText}`}</p>
                    <img className='popout-robot' src={robotPopout}/>
                </div>
            </div>
        </div>
    )
}