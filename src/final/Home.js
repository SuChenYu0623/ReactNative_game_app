import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }
  handleAction = (key) => {
    Actions.push(key);
  }
  render(){
    console.log('Home')
    return(
      <ImageBackground style={styles.background} source={require('./image/bgHome.jpg')}>
        <View style={styles.AllView}>
          <TouchableOpacity style={styles.btnGreenTouch} onPress={() => this.handleAction('SnakeHome')}>
            <Text style={styles.btnText}>1. 貪吃蛇</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnGrayTouch} onPress={() => this.handleAction('BombsHome')}>
            <Text style={styles.btnText}>2. 踩地雷</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-80,
  },
  AllView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  btnGreenTouch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'green',
    width: 200,
    height: 50,
    borderWidth: 3,
    borderColor: 'rgba(170,213,90,0.9)',
    borderRadius: 5,
    marginTop: 20,
  },
  btnGrayTouch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5B5B5B',
    width: 200,
    height: 50,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 40,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
})