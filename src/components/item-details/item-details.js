import React from 'react';
import cn from 'classnames';

import styles from './item-details.module.scss';
// import SwapiService from '../../services/swapi-services';
import ErrorMessage from '../error-message';
import Spinner from '../spinner';

export default class ItemDetails extends React.Component {

  // swapiService = new SwapiService();

  state = {
    personData: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updateItem(this.props.id, this.props.type);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.setState({
        loading: true,
        error: false
      })
      this.updateItem(this.props.id, this.props.type);
    } else if (prevProps.id !== this.props.id) {
      this.setState({
        loading: true,
        error: false
      })
      this.updateItem(this.props.id, this.props.type);
    }
  }


  onPersonLoaded = (personData) => {
    this.setState({
      personData,
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

  updateItem = (id, type) => {
    this.props.getData()
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  getHeight = (element) => {
    if (element) {
      return element.clientHeight - 40 + 'px';
    } else {
      return 270 + 'px'
    }
  }

  render() {
    const {
      type
    } = this.props;

    const {
      personData,
      loading,
      error
    } = this.state;


    const height = this.getHeight(document.getElementById('itemDetailsContainer'))

    const hasData = !loading && !error;

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner height={height} /> : null;
    const content = hasData ? < PersonView type={type} personData={personData} /> : null

    return (
      <div
        id="itemDetailsContainer"
        className={cn(
          styles.personDetails,
          styles.personDetails_list
        )}
      >
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const PersonView = ({
  personData,
  type
}) => {

  switch (type) {
    case 'people':
      return (
        <div className={styles.personDetails__body}>
          <div className={cn(
            styles.personDetails__photo,
            styles.personDetails__photo_people
          )}
          >
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${personData.id}.jpg`}
              onError={(item) => item.target.src = 'https://biznes-apps.ru/images/404.jpg'}
              alt="personalPhoto"
            ></img>
          </div>
          <div className={styles.personDetails__info}>
            <h1>{personData.name}</h1>
            <p>{`Gender:\xa0 ${personData.gender || ''}`}</p>
            <p>{`Birth year:\xa0 ${personData.birthYear || ''}`}</p>
            <p>{`Eye color:\xa0 ${personData.eyeColor || ''}`}</p>
          </div>
        </div>
      )
    case 'planets':
      return (
        <div className={styles.personDetails__body}>
          <div className={cn(
            styles.personDetails__photo,
            styles.personDetails__photo_planets
          )}
          >
            <img
              src={`https://starwars-visualguide.com/assets/img/planets/${personData.id}.jpg`}
              onError={(item) => item.target.src = 'https://biznes-apps.ru/images/404.jpg'}
              alt="personalPhoto"
            ></img>
          </div>
          <div className={styles.personDetails__info}>
            <h1>{personData.name}</h1>
            <p>{`Diameter:\xa0 ${personData.diameter || ''}`}</p>
            <p>{`Population:\xa0 ${personData.population || ''}`}</p>
            <p>{`Rotation period:\xa0 ${personData.rotationPeriod || ''}`}</p>
          </div>
        </div>
      )
    default:
      return (
        <div className={styles.personDetails__body}>
          <div className={cn(
            styles.personDetails__photo,
            styles.personDetails__photo_starships
          )}
          >
            <img
              src={`https://starwars-visualguide.com/assets/img/starships/${personData.id}.jpg`}
              onError={(item) => item.target.src = 'https://biznes-apps.ru/images/404.jpg'}
              alt="personalPhoto"
            ></img>
          </div>
          <div className={styles.personDetails__info}>
            <h1>{personData.name}</h1>
            <p>{`Manufacturer:\xa0 ${personData.manufacturer || ''}`}</p>
            <p>{`Cost:\xa0 ${personData.costInCredits || ''}`}</p>
            <p>{`Length:\xa0 ${personData.length || ''}`}</p>
            <p>{`Passengers:\xa0 ${personData.passengers || ''}`}</p>
            <p>{`Cargo capacity:\xa0 ${personData.cargoCapacity || ''}`}</p>
          </div>
        </div>
      )
  }


}