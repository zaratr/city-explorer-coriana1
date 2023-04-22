import React from 'react';
import Header from './components/Header'
// import Main from './components/Main'
import Footer from './components/Footer';
import Weather from './components/Weather';
import Explorer from './components/Explorer.js';
import SpecificForecast  from './components/SpecificForecast';
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends React.Component {
  render(){
    return (
      <>
        <Header />
        <Explorer/>
        <Weather/>
        <SpecificForecast />
        {/* <Main /> */}
        <Footer />
      </>
    )
  }
}

export default App;