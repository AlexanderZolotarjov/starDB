import React from 'react';

import Header from '../header';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import RandomPlanet from '../random-planet';

import styles from './app.module.scss';

export default class App extends React.Component {

  state = {
    id: 1,
    type: 'people'
  }


  changeCurrentItem = (item) => {
    this.setState({
      id: Number(item.target.id)
    })
  }

  changeCurrentPage = (type) => {
    this.setState({
      id: 1,
      type: type
    })
  }

  render() {
    const { changeCurrentItem, changeCurrentPage } = this;
    const { id, type } = this.state;



    return (
      <div className={styles.app}>
        <Header
          className={styles.header}

          type={type}

          changeCurrentPage={changeCurrentPage}
        />
        <RandomPlanet
          className={styles.randomPlanet}
        />

        <ItemList
          className={styles.itemList}

          id={id}
          type={type}

          changeCurrentItem={changeCurrentItem}
        />

        <ItemDetails
          className={styles.personDetails}

          id={id}
          type={type}
        />
      </div>
    )
  }
}
