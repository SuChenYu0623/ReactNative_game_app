import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Alert, ImageBackground, StyleSheet,} from 'react-native';
import { Actions } from 'react-native-router-flux';
import views from './views';

const white_img = './image/white.jpg';
const snakehead_img = './image/snake_head2.jpg';
const snakebody_img = './image/snake_body.jpg';
const random_img = './image/apple_w.jpg';
const bg1_img = './image/bg1.jpg';

const apple_img = './image/apple.jpg';
const snake1_img = './image/snake1.jpg';
const btnUp_img = './image/btnUp.jpg';
const btnLeft_img = './image/btnLeft.jpg';
const btnRight_img = './image/btnRight.jpg';
const btnBottom_img = './image/btnBottom.jpg';


const w = Dimensions.get('window').width;

const WhiteView = () => {
  return(
    <View style={{borderWidth: 1,}}>
      <Image style={styles.viewImage} source={require(white_img)} />
    </View>
  )
}
const SnakeBody = () => {
  return(
    <View style={{borderWidth: 1,}}>
      <Image style={styles.viewImage} source={require(snakebody_img)} />
    </View>
  )
}
const RandomView = () => {
  return(
    <View style={{borderWidth: 1,}}>
      <Image style={styles.viewImage} source={require(random_img)} />
    </View>
  )
}
const SnakeHead = () => {
  return(
    <View style={{borderWidth: 1,}}>
      <Image style={styles.viewImage} source={require(snakehead_img)} />
    </View>
  )
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

export default class SnakeGame extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      views: views,
      snake: [1,2,3,4],
      snake_head: 4,
      snake_d: [1,1,1,1],
      d: 1,
      random: 8,

      //兩側邊界
      dieLeft: [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],
      dieRight: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

      date: new Date(),
      datas: [{name: null, score: 0, time: new Date}], //排行榜的資料
    };
  }

  StartBtn = () => {
    console.log('start');
    this.timerId = setInterval(() => {
      let { snake, snake_d, d, random, dieLeft, dieRight } = this.state;
      //更改snake_d
      snake_d.shift(); //移除第一個元素
      snake_d = [...snake_d, d];
      newsnake = new Array(snake.length);
      for(let i=0; i<snake.length; i++){
        newsnake[i] = snake[i] + snake_d[i];
      }
      
      //碰到random
      let newId = newsnake[newsnake.length-1];
      if(newId === random){
        newsnake = [ snake[0], ...newsnake];
        snake_d = [ snake_d[0], ...snake_d];
        //產生新的隨機
        random = getRandomInt(49);
        if(snake.includes(random)){
          random += 5;
        }
      }

      if( (dieLeft.includes(snake[snake.length-1]) && d === -1) || 
          (dieRight.includes(snake[snake.length-1]) && d === 1) || 
          (snake[snake.length-1]>100 && d === 10) || (snake[snake.length-1]<0 && d === -10) ){
        this.StopBtn();
        this.checkagain();
      }

      this.setState({
        date: new Date(),
        snake: newsnake,
        snake_d: snake_d,
        random: random,
        snake_head: newId,
      })
    }, 1000);
  }

  StopBtn = () => {
    console.log('stop');
    window.clearInterval(this.timerId);
    
  }

  ResetBtn = () => {
    console.log('reset');
    this.StopBtn();
    this.setState({
      snake: [1,2,3,4],
      snake_head: 4,
      snake_d: [1,1,1,1],
      d: 1,
      random: 8,
    })
  }

  ModifyDirection = (d) => {
    if(this.state.d !== -d){
      this.setState({ d: d })
    }
  }

  checkagain = () => {
    Alert.alert('提示', '是否要新增遊戲紀錄', 
      [ { text: '取消', onPress: () => alert('已取消!') },
        { text: '確定', onPress: () => this.handleActionSnakeForm() },
      ],
    )
  }

  handleActionSnakeForm = () => {
    Actions.push('SnakeForm', {len: this.state.snake.length, datas: this.state.datas, handleAddData: this.handleAddData});
  }

  handleAddData = (data) => {
    const { datas } = this.state;
    console.log(datas)
    if(datas[0].name === null){
      this.setState({
        datas: [data],
      })
    }else{
      this.setState({
        datas: [...datas, data],
      })
    }
  }

  handleActionLB = () => {
    const { datas } = this.state;
    Actions.push('SnakeLeaderboard', {datas: datas});
  }




  render() {
    const { random, snake_head, snake } = this.state;
    return(
      <ImageBackground source={require(bg1_img)} style={styles.background}>
        <View style={styles.AllView}>

          <View style={styles.titleView}>
            <View style={styles.scoreView}>
              <Image source={require(apple_img)} style={styles.appleImage} />
              <Text style={styles.scoreText}>{snake.length-4}</Text>
            </View>
            <View style={styles.snakeView}>
              <Image source={require(snake1_img)} style={styles.appleImage} />
              <Text style={styles.scoreText}>{snake.length}</Text>
            </View>
            <View style={styles.timeView}>
              <Text style={styles.timeText}>{this.state.date.toLocaleTimeString()}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row',}}>
            <View>
              {this.state.views.map((view, index) => (
                <View key={index} style={{flexDirection: 'row',}}>
                  {view.map((k) => (
                    this.state.snake.includes(k) !== true 
                      ? k !== random ? <WhiteView key={k} /> : <RandomView key={k} />
                      : k !== snake_head ? <SnakeBody key={k} /> : <SnakeHead key={k} />
                  ))}
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.LBTouch} onPress={() => this.handleActionLB()}>
              <Text style={styles.LBText}>遊</Text>
              <Text style={styles.LBText}>戲</Text>
              <Text style={styles.LBText}>記</Text>
              <Text style={styles.LBText}>錄</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gameBtnView}>
            <TouchableOpacity style={[styles.gameTouch, {backgroundColor: 'red'}]} onPress={() => this.StartBtn()}>
              <Text style={styles.gameBtnText}>遊戲開始</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.gameTouch, {backgroundColor: 'blue'}]} onPress={() => this.StopBtn() }>
              <Text style={styles.gameBtnText}>遊戲停止</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.gameTouch, {backgroundColor: 'green'}]} onPress={() => this.ResetBtn() }>
              <Text style={styles.gameBtnText}>遊戲重置</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.btnTouch} onPress={() => this.ModifyDirection(-10)}>
              <Image style={styles.btnImage} source={require(btnUp_img)} />
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.btnTouch} onPress={() => this.ModifyDirection(-1)}>
                <Image style={styles.btnImage} source={require(btnLeft_img)} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnTouch} onPress={() => this.ModifyDirection(1)}>
                <Image style={styles.btnImage} source={require(btnRight_img)} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnTouch} onPress={() => this.ModifyDirection(10) }>
              <Image style={styles.btnImage} source={require(btnBottom_img)} />
            </TouchableOpacity>
          </View>
          
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
  AllView: {
    alignItems: 'center', 
    flex: 1,
  },

  titleView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(170,213,90,0.9)',
    width: 60,
    height: 30,
    borderRadius: 5,
  },
  appleImage: {
    width: 20,
    height: 20,
  },
  scoreText: {
    fontSize: 20,
    color: 'white',
  },
  snakeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(170,213,90,0.9)',
    width: 100,
    height: 30,
    borderRadius: 5,
    marginRight: 50,
    marginLeft: 50,
  },
  snakeImage: {
    width: 200,
    height: 20,
    resizeMode: 'contain',
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(170,213,90,0.9)',
    width: 100,
    height: 30,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 15,
    color: 'white',
  },

  

  LBTouch: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: -50,
    backgroundColor: 'rgba(170,213,90,0.9)',
    width: 30,
    height: 100,
    borderRadius: 5,
  },
  LBText: {
    fontSize: 20,
    marginBottom: -6,
  },


  gameBtnView: {
    flexDirection: 'row', 
    marginTop: 10,
  },
  gameBtnText: {
    fontSize: 15,
    color: 'white',
  },  
  gameTouch: {
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    elevation: 12,  //陰影
    marginLeft: 5,
    marginRight: 5,
  },

  btnTouch: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#50a2da',
    padding: 10,
    borderRadius: 20,
    borderStyle: "solid",
    justifyContent: 'space-evenly',
    elevation: 12,  //陰影

    marginTop: 10,
    marginRight: 30,
    marginLeft: 30,
  },
  btnImage: {
    width: 30,
    height: 30,
  },

  

  viewImage: {
    width: w/18,
    height: w/18,
  }

})
