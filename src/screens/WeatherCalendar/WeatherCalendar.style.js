import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    fontSize: 32,
    backgroundColor: "#03b6fc",
    fontFamily: "RobotoCondensedBold",
    borderRadius: 5
  },
  calendarContainer: {
    margin: 20,
    justifyContent: "center"
  },
  item: {
    padding: 20,
    marginVertical: 8
  },
  title: {
    fontSize: 24,
    color: '#282828'
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
  dayTextStyle: {
    color: '#282828',
    fontWeight: '700',
    fontSize: 15
  },
  weekColumnTextStyle: {
    color: '#282828',
    fontSize: 13
  },
  weekColumnStyle: {
    paddingVertical: 10
  },
  todayTextStyle: {
    color: '#6d95da'
  },
  activeDayContainerStyle: {
    backgroundColor: '#6d95da'
  },
  activeDayTextStyle: {
    color: 'white'
  },
  monthTitleTextStyle: { 
    color: '#282828',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: "RobotoCondensedBold"
  },
  emptyMonthTextStyle: {
    fontWeight: '700'
  },
  bottomSheetContainer: {
    justifyContent: "space-between",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  button: {
    backgroundColor: "#6495ED",
    borderRadius: 8,
    alignSelf: "center"
  },
  buttonText: {
    color: "#FFF"
  }
});