import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: 'center', 
    width: width
  },
  image: {
    width: 50,
    height: 50
  },
  text: {
    fontSize: 45
  },
  city: {
    fontFamily: "QuartzoBold",
    fontSize: 65
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});