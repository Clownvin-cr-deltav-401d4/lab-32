import React from 'react';

import styles from './modal.module.scss';

const Modal = props => {
  console.log('Rendering modal with props', props);
  return (
    <div className={styles.modal}>
      <div>
        <header>
          <span className="title">{props.title}</span>
          <button onClick={props.close}>X</button>
        </header>
        <div>{props.children}</div>
      </div>
    </div>
  );
};
export default Modal;
