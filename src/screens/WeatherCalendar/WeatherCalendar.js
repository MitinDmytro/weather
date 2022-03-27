import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, SectionList, ImageBackground, Button } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Moment from 'moment';
import { Calendar } from 'react-native-calendario';
import styles from './WeatherCalendar.style.js';
import { getFiveDaysForecast } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const { height } = Dimensions.get('window');

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export function WeatherCalendarScreen({ navigation }) {
    const [weatherList, setForecast] = useState([]);
    const { weatherData } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    var currentDate = new Date();
    var numberOfDaysToAdd = 5;
    var endDate = currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    useEffect(() => {
      dispatch(getFiveDaysForecast());

      if(weatherData) {
        weatherData.map(item => Moment(item.dt_txt).format("DD/MM/YY HH:mm"));
        var filteredWeatherData = [];
        for (let i = 0; i < weatherData.length; i++) {
          filteredWeatherData.push({ 
            title: Moment(weatherData[i].dt_txt).format("DD/MM/YY HH:mm"),
            data: [
              "Temp: " + weatherData[i].main.temp,
              "Feels like: " + weatherData[i].main.feels_like,
              "Visibility: " + weatherData[i].visibility,
              "Wind Speed: " + weatherData[i].wind.speed
            ]});
        }
        setForecast(filteredWeatherData);
      }
    }, []);

    return (
      <ImageBackground source={require('./../../assets/images/weather-background-day.png')} style={styles.imageBackground}>
        <View>
        <View style={styles.margin}>
          <Text center style={styles.screenTitle}>Weather Calendar</Text>
          <Calendar
            locale="en"
            initialListSize={1}
            onPress={() => navigation.navigate('WeatherDetailsScreen')}
            minDate={new Date()}
            startDate={new Date()}
            endDate={new Date(endDate)}
            disableRange={true}
            numberOfMonths={1}
            disableOffsetDays={true}
            disabledDays={true}
            theme={{
              monthTitleTextStyle: styles.monthTitleTextStyle,
              emptyMonthTextStyle: styles.emptyMonthTextStyle,
              weekColumnStyle: styles.weekColumnStyle,
              weekColumnTextStyle: styles.weekColumnTextStyle,
              dayTextStyle: styles.dayTextStyle,
              todayTextStyle: styles.todayTextStyle,
              activeDayContainerStyle: styles.activeDayContainerStyle,
              activeDayTextStyle: styles.activeDayTextStyle
            }}
          />
        </View>
        <Button style={styles.button} title="Show bottom sheet menu" onPress={() => this.RBSheet.open()}></Button>
        <View row>
          <RBSheet
            ref={(ref) => {
              this.RBSheet = ref;
            }}
            height={height / 1.5}
            openDuration={100}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              container: styles.bottomSheetContainer
            }}>
            {
              <SectionList
               sections={weatherList}
               keyExtractor={(item, index) => item + index}
               renderItem={({ item }) => <Item title={item} />}
               renderSectionHeader={({ section: { title } }) => (
                 <Text style={styles.header}>{title}</Text>
               )}
             />
            }
          </RBSheet>
          </View>
        </View>
      </ImageBackground>
    );
  }