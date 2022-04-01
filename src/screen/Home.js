import { View, Text,FlatList, StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import MapView from 'react-native-maps'
import { motors } from '../../data/motor'
import { Color } from '../utils/Themes'
import { Headline, Title } from 'react-native-paper'


const Home = ({navigation}) => {
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('View Motor', {item})}>
    <View style={style.itemContainer}>
      <View >
        <Image source={item.motorImg} style={{width:'100%',height:200}}/>
      </View>
      <View style={style.descContainer}>  
          <Title>{item.motorname}</Title>
          <Text>{item.distance + "km"}</Text>
        <Text style={{color:Color.secondary,fontSize:20}}>{`\u20B1${item.rate}`}</Text>
      </View>
      </View>
    </TouchableOpacity>
  )


  return (
      <Screen style={{backgroundColor:'whitesmoke'}}>
      <View style={{height:80,backgroundColor:Color.primary,justifyContent:'center'}}>
        <Headline style={{marginLeft:20,fontWeight:'bold'}}>Tourmo</Headline>
      </View>
      <FlatList
        data={motors}
        style={{flex:1,}}
        keyExtractor={(val,i)=>i.toString()}
        renderItem={renderItem}
      />
       </Screen>
  )
}

export default Home;

const style = StyleSheet.create({
  itemContainer: {
    padding: 0,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius:20,
  },
  motorImage: {
    width: '100%',
    height: '10%',
    
  },
  descContainer: {
    paddingHorizontal: 20,
    paddingVertical:10
  }
  
})