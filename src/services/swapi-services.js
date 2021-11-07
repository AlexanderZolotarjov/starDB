
class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }

    const body = await res.json();
    return body;
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person)
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet)
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship)
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    }
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  }

  _extractId(item) {
    const idRegExp = /\/(\d+)\/$/;
    return item.url.match(idRegExp)[1]
  }

}

export default SwapiService;
