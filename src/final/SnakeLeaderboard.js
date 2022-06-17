import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SnakeItem from './SnakeItem';
const w = Dimensions.get('window').width;
const bg1_img = './image/bg1.jpg';

export default class SnakeLeaderboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      datas: [],
    };
  }

  handleAction = (key) => {
    Actions.push(key);
  }
  handlePop = (key) => {
    Actions.popTo(key);
  }
  

  render(){
    console.log(this.props.datas)
    
    return(
      <ImageBackground style={styles.background} source={require(bg1_img)}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{ margin: 20}}>
            {this.props.datas.map((data) => (
              <SnakeItem data={data}/>
            ))}
          </View>
          <TouchableOpacity style={styles.btnTouch} onPress={() => this.handlePop('Home')}>
            <Text style={styles.btnText}>返回首頁</Text>
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
  btnTouch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'green',
    width: 100,
    height: 50,
    borderWidth: 3,
    borderColor: 'rgba(170,213,90,0.9)',
    borderRadius: 5,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  }
})