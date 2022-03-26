import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, StyleSheet } from 'react-native';
import axios from "axios";
import styles from './WeatherDetails.style.js';

const options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
    q: 'London,uk',
    lat: '0',
    lon: '0',
    id: '2172797',
    lang: 'null',
    units: 'imperial',
  },
  headers: {
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key': '2c26297f5cmshdaf04b35158335bp1cb966jsne82ef5cde189'
  }
};

export function WeatherDetailsScreen({ route, navigation }) {
    const [city, setCityName] = useState("");
    const [temp, setTemp] = useState("");
    const [feelslike, setFeelslike] = useState("");
    const [pressure, setPressure] = useState("");
    const [windSpeed, setWindSpeed] = useState("");

    useEffect(() => {
      axios.request(options).then(function (response) {
        if(response && response.data) {
          setCityName(response.data.name);
          setTemp(response.data.main.temp);
          setFeelslike(response.data.main.feelslike);
          setPressure(response.data.main.pressure);
          setWindSpeed(response.data.wind.speed);
        }
      }).catch(function (error) {
        console.error(error);
      });
    }, []);
    
    return (
      <View style={styles.alignCenter}>
        <ImageBackground source={require('./../../assets/images/weather-background.png')} style={styles.imageBackground}>
          <Text style={styles.city}>{city}</Text>
          <View style={styles.row}>
            <Image source={require("./../../assets/images/thermometer.png")} style={styles.image} />
            <Text style={styles.text}>Temp: {temp}</Text>
          </View>
          <View style={styles.row}>
            <Image source={require("./../../assets/images/pressure.png")} style={styles.image} />
            <Text style={styles.text}>Pressure: { pressure }</Text>
          </View>
          <Text style={styles.text}>Wind: { windSpeed }</Text>
          <Text style={styles.text}>Feels like: { feelslike }</Text>
        </ImageBackground>
      </View>
    );
}
