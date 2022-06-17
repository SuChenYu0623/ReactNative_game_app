import React from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image, ImageBackground, StyleSheet, } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Bombsviews from './Bombsviews';


const bg2_img = './image/bg2.jpg';
const w = Dimensions.get('window').width;

const Step = (props) => {
  return(
    <View>
    {props.status === 'close' 
      ? <ImageBackground style={{width: w/14, height: w/14}} source={require('./image/step1.jpg')}>
          
        </ImageBackground>
      : props.status === 'open'
          ?  <ImageBackground style={{width: w/14, height: w/14}} source={require('./image/step2.jpg')}>
               <Text>{props.number}</Text>
             </ImageBackground>
          : props.status === 'mines' 
              ?  <Image style={{width: w/14, height: w/14}} source={require('./image/step3.jpg')} />
              :  <Image style={{width: w/14, height: w/14}} source={require('./image/step4.jpg')} />
    }
    </View>
  )
}

const RandomNumber = (n) => {
  let arr = [];
  for(let i=1; i<=100; i++){
    arr.push(i);
  }
  let tmp = []; //抽中的
  for(let i=1; i<=n; i++){
    let ran = Math.floor(Math.random() * (arr.length-i));  //隨機 最大arr.length=100 //取index
    tmp.push(arr[ran]);
    let temp = arr[ran];
    arr[ran] = arr[arr.length-1];
    arr[arr.length-1] = temp;
    arr.pop();
  }
  return tmp;
}


class BombsGame extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Bombsviews: Bombsviews,
      mines: [1,2,3, 14,15,16 ,24,25, 41,42,43,44,45,46,47,48,49,50],
      //mines: [1,2,3],
    };
  }

  //排雷
  mining = (id) => {
    console.log('mining')
    const { Bombsviews, mines } = this.state;
    const NewBombsviews = Bombsviews.map((view) => {
      const Newview = view.map((k) => {
        return k.id !== id
                 ? k
                 : mines.includes(k.id) ? {id: k.id, status: 'mines'} : {id: k.id, status: 'open'};
      })
      return Newview;
    })
    this.setState({
        Bombsviews: NewBombsviews,
    })
    this.bomb(id);
  }

  //周圍有幾顆地雷
  getNearIndexes = (index) => {
    //根據排雷的位置(決定他的周圍範圍)
    let minesList = index%10 === 1 
                      ? [index-10, index-9, index, index+1, index+10, index+11]
                      : index%10 === 0 
                          ? [index-11, index-10, index-1, index, index+9, index+10] 
                          : [index-11, index-10, index-9, index-1, index, index+1, index+9, index+10, index+11]  
    const { mines } = this.state;
    let number = 0;
    for(let i=0; i<minesList.length; i++){
      if(mines.includes(minesList[i])){
        number += 1;
      }
    }
    if(index < 1){
      number = -2;
    }
    if(mines.includes(index)){
      number = -1;
    }
    
    return number !== 0 ? number : null;
  }

  //自動開啟周圍的格子
  AutoMiningAround = (index) => {
    const around = this.AutoAround(index);
    const { Bombsviews, mines } = this.state;
    const NewBombsviews = Bombsviews.map((view) => {
      const Newview = view.map((k) => {
        return this.getNearIndexes(index) === null
                 ? around.includes(k.id) !== true ? k : {id: k.id, status: 'open'}
                 : mines.includes(index)
                     ? mines.includes(k.id) ? {id: k.id, status: 'mines'} : {id: k.id, status: 'open'}
                     : k.id === index ? {id: k.id, status: 'open'} : k
      })
      return Newview;
    })
    this.setState({
      Bombsviews: NewBombsviews,      
    })
    this.bomb(index);
    this.WinTheGame(index, NewBombsviews, 'mines');
  }

  //橫向
  AutoRows = (index) => {
    let list = [];
    let left = index-1;
    while(this.getNearIndexes(left) !== -1 && left%10 !== 0){                                         
      list.push(left);
      if(this.getNearIndexes(left) !== null){
        if(this.getNearIndexes(left+1) === null){
          //console.log('break', ' left', left, this.getNearIndexes(left));
          break; 
        }else if(this.getNearIndexes(left-9) === null && (left-9)%10 !== 0){
          break;
        }
      }
      left = left-1;                                                                                                                                                     
    }
    
    //右
    let right = index+1;
    while(this.getNearIndexes(right) !== -1 && right%10 !== 1){
      list.push(right);
      if(this.getNearIndexes(right) !== null){
        if(this.getNearIndexes(right-1) === null ){
          //console.log('1break', ' right', right, this.getNearIndexes(right));
          break; 
        }else if((this.getNearIndexes(right-11) === null || this.getNearIndexes(right-11) === -1) && (right-11)%10 !== 1){
          //console.log('2break', ' right', right, this.getNearIndexes(right));
          break;
        }
      }
      right = right+1;                                                                                                                                                                                              
    }
    return list;
  }

  //直向
  AutoColumns = (index) => {
    let list = [];
    //上
    let top = index-10;
    while(this.getNearIndexes(top) !== -1 && top>0 ){
      list.push(top);
      if(this.getNearIndexes(top) !== null){
        break;
      }
      top = top-10;                                                                                                                                                                                                                                           
    }
    //下
    let bottom = index+10;
    while(this.getNearIndexes(bottom) !== -1 && bottom<100 ){
      list.push(bottom);
      if(this.getNearIndexes(bottom) !== null){
        break;
      }
      bottom = bottom+10;                                                                                                                                                                                                                                           
    }
    return list;
  }

  AutoAround = (index) => {
    let columns = this.AutoColumns(index);
    columns.push(index);
    let rows = [];
    let around = [];
    columns.map((column) => {
      around.push(column);
    })
    for(let i=0; i<columns.length; i++){
      rows = this.AutoRows(columns[i]);
      rows.map((row) => {
        around.push(row);
      })
    }
    //因為sort是根據ASCII的編碼排列，因此數字排列需另外調整。
    around.sort(function (a, b) {
      return a - b
    });
    //console.log(around)
    return around;
  }


  //贏了
  WinTheGame = (index, NewBombsviews, key) => {
    const { mines} = this.state;
    console.log(index);
    
    if(mines.includes(index) && key === 'mines'){
      console.log('return')
      return
    }
    for(let i=0; i<NewBombsviews.length; i++){
      //回傳k
      for(let j=0; j<NewBombsviews[i].length; j++){
        if(NewBombsviews[i][j].status === 'close'){
          console.log('close')
          return;
        }
      }
    }
    console.log('win')
    alert('Bombs have been dismantled !!!\nYou win the game !!!')
  }

  //插旗
  flag = (index) => {
    console.log('flag')
    const { Bombsviews, } = this.state;
    const NewBombsviews = Bombsviews.map((view) => {
      const Newview = view.map((k) => {
        return k.id !== index 
                 ? k
                 : {id: k.id, status: 'flag'};
      })
      return Newview;
    })
    this.setState({
      Bombsviews: NewBombsviews,
    })
    //this.bomb(index);
    this.WinTheGame(index, NewBombsviews, 'flag');
  }

  //被炸死
  bomb = (index) => {
    const { mines } = this.state;
    if(mines.includes(index)){
      alert('Bombs have exploded !\nYou lose the game !!!');
    }
  }

  ResetBtn = () => {
    let arr = RandomNumber(10);
    console.log(arr)
    this.setState({
      Bombsviews: Bombsviews,
      mines: arr,
    })
  }

  handlePop = (key) => {
    Actions.popTo(key);
  }


  render(){ 
    const { Bombsviews, } = this.state;
    return(
      <ImageBackground style={styles.background} source={require(bg2_img)} >
        <View style={styles.AllView}>
          <TouchableOpacity onPress={() => this.ResetBtn()}>
            <ImageBackground style={styles.resetTouch} source={require('./image/step1.jpg')}>
              <Image style={styles.resetImage} source={require('./image/smile.jpg')} />
            </ImageBackground>
          </TouchableOpacity>

          <View>
            {Bombsviews.map((view, index) => (
                <View key={index} style={{flexDirection: 'row',}}>
                {view.map((k) => (
                    <TouchableOpacity style={{borderWidth: 1, borderColor: 'gray'}} onPress={() => this.AutoMiningAround(k.id)} onLongPress={() => this.flag(k.id)} disabled={k.status === 'close' ? false : true}>
                        <Step key={k.id} status={k.status} number={this.getNearIndexes(k.id)} id={k.id}/>
                    </TouchableOpacity>
                ))}
                </View>
            ))}
          </View>
          <TouchableOpacity style={styles.btnTouch} onPress={() => this.handlePop('Home')}>
            <Text style={styles.btnText}>返回首頁</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

export default BombsGame;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-80,
  },
  AllView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  resetTouch: {
    backgroundColor: '#7f7b7a',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 2
  },
  resetImage: {
    width: 60,
    height: 60,
  },

  btnTouch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#5B5B5B',
    width: 100,
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