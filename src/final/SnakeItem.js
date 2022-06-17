import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SnakeItem = (props) => {
  const { data } = props;
  return(
    <View style={{margin: 10}}>
      <View style={styles.scoreView} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.scoreText}>名稱</Text>
          <Image source={require('./image/name.jpg')} style={styles.appleImage} />
        </View>
        <Text style={styles.scoreText}>{data.name}</Text>
      </View>
      <View style={styles.scoreView} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.scoreText}>成績</Text>
          <Image source={require('./image/apple.jpg')} style={styles.appleImage} />
        </View>
        <Text style={styles.scoreText}>{data.score-4}</Text>
      </View>
      <View style={styles.scoreView} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.scoreText}>蛇長</Text>
          <Image source={require('./image/snake1.jpg')} style={styles.appleImage} />
        </View>
        <Text style={styles.scoreText}>{data.score}</Text>
      </View>
      <View style={styles.scoreView} >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.scoreText}>遊玩時間</Text>
          <Image source={require('./image/time.jpg')} style={styles.appleImage} />
        </View>
        <Text style={styles.scoreText}>{data.time.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(170,213,90,0.9)',
    width: 350,
    height: 30,
    borderWidth: 1,
    borderColor: 'green',
    //borderRadius: 5,
  },
  appleImage: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  scoreText: {
    fontSize: 15,
    color: 'white',
  },
})

export default SnakeItem;