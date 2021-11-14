import React from 'react';
import cn from 'classnames';

import styles from './errorMessage.module.scss';
import icon from './death.png'

const ErrorMessage = ({ type }) => {
  return (
    <div className={cn(
      styles.errorMessage, {
      [styles.errorMessage_main]: type === 'main',
      [styles.errorMessage_list]: type === 'list'
    }
    )}>
      <img src={icon} alt="death"></img>
      <h2>BOOM!</h2>
      <p>Something has gone terribly wrong.</p>
      <p>(but we already sent droids to fix it).</p>
    </div>
  )
}

export default ErrorMessage;