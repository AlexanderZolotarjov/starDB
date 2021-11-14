import React from 'react';

import Spinner from '../spinner';
import ErrorMessage from '../error-message/errorMessage';

import styles from './random-planet.module.scss';

export default class RandomPlanet extends React.Component {

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updatePlanet = () => {
    this.props.getData(true)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !loading && !error;

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null

    return (
      <div className={styles.randomPlanet}>
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const PlanetView = ({
  planet: {
    id,
    name,
    population,
    rotationPeriod,
    diameter
  }
}) => {
  return (
    <div className={styles.randomPlanet__body}>
      <div className={styles.randomPlanet__photo}>
        <img
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          onError={(item) => item.target.src = 'https://biznes-apps.ru/images/404.jpg'}
          alt="planet"
        ></img>
      </div>
      <div className={styles.randomPlanet__info}>
        <h1>{name}</h1>
        <p>Population {population}</p>
        <p>Rotation Period {rotationPeriod}</p>
        <p>Diameter {diameter}</p>
      </div>
    </div>
  )
}