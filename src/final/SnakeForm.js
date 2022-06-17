import React from 'react';
import { StyleSheet, View, Switch, TextInput, Picker, Button, Text, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default class SnakeForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      score: this.props.len,
      time: new Date(),
    }
  }

  handleText = (key, text) => {
    this.setState({
      [key]: text,
    })
  }


  handleFormSubmit = () => {
    const { name, score, time } = this.state;
    //回到上一頁面 不知道為什麼要加才會立刻更改state
    
    Actions.pop();
    
    //const meal = { name: name, uri: url, lunch: lunch, dinner: dinner, phone: phone, googleMapURL: googleMapURL};
    const data = {name: name, score: score, time: time};
    console.log(data);
    const { handleAddData } = this.props;
    handleAddData(data);
    //回傳值
    //handleAddMeal(meal);
    this.setState({
      name: '',
      score: 0,
      time: null,
    })
    //Actions.push('SnakeLeaderboard', {datas: [...this.props.datas, data], data: data});
  }

  handlePop = (key) => {
    Actions.popTo(key);
  }


  render(){
    const { name, score } = this.state;
    return(
      <ImageBackground style={styles.background} source={require('./image/bg1.jpg')} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.titleView}>
              <View>
                <Text style={styles.titleText}>名稱</Text>
              </View>
              <View>
                <TextInput
                  value={name}
                  onChangeText={(value) => this.handleText('name', value)}
                  style={styles.textInput}
                />
              </View>
            </View>
          
            <View style={styles.titleView}>
              <Text style={styles.titleText}>蘋果</Text>
              <TextInput
                value={score}
                defaultValue={(score-4).toString()}
                onChangeText={(value) => this.handleText('score', value)}
                style={styles.textInput}
                editable={false}
              />
            </View>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>蛇長</Text>
              <TextInput
                value={score}
                defaultValue={score.toString()}
                onChangeText={(value) => this.handleText('score', value)}
                style={styles.textInput}
                editable={false}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.handleFormSubmit()}>
              <Image style={styles.image} source={require('./image/send.jpg')} />
              <Text style={styles.textTouch}>儲存送出</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.handlePop('Home')}>
              <Image style={styles.image} source={require('./image/return.jpg')} />
              <Text style={styles.textTouch}>返回首頁</Text>
            </TouchableOpacity>
          </View>
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
    //resizeMode: 'stretch',
  },

  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(170,213,90,0.9)',
    width: 300,
    height: 60,
    //borderWidth: 1,
    borderColor: '#006000',
    borderRadius: 20,
    shadowColor: '#006000',
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 1 },
    elevation: 10,
    marginBottom: 5,
    
  },
  
  titleText: {
    fontSize: 20,
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 50,
    fontWeight: 'bold'
  },
  textTouch: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textInput: {
    marginLeft: 10,
    fontSize: 20,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    marginBottom: -5,
    color: 'white',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#006000',
    borderRadius: 15,
    elevation: 10,
    padding: 20,
    marginTop: 10,
    //shadowColor: '#006000',
    //shadowOpacity: 0.9,
    //shadowOffset: { width: 1, height: 1 },
    height: 30,
    width: 150,
  },

});




