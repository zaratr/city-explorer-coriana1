import React from 'react';

class Weather extends React.Component {
    render() {
        console.log(this.props.weatherData[0].description);
        return (
            <>
                <h2> On {this.props.weatherData[0].date} the weather will be {this.props.weatherData[0].description}. </h2>
            </>
        )
    }
}

export default Weather;