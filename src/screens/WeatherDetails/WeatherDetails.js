import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import styles from './WeatherDetails.style.js';
import GlobalStyle from '../../utils/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentForecast } from '../../redux/actions';

export function WeatherDetailsScreen({ route, navigation }) {
    const { weatherData } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCurrentForecast());
    }, []);

    return (
      <View style={styles.alignCenter}>
        <ImageBackground source={require('./../../assets/images/weather-background.png')} style={styles.imageBackground}>
          <Text style={styles.city}>{weatherData.name}</Text>
          {
            weatherData.main && 
            <View>
              <View style={GlobalStyle.row}>
                <Image source={require("./../../assets/images/thermometer.png")} style={styles.image} />
                <Text style={styles.text}>Temp: {weatherData.main.temp}</Text>
              </View>
              <Text style={styles.text}>Feels like: { weatherData.main.feels_like }</Text>
            </View>
          }
          {
            weatherData.wind &&
            <View>
              <Text style={styles.text}>Wind: { weatherData.wind.speed }</Text>
            </View>
          }
        </ImageBackground>
      </View>
    );
}