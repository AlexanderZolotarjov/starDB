import React from 'react';
import cn from 'classnames';

import styles from './header.module.scss';

const Header = ({ className, changeCurrentPage, type }) => {
  return (
    <div
      className={cn(
        className,
        styles.header
      )}
    >
      <h2 className={styles.header__title}>Star DB</h2>
      <ul className={styles.header__menu}>
        <li
          className={cn(
            styles.header__link, {
            [styles.header__link_active]: type === 'people'
          }
          )}
          onClick={() => { changeCurrentPage('people') }}
        >
          <div>People</div>
        </li>
        <li
          className={cn(
            styles.header__link, {
            [styles.header__link_active]: type === 'planets'
          }
          )}
          onClick={() => { changeCurrentPage('planets') }}
        >
          <div>Planets</div>
        </li>
        <li
          className={cn(
            styles.header__link, {
            [styles.header__link_active]: type === 'starships'
          }
          )}
          onClick={() => { changeCurrentPage('starships') }}
        >
          <div>Starships</div>
        </li>
      </ul>
    </div>
  )
}

export default Header;