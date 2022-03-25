import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, SectionList, ImageBackground, Button } from 'react-native';
import { Calendar } from 'react-native-calendario';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from "axios";
import Moment from 'moment';

const { width, height } = Dimensions.get('window');
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

const styles = {
  header: {
    fontSize: 32,
    backgroundColor: "#03b6fc",
    fontFamily: "RobotoCondensedBold",
    borderRadius: 5
  },
  margin: {
    margin: 20
  },
  item: {
    padding: 20,
    marginVertical: 8
  },
  title: {
    fontSize: 24
  },
  screenTitle: {
    fontFamily: "QuartzoBold",
    fontSize: 40
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: 'center', 
    width: width
  },
  button: {
    width: 100
  }
}

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
      <ImageBackground source={require('./../assets/images/weather-background-day.png')} style={styles.imageBackground}>
        <View>
        <View style={styles.margin}>
          <Text center style={styles.screenTitle}>Weather Calendar</Text>
          
          <Calendar
            locale="en"
            initialListSize={1}
            onPress={(date) => 
              navigation.navigate('WeatherDetailsScreen', {
                selectedDate: date
              })
            }
            minDate={new Date()}
            startDate={new Date()}
            endDate={new Date(endDate)}
            disableRange={true}
            numberOfMonths={1}
            disableOffsetDays={true}
            disabledDays={true}
            theme={{
              activeDayColor: {},
              monthTitleTextStyle: {
                color: '#282828',
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: "RobotoCondensedBold"
              },
              emptyMonthContainerStyle: {},
              emptyMonthTextStyle: {
                fontWeight: '700',
              },
              weekColumnsContainerStyle: {},
              weekColumnStyle: {
                paddingVertical: 10,
              },
              weekColumnTextStyle: {
                color: '#b6c1cd',
                fontSize: 13,
              },
              nonTouchableDayContainerStyle: {},
              nonTouchableDayTextStyle: {},
              startDateContainerStyle: {},
              endDateContainerStyle: {},
              dayContainerStyle: {},
              dayTextStyle: {
                color: '#2d4150',
                fontWeight: '700',
                fontSize: 15,
              },
              dayOutOfRangeContainerStyle: {},
              dayOutOfRangeTextStyle: {},
              todayContainerStyle: {},
              todayTextStyle: {
                color: '#6d95da',
              },
              activeDayContainerStyle: {
                backgroundColor: '#6d95da',
              },
              activeDayTextStyle: {
                color: 'white',
              },
              nonTouchableLastMonthDayTextStyle: {}
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