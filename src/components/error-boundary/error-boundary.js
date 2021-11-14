import React from 'react';
import cn from 'classnames';

import styles from './error-boundary.module.scss';

import ErrorMessage from '../error-message';

export default class ErrorBoundary extends React.Component {

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {

    const { hasError } = this.state;
    const { className, id, type, componentType,
      ReactComponent,
      getData,
      changeCurrentItem } = this.props;

    const error = hasError ? <ErrorMessage /> : null;
    const content = !hasError ?
      <ReactComponent
        id={id}
        type={type}

        changeCurrentItem={changeCurrentItem}
        getData={getData}
      /> : null;

    return (
      <div className={cn(
        className,
        styles.errorBoundary, {
        [styles.errorBoundary_list]: componentType === 'list'
      }

      )}>
        {error}
        {content}
      </div>
    )
  }
}