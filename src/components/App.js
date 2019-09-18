import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets = () => {
    let endpoint = '/api/pets';

    
    if (this.state.filters.type === 'all') {
      endpoint = '/api/pets'
      console.log(endpoint)
    }
      else{
        endpoint += `?type=${this.state.filters.type}`;
        console.log(endpoint)

      }
    fetch(endpoint)
      .then(r=>r.json())
      .then(pets=>{this.setState({pets})})
  }

  onChangeType = (e) => {
    console.log(e.target)
    const petType = e.target.value
    this.setState({ filters: { type: petType } });
}

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : pet;
    })
    this.setState({pets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
