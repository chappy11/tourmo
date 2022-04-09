import { View, Text,FlatList,SafeAreaView,ScrollView,RefreshControl,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import MapView from 'react-native-maps'
import { motors } from '../../data/motor'
import { Color } from '../utils/Themes'
import { Headline, Title } from 'react-native-paper'
import { Button } from '../components/Button'
import { AuthContext } from '../context/Context'
import RNscreen from '../components/RNscreen'


const Home = ({ navigation }) => {
 
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('View Motor', {item})}>
    <View style={style.itemContainer}>
      <View styl>
          
      </View>
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

  
   <RNscreen>
      <View style={{height:80,backgroundColor:Color.primary,justifyContent:'center',flexDirection:'row'}}>
        <Title>Tourmo</Title>
      </View>
      <FlatList
        data={motors}
        style={{flex:1,}}
        keyExtractor={(val,i)=>i.toString()}
        renderItem={renderItem}
       />
     </RNscreen>
  )
}

export default Home;


const style = StyleSheet.create({
  itemContainer: {
    padding: 0,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius:5,
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