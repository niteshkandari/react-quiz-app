import classes from './modal.module.css'
import React from 'react'
import ReactDom from 'react-dom'
const ModalWrapper = props => {
 
  return (
    <>
    <div className={classes.backdrop} onClick={props.onConfirm}>
      <div className={classes.overlay}>
      <div>
       <h1> Wrong Answer</h1> 
       <span>score:{props.score}</span>
       </div>
    </div>
    </div>
    </>
  )
}

const Modal = props => {
  return (
    <>
    {ReactDom.createPortal(<ModalWrapper score={props.score}  onConfirm={props.handler}/>,document.getElementById('error-modal'))}
    </>
  )
}
export default Modal;