import React from 'react';
import './App.scss';
import Card from './components/Card.js';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', cities: [], isSubmitted: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.getStates();
  }

  getStates = () => {
    let config = {
      method: 'get',
      url: `https://www.universal-tutorial.com/api/states/${this.state.value}`,
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtYXhpbXNhZmZhcmluaUBnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJ1YVZFQlpWMVVLREZkdGdLekJKaWwta1pFeE9mZG82WDVwX3pOLWlsY0FVUmRQNkR0Wi03cDQ3bFMtZDJoVHAzSnhZIn0sImV4cCI6MTY0MDM2OTg5M30.x7SN3BgxBbiINyBNryT5Zda4X4jPtWEHyITl8wWMRqA",
        "Accept": "application/json"
      }
    };

    axios(config)
      .then(res => {
         this.getWeatherPerState(res.data) // Pushing received states array to getWeatherPerState()
      }) 
       .catch((error) => {
        console.log(error);
      }); // Catching errors from API
   
  } 
  
  getWeatherPerState = (states) => {
     const arr = [];
     states.forEach((state, i) => (
       setTimeout(async () => {
         const r = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state.state_name}&appid=eeca2e559b170df1a795ea1dee136f6b`)
         arr.push({ name: state.state_name, temp: Math.ceil(r.data.main.temp - 273.15), url: `https://www.google.com/search?q=${state.state_name}`})
         this.setState({ cities: arr, isSubmitted: true })
       }, i * 1)
     ))
  }

  render() {
    
    if (this.state.isSubmitted) {
      return (
        <div >
            <div>
           <form className="form" onSubmit={this.handleSubmit}>
            <label className="form__label">
              Search:
            </label>
              <input className="form__input" type="text" placeholder="Write smth"  value={this.state.value} onChange={this.handleChange}/>
            <input className="form__btn" type="submit" value="Submit" />
          </form>
        </div> 
        
        <div className="wrapper">
            {this.state.cities.map((c) => (
               <Card key={c.name} title={c.name} description={c.temp} url={c.url} />
          ))}
          </div>
        </div>
      )
      
    } else {

      return (
        <div>
          <form className="form" onSubmit={this.handleSubmit}>
            <label className="form__label">
              Search:
            </label>
               <input className="form__input" type="text" placeholder="Write smth" value={this.state.value} onChange={this.handleChange} />
            <input className="form__btn" type="submit" value="Submit" />
          </form>
        </div> )
    }
  }
}
