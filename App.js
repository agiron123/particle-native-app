import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNEventSource from "react-native-event-source";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
      humidity: "",
      humidityLastUpdated: "",
      ph: "",
      phLastUpdated: "",
      soilMoisture: "",
      soilMoistureLastUpdated: "",
      temperature: "",
      temperatureLastUpdated: ""
    }
  }

  componentDidMount() {
    // Log into the particle Service.
    // Going to need the device id and the event prefix.
    // Here's how we would use Curl to get an event stream from a particle device. 
    //curl "https://api.particle.io/v1/devices/290045000c47363330353437/events?access_token=d4896bb622e6f834893705dcd817f7c477fd3884"
    // Future Work: Be able to add multiple devices and store device settings.

    let eventSource = new RNEventSource("https://api.particle.io/v1/devices/290045000c47363330353437/events?access_token=d4896bb622e6f834893705dcd817f7c477fd3884");
    eventSource.addEventListener('humidity', (data) => {
      let parsed = JSON.parse(data.data);
      this.setState({
        humidity: parsed.data,
        humidityLastUpdated: parsed["published_at"]
      });
    });

    eventSource.addEventListener('PH', (data) => {
      let parsed = JSON.parse(data.data);
      this.setState({
        ph: parsed.data,
        phLastUpdated: parsed["published_at"]
      });
    });

    eventSource.addEventListener('Soil Moisture', (data) => {
      let parsed = JSON.parse(data.data);
      this.setState({
        soilMoisture: parsed.data,
        soilMoistureLastUpdated: parsed["published_at"]
      })
    });

    eventSource.addEventListener('temperature', (data) => {
      let parsed = JSON.parse(data.data);
      this.setState({
        temperature: parsed.data,
        temperatureLastUpdated: parsed["published_at"]
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the GreenHouse App!</Text>

        <Text>Humidity: </Text>
        <Text>{ this.state.humidity}</Text>
        <Text>Last Updated:</Text>
        <Text>{ this.state.humidityLastUpdated }</Text>

        <Text>Soil Moisture</Text>
        <Text>{ this.state.soilMoisture }</Text>
        <Text>Last Updated:</Text>
        <Text>{ this.state.soilMoistureLastUpdated }</Text>

        <Text>Temperature:</Text>
        <Text>{ this.state.temperature }</Text>
        <Text>Last Updated:</Text>
        <Text>{ this.state.temperatureLastUpdated }</Text>

        <Text>PH:</Text>
        <Text>{ this.state.ph }</Text>
        <Text>Last Updated:</Text>
        <Text>{ this.state.phLastUpdated }</Text>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
