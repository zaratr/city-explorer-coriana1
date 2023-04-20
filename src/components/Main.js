import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Weather'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
// import '.App.css'

class Main extends React.Component {
    
  constructor(props) {
      super(props);
      this.state = {
          city: '',
          cityData: [],
          showMap: false,
          map: '',
          lat: '',
          lon: '',
          error: false,
          errorMsg: '',
          weatherData: '',
          showWeather: false,
          dateData: '',
      }
  }
  
  handleCitySubmit = (event) => {
      this.setState({ 
          city: event.target.value,
      })
  }
  
  submitCityData = async (event) => {
      event.preventDefault();

      try {
          let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`;

          let cityData = await axios.get(url)
          
          let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=14`;

          this.setState({
              cityData: cityData.data[0],
              map: map,
              lat: cityData.data[0].lat,
              lon: cityData.data[0].lon,
              error: false,
              showMap: true,
          })
          console.log(cityData.data[0]);
          this.handleWeather(cityData.data[0].lat, cityData.data[0].lon);
      } catch(error){
          this.setState({
              error: true,
              errorMsg: error.message,
              showMap: false,
              showWeather: false,
          })
      }

      
  }

  handleWeather = async () => {
      // event.preventDefault();
      try {
          let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;
          console.log('url', url);
          let weatherData = await axios.get(url);
          // console.log(weatherData);
          this.setState({
              weatherData: weatherData.data,
              // dateData: weatherData.data.valid_date,
              showWeather: true,
          })
          
      } catch (error) {
          console.log(error.message);
          
          this.setState({
              showWeather: false,
          })
      }
  }

  render() {
      console.log('this.state.weatherData',this.state.weatherData);
      return (
          <>
              <Container fluid>
                  <Row>
                      <Col className="text-center">
                          <form className="form" onSubmit={this.submitCityData} >
                              <label> Enter a city name:
                                  <input type="text" onInput={this.handleCitySubmit} />
                              </label>
                              <button className="button" type="submit">Explore!</button>
                          </form>
                      </Col>
                  </Row>
                      {
                          this.state.error
                          ? <p>{this.state.errorMsg}</p>
                          : <>
                          <p>{this.state.cityData.display_name}</p>
                          <ListGroup id="lat-lon">
          <ListGroup.Item variant="primary" id="thisCity">
            {this.state.cityData.display_name}
          </ListGroup.Item>
          <ListGroup.Item variant="success" id="thisLat">
            Latitude: {this.state.lat}
          </ListGroup.Item>
          <ListGroup.Item variant="info" id="thisLon">
            Longitude: {this.state.lon}
          </ListGroup.Item>
        </ListGroup>

        <div id="map">
          <h2>Map</h2>
          {/* {mapIsDisplaying && ( */}
            <Image
              id="cityMap"
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=10`}
              alt={this.state.city}
            ></Image>
          {/* )} */}
        </div>
        </>
                      }
                      {
                          this.state.showWeather
                          ? <Weather weatherData={this.state.weatherData} cityData={this.state.cityData} />
                          : <></>
                      }
              </Container>
          </>
      )
  }
}

export default Main;








// class Main extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       city: '',
//       cityData: [],
//       map: '',
//       error: false,
//       errorMsg: '',
//       forecast: [],
//       showWeather: false,
//       dateData: '',
//     }
//   }

//   handleCityInput = (ev) => {
//     this.setState({
//       city: ev.target.value
//     })
//   }


//   getCityData = async (ev) => {
//     ev.preventDefault();
//     try {
//       let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`

//       let cityData = await axios.get(url)
      
//       console.log(cityData.data)

//       let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=14`

//       let letResult = await axios.get(mapUrl)
//       // console.log('this is the', letResults.config.url)
//       // this.setState({ map: letResults.config.url })
//       this.setState({ map: mapUrl })
//       console.log(cityData.data[0])
//       this.setState({
//         cityData: cityData.data[0],
//         error: false
//       })
//   this.getWeather()
//     } catch (error) {
//       this.setState({
//         error: true,
//         errorMsg: error.message,
//         showWeather: false,
//       })
//     }

//   }

//   getWeather = async () => {
//     // e.preventDefault();
//     // let cityName = e.target.value
//     // console.log('get weather')
//     try {
  
//     let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`

//     let res = await axios.get(url)
//     console.log(res.data)
//     console.log('HERE')
//     this.setState({
//       forecast: res.data
    
//     })
//     } catch(error){
//       console.error(error.message)
//       console.error(error.captureStackTrace())
//       // TODO: set state with the error boolean and error message
//       // this.setState({
//       // })
//     }
//   }

//   render() {
//     console.log('this.state.weatherData',this.state.weatherData);
//     return (
//       <>
//         <h2>City Data</h2>
//         <form onSubmit={this.getCityData}>
//           <label> Enter in a City name:
//             <input type="text" onInput={this.handleCityInput} />
//           </label>
//           <Button type="submit">Explore!</Button>
//         </form>

//         {
//           this.state.error
//             ? <p>{this.state.errorMsg}</p>
//             : <p>{this.state.cityData.display_name}</p>
//         }
//         <Card>
//           <Card.Text>
//             <ul>
//               <li>City: {this.state.cityData.display_name}</li>
//               <li>Longitude: {this.state.cityData.lon}</li>
//               <li>Latitude: {this.state.cityData.lat}</li>
//               <li>Map: <img src={this.state.map} alt="City Map" /> </li>
//             </ul>
//           </Card.Text>
//         </Card>
//       </>
//     )
//   }
// }

// export default Main;