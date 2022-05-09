import { View, Text,FlatList,SafeAreaView,ScrollView,RefreshControl,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import MapView from 'react-native-maps'
import { motors } from '../../data/motor'
import { Color } from '../utils/Themes'
import { Headline, Title } from 'react-native-paper'
import { Button } from '../components/Button'
import { AuthContext, NotifContext } from '../context/Context'
import RNscreen from '../components/RNscreen'
import API, { ip } from '../endpoints/API'
import Geolocation from '@react-native-community/geolocation'
import { getDistance } from 'geolib';
const Home = ({ navigation,route }) => {
  const {count} = React.useContext(NotifContext);
  const [location, setlocation] = React.useState({
    latitude: 0,
    longitude:0
  });
  const [data, setdata] = React.useState([]);
  
  React.useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      setlocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    })
    
  },[])

  React.useEffect(()=>{
    getdata();
  },[route,navigation])
  
  const getdata = async () => {
    try {
      let resp = await API.getallpostvehicle();
      console.log("REsp",resp.data);
      if (resp.status == 1) {
        
        setdata(resp.data)
        //console.log("DATA",resp.data);
        }
    } catch (e) {
      console.log(e);
      }
  }

  const getdistance = (coord) => {
    return getDistance(location, coord) / 1000;
  }
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('View Motor', {item})}>
    <View style={style.itemContainer}>
      <View styl>
          
      </View>
      <View >
        <Image source={{uri:ip+item.pic1}} style={{width:'100%',height:300}} resizeMode='contain'/>
      </View>
      <View style={style.descContainer}>  
          <Title>{item.name}</Title>
          {/* <Text>{item.distance + "km"}</Text>
        <Text style={{color:Color.secondary,fontSize:20}}>{`\u20B1${item.rate}`}</Text> */}
          <Text>{getdistance({latitude:item.latitude,longitude:item.longitude})} km</Text>
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
        data={data}
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