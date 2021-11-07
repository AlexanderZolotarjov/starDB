import React from 'react';

import styles from './errorMessage.module.scss';
import icon from './death.png'

const ErrorMessage = () => {
  return (
    <div className={styles.errorMessage}>
      <img src={icon} alt="death"></img>
      <h2>BOOM!</h2>
      <p>something has gone terribly wrong</p>
      <p>(but we already sent droids to fix it)</p>
    </div>
  )
}

export default ErrorMessage;