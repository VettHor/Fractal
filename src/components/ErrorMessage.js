import { useState } from 'react';
import robotPopout from '../assets/img/robot_popout.png'
import error from '../assets/img/error.png'

export const ErrorMessage = ({open, onClose, header, text}) => {
    const [closeButtonAnimation, setCloseButtonAnimation] = useState('');

    const closePage = () => {
        onClose(); 
        setCloseButtonAnimation('');
        document.body.style.overflow = "hidden";
    } 

    return !open ? null :
    (
        <div className="overlay">
            <div className="modal-container">
                <div className="content">
                    <img src={error} className='error-icon' width={150}></img>
                    <h1 className='error-h1'>{header}</h1>
                    <img className='close-btn' 
                        src={require(`../assets/img/close_button${closeButtonAnimation}.png`)} 
                        onClick={() => { 
                            closePage();
                        }}
                        onMouseDownCapture={() => setCloseButtonAnimation('_clicked')}
                        onMouseOver={() => setCloseButtonAnimation('_hover')}
                        onMouseOut={() => setCloseButtonAnimation('')}/>
                    <p className='error-text'>{`⠀${text}`}</p>
                    <div className='export-div'>
                        <span className='navbar-button navbar-button-slide home-button export-span justify-content-center'>
                            <button type='submit' className='error-button' onClick={() => closePage()}>OK</button>
                        </span>
                    </div>
                    <img className='popout-robot' src={robotPopout}/>
                </div>
            </div>
        </div>
    )
}