import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, SectionList, ImageBackground } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Moment from 'moment';
import { Calendar } from 'react-native-calendario';
import styles from './WeatherCalendar.style.js';
import { getFiveDaysForecast } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';

const { height } = Dimensions.get('window');

interface WeatherData {
  title: string;
  data: Array<string>;
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function showBottomSheetMenu() {
  try {
    this.RBSheet.open();

  } catch (error) {
    console.log(error)
  }
}

export function WeatherCalendarScreen({ route, navigation }) {
    const [weatherList, setForecast] = useState<WeatherData[]>([]);
    const { weatherData } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    var currentDate = new Date();
    var numberOfDaysToAdd = 5;
    var endDate = currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    useEffect(() => {
      var filteredWeatherData: WeatherData[] = [];
      if(weatherData) {
        for (let i = 0; i < weatherData.length; i++) {
          filteredWeatherData.push({
            title: Moment(weatherData[i].dt_txt).format("DD/MM/YY HH:mm"),
            data: [
              "Temp: " + weatherData[i].main.temp,
              "Feels like: " + weatherData[i].main.feels_like,
              "Visibility: " + weatherData[i].visibility,
              "Wind Speed: " + weatherData[i].wind.speed
            ]
          });
        }
        setForecast(filteredWeatherData);
      }
    }, [weatherData]);

    return (
      <ImageBackground source={require('./../../assets/images/weather-background-day.png')} style={styles.imageBackground}>
        <View>
          <View style={styles.calendarContainer}>
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

            <Button text="Show bottom sheet menu"
              buttonCustomStyles={styles.button}
              textCustomStyles={styles.buttonText} 
              onClick={() => {
                dispatch(getFiveDaysForecast())
                showBottomSheetMenu()
              }} />
          </View>

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