import React from 'react';
import cn from 'classnames';
// import { motion, AnimatePresence } from "framer-motion"

import ErrorMessage from '../error-message/errorMessage';
import Spinner from '../spinner';


import styles from './item-list.module.scss';

export default class ItemList extends React.Component {

  state = {
    type: this.props.type || 'people',
    list: [],
    loading: true,
    error: false,
    currentStatus: true
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
    this.props
      .getData()
      .then(this.onListLoaded)
      .catch(this.onError);
  }

  toggleCurrentStatus = () => {
    this.setState({
      currentStatus: !this.state.currentStatus
    })
  }

  getShortString = (str) => {
    if (str.length > 20) {
      return str.substr(0, 20) + '.';
    } else {
      return str
    }
  }

  getSpanContent = (id, currentId, list) => {
    if (+id === +currentId && this.state.currentStatus === false) {
      return (
        <span
          className={styles.itemList__subLink_close}
        ></span>
      )
    } else if (+id === +list[0].id && this.state.currentStatus === true) {
      return (
        <span
          className={styles.itemList__subLink_open}
        ></span>
      )
    }
  }

  madeFinallyList(list) {
    const currentId = this.props.id;
    return (
      list.map((item) => {
        const { id, name } = item;

        const shortName = this.getShortString(name);
        const spanContent = this.getSpanContent(id, currentId, list);

        return (
          <li
            key={id}
            className={styles.itemList__item}
          >
            <div
              id={id}
              className={cn(
                styles.itemList__link, {
                [styles.itemList__link_first]: +id === +list[0].id,
                [styles.itemList__link_last]: +id === +list[list.length - 1].id,
                [styles.itemList__link_active]: +id === +currentId,
                [styles.itemList__link_one]: +id === +currentId && this.state.currentStatus === false,
                [styles.itemList__link_hide]: +id !== +currentId && this.state.currentStatus === false
              }
              )}
              onClick={(target) => {
                this.props.changeCurrentItem(target);
                this.toggleCurrentStatus()
              }
              }
            >
              {`${shortName}`}
              {spanContent}
            </div>
          </li>
        )
      })
    )
  }

  madeBigFinallyList(list) {
    return (
      list.map((item) => {
        const { id, name } = item
        const currentId = this.props.id;
        const shortName = this.getShortString(name)
        return (
          <li
            key={id}
            className={styles.itemList__item}
          >
            <div
              id={id}
              className={cn(
                styles.itemList__link, {
                [styles.itemList__link_first]: id === list[0].id,
                [styles.itemList__link_last]: id === list[list.length - 1].id,
                [styles.itemList__link_active]: +id === currentId
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

    let height = this.getHeight(document.getElementById('itemListContainer'))

    const hasData = !loading && !error;

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner height={height} /> : null;
    const bigContent = hasData ? this.madeBigFinallyList(list) : null;
    const content = hasData ? this.madeFinallyList(list) : null;

    return (
      <div
        id="itemListContainer"
      >
        <SubItemList
          type="small"
          errorMessage={errorMessage} spinner={spinner}
          content={content} bigContent={bigContent}
        />
        <SubItemList
          type="big"
          errorMessage={errorMessage} spinner={spinner}
          content={content} bigContent={bigContent}
        />
      </div >
    )
  }
}

const SubItemList = ({ type, errorMessage, spinner, content, bigContent }) => {
  return (
    <div
      className={cn(
        styles.itemList, {
        [styles.itemList_small]: type === 'small',
        [styles.itemList_big]: type === 'big'
      }
      )}>
      <ul className={styles.itemList__list}>
        {errorMessage}
        {spinner}
        {type === 'small' ? content : bigContent}
      </ul>
    </div>
  )
}