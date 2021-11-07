import React from 'react';
import cn from 'classnames';
// import { motion, AnimatePresence } from "framer-motion"

import SwapiService from '../../services/swapi-services';

import ErrorMessage from '../error-message/errorMessage';
import Spinner from '../spinner';


import styles from './item-list.module.scss';

export default class ItemList extends React.Component {

  swapiService = new SwapiService();

  state = {
    type: this.props.type || 'people',
    list: [],
    loading: true,
    error: false,
    currentStatus: false
  };

  componentDidMount() {
    this.updateList(this.state.type);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.type !== this.props.type) {
      this.setState({
        loading: true
      })
      this.updateList(this.props.type);
    }
  }

  onListLoaded = (list) => {
    this.setState({
      list,
      loading: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateList = (type) => {
    switch (type) {
      case 'people':
        this.swapiService
          .getAllPeople()
          .then(this.onListLoaded)
          .catch(this.onError);
        break;
      case 'planets':
        this.swapiService
          .getAllPlanets()
          .then(this.onListLoaded)
          .catch(this.onError);
        break;
      default:
        this.swapiService
          .getAllStarships()
          .then(this.onListLoaded)
          .catch(this.onError);
    }
  }

  toggleCurrentStatus = () => {
    this.setState({
      currentStatus: !this.state.currentStatus
    })
  }

  getProperty = (item) => {
    if (item.birthYear) {
      return (
        `${item.birthYear}`
      )
    } else if (item.diameter) {
      return (
        `${item.diameter} km`
      )
    } else {
      return (
        `${item.length} m`
      )
    }
  }

  getShortString = (str) => {
    if (str.length > 20) {
      return str.substr(0, 20) + '.';
    } else {
      return str
    }
  }

  getHeight = (element) => {
    if (element) {
      return element.clientHeight + 'px';
    } else {
      return 270 + 'px'
    }
  }

  getCorrectId = (id) => {
    if (id === 1 && this.props.type === 'starships') {
      return 2
    } else {
      return id;
    }
  }

  madeFinallyList(list) {
    const currentId = this.getCorrectId(this.props.id);
    if (this.state.currentStatus) {
      return (
        list.map((item) => {
          const { id, name } = item;
          const correctId = this.getCorrectId(id);

          const shortName = this.getShortString(name)
          return (
            <li
              key={correctId}
              className={styles.itemList__item}
            >
              <div
                id={id}
                className={cn(
                  styles.itemList__link, {
                  [styles.itemList__link_first]: correctId === list[0].id,
                  [styles.itemList__link_last]: correctId === list[list.length - 1].id,
                  [styles.itemList__link_active]: +correctId === +currentId
                }
                )}
                onClick={(target) => {
                  this.props.changeCurrentItem(target);
                  this.toggleCurrentStatus()
                }
                }
              >
                {`${shortName}`}
                {correctId === list[0].id ?
                  <span
                    className={styles.itemList__link_open}
                  ></span> :
                  null}
              </div>
            </li>
          )
        })
      )
    } else {
      const item = list.find(element => +element.id === currentId) || list[0];
      const { id, name } = item;
      const shortName = this.getShortString(name);
      return (
        <li
          key={id}
          className={styles.itemList__item}
        >
          <div
            id={id}
            className={cn(
              styles.itemList__link,
              styles.itemList__link_short
            )}
            onClick={this.toggleCurrentStatus}
          >
            {`${shortName}`}
            <span
              className={styles.itemList__link_close}
            ></span>
          </div>
        </li>
      )
    }
  }

  madeBigFinallyList(list) {
    const currentId = this.getCorrectId(this.props.id);
    return (
      list.map((item) => {
        const { id, name } = item
        const correctId = this.getCorrectId(id);
        const shortName = this.getShortString(name)
        return (
          <li
            key={correctId}
            className={styles.itemList__item}
          >
            <div
              id={correctId}
              className={cn(
                styles.itemList__link, {
                [styles.itemList__link_first]: correctId === list[0].id,
                [styles.itemList__link_last]: correctId === list[list.length - 1].id,
                [styles.itemList__link_active]: +correctId === +currentId
              }
              )}
              onClick={this.props.changeCurrentItem}
            >
              {`${shortName}`}
            </div>
          </li>
        )
      })
    )
  }

  getHeight = (element) => {
    if (element) {
      return element.clientHeight + 'px';
    } else {
      return 270 + 'px'
    }
  }

  render() {

    const {
      list,
      loading,
      error
    } = this.state;



    const {
      className
    } = this.props

    let height = this.getHeight(document.getElementById('itemListContainer'))

    const hasData = !loading && !error;

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner height={height} /> : null;
    const bigContent = hasData ? this.madeBigFinallyList(list) : null;

    const content = hasData ? this.madeFinallyList(list) : null;
    // const contentFull = hasData ? this.madeFinallyList(list) : null;
    // const contentNotComplete = hasData ? this.madeFinallyList(list) : null;

    return (
      <div
        id="itemListContainer"
        className={className}
      >
        <div
          className={cn(
            styles.itemList,
            styles.itemList_small
          )}>
          <ul className={styles.itemList__list}>
            {errorMessage}
            {spinner}
            {content}
          </ul>
        </div>
        <div className={cn(
          styles.itemList,
          styles.itemList_big
        )}>
          <ul className={styles.itemList__list}>
            {errorMessage}
            {spinner}
            {bigContent}
          </ul>
        </div>
      </div >
    )
  }
}