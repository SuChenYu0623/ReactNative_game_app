import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

const bg2_img = './image/bg2.jpg';


export default class BombsHome extends React.Component{
  
  handleAction = (key) => {
    Actions.push(key);
  }

  handlePop = (key) => {
    Actions.popTo(key)
  }

  render(){
    return(
      <ImageBackground style={styles.background} source={require(bg2_img)}>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <View style={styles.titleView}>
            <Text style={styles.btnText}>遊戲目錄</Text>
          </View>
          <TouchableOpacity style={styles.btnTouch} onPress={() => this.handleAction('BombsGame')}>
            <Text style={styles.btnText}>1. 開始遊戲</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTouch} onPress={() => this.handlePop('Home')}>
            <Text style={styles.btnText}>2. 返回首頁</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-80,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5B5B5B',
    width: 200,
    height: 50,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  btnTouch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5B5B5B',
    width: 200,
    height: 50,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
})