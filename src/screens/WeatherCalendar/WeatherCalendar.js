import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, SectionList, ImageBackground, Button } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import Moment from 'moment';
import { Calendar } from 'react-native-calendario';
import styles from './WeatherCalendar.style.js';

const { height } = Dimensions.get('window');
const options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
  params: {
    q: 'London,uk'
  },
  headers: {
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
    'X-RapidAPI-Key': '2c26297f5cmshdaf04b35158335bp1cb966jsne82ef5cde189'
  }
};

const WeatherData = [
  {
    title: Moment().format("DD/MM/YY HH:mm"),
    data: ["Temp: 41.88, Pressure: 1031, Wind speed: 3.44"]
  },
  {
    title: Moment().format("DD/MM/YY HH:mm"),
    data: ["Temp: 51, Pressure: 1031, Wind speed: 3.44"]
  },
  {
    title: Moment().format("DD/MM/YY HH:mm"),
    data: ["Temp: 61, Pressure: 1031, Wind speed: 4"]
  },
  {
    title: Moment().format("DD/MM/YY HH:mm"),
    data: ["Temp: 71, Pressure: 1031, Wind speed: 5"]
  },
  {
    title: Moment().format("DD/MM/YY HH:mm"),
    data: ["Temp: 81, Pressure: 931, Wind speed: 6"]
  }
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export function WeatherCalendarScreen({ navigation }) {
    const [weatherList, setWeather] = useState("");

    var currentDate = new Date();
    var numberOfDaysToAdd = 5;
    var endDate = currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    // React.useEffect(() => {
    //   axios.request(options).then(function (response) {
    //     if(response && response.data) {
    //       setWeather(response.data.list);
    //     }
    //   }).catch(function (error) {
    //     console.error(error);
    //   });
    // }, []);

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
              container: {
                justifyContent: "space-between",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                padding: 20
              },
            }}>
            {
              <SectionList
                sections={WeatherData}
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