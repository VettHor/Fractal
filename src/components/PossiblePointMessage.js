import { useState } from 'react';
import robotPopout from '../assets/img/robot_popout.png'
import question from '../assets/img/question-mark.png'

export const PossiblePointMessage = ({open, onClose, onSetPoint, header, text}) => {
    const [closeButtonAnimation, setCloseButtonAnimation] = useState('');

    const closePage = () => {
        onClose(); 
        setCloseButtonAnimation('');
        document.body.style.overflow = "hidden";
    } 

    const setPoint = () => {
        closePage();
        onSetPoint();
    }

    return !open ? null :
    (
        <div className="overlay">
            <div className="modal-container">
                <div className="content">
                    <img src={question} className='error-icon' width={160}></img>
                    <h1 className='possible-point-h1'>{header}</h1>
                    <img className='close-btn' 
                        src={require(`../assets/img/close_button${closeButtonAnimation}.png`)} 
                        onClick={() => { 
                            closePage();
                        }}
                        onMouseDownCapture={() => setCloseButtonAnimation('_clicked')}
                        onMouseOver={() => setCloseButtonAnimation('_hover')}
                        onMouseOut={() => setCloseButtonAnimation('')}/>
                    <p className='possible-point-text'>{`${text}`}</p>

                    <div className='d-flex'>
                        <div className='export-div'>
                            <span className='navbar-button navbar-button-slide home-button export-span justify-content-center'>
                                <button type='submit' className='possible-point-button possible-point-button-left' onClick={() => closePage()}>No</button>
                            </span>
                        </div>

                        <div className='export-div'>
                            <span className='navbar-button navbar-button-slide home-button export-span justify-content-center'>
                                <button type='submit' className='possible-point-button possible-point-button-right' onClick={() => setPoint()}>Yes</button>
                            </span>
                        </div>
                    </div>
                    <img className='popout-robot' src={robotPopout}/>
                </div>
            </div>
        </div>
    )
}