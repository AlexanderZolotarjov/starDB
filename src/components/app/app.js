import React from 'react';
import SwapiService from '../../services/swapi-services';

import Header from '../header';
import ErrorMessage from '../error-message';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundary from '../error-boundary';

import styles from './app.module.scss';
import "../bootstrapDark.scss";

export default class App extends React.Component {

  swapiService = new SwapiService();

  state = {
    id: 1,
    type: 'people',
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  getData = (id) => {
    const randomId = Math.floor(Math.random() * 18 + 2);
    const currentId = id ? randomId : this.state.id;
    const currentType = id ? 'planets' : this.state.type
    switch (currentType) {
      case 'people':
        return this.swapiService.getPerson(currentId);
      case 'planets':
        return this.swapiService.getPlanet(currentId);
      default:
        return this.swapiService.getStarship(currentId);
    }
  } // Данные одного элемента

  getDataList = (type) => {
    const currentType = type ? type : this.state.type;
    switch (currentType) {
      case 'people':
        return this.swapiService.getAllPeople();
      case 'planets':
        return this.swapiService.getAllPlanets();
      default:
        return this.swapiService.getAllStarships();
    }
  } // Данные списка элементов

  changeCurrentItem = (item) => {
    this.setState({
      id: Number(item.target.id)
    })
  }

  changeCurrentPage = (type) => {
    this.getDataList(type)
      .then((res) => {
        const firstId = res[0].id
        this.setState({
          id: firstId,
          type: type
        })
      })
  }

  render() {
    const { changeCurrentItem, changeCurrentPage } = this;
    const { id, type, hasError } = this.state;

    if (hasError) {
      return (
        <ErrorMessage type="main" />
      )
    }

    return (
      <div className={styles.app}>
        <Header
          className={styles.header}

          type={type}

          changeCurrentPage={changeCurrentPage}
        />

        <ErrorBoundary
          className={styles.randomPlanet}

          componentType='planet'

          ReactComponent={RandomPlanet}

          getData={this.getData}
        />

        <ErrorBoundary
          className={styles.itemList}

          id={id}
          type={type}
          componentType='list'

          ReactComponent={ItemList}

          getData={this.getDataList}
          changeCurrentItem={changeCurrentItem}
        />

        <ErrorBoundary
          className={styles.personDetails}

          id={id}
          type={type}
          componentType='details'

          ReactComponent={ItemDetails}

          getData={this.getData}
        />
      </div>
    )
  }
}
