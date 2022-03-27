import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WeatherCalendarScreen } from './src/screens/WeatherCalendar/WeatherCalendar';
import { WeatherDetailsScreen } from './src/screens/WeatherDetails/WeatherDetails';
import { Store } from './src/redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Weather Calendar">
          <Stack.Screen name="Weather Calendar" component={WeatherCalendarScreen} />
          <Stack.Screen name="WeatherDetailsScreen" component={WeatherDetailsScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;