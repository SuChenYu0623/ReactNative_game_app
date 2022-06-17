import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Router, Stack, Scene, Drawer } from 'react-native-router-flux';

import Home from './Home';
import SnakeHome from './SnakeHome';
import BombsHome from './BombsHome';
import SnakeLeaderboard from './SnakeLeaderboard';
import SnakeForm from './SnakeForm';

import SnakeGame from './SnakeGame';

import BombsGame from './BombsGame';

class App extends React.Component{
  render(){
    return(
        <Router>
          <Stack key="root" headerLayoutPreset="center">
            <Scene key="Home" component={Home} title="遊戲首頁" initial/>
            <Scene key="SnakeHome" component={SnakeHome} title="貪吃蛇首頁"/>
            <Scene key="BombsHome" component={BombsHome} title="踩地雷首頁"/>
            <Scene key="SnakeLeaderboard" component={SnakeLeaderboard} title="貪吃蛇遊戲紀錄"/>
            <Scene key="SnakeForm" component={SnakeForm} title="輸入遊戲紀錄"/>

            <Scene key="SnakeGame" component={SnakeGame} title="貪吃蛇"/>
            <Scene key="BombsGame" component={BombsGame} title="踩地雷"/>
          </Stack>
        </Router>
      
    )
  }
}

export default App;
