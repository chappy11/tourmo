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
import { useIsFocused } from '@react-navigation/native'
import ReviewComp from './review/ReviewComp'
const Home = ({ navigation,route }) => {
  const isFocus = useIsFocused();
  const {count} = React.useContext(NotifContext);
  const {getnotif} = React.useContext(AuthContext);
  const [location, setlocation] = React.useState({
    latitude: 0,
    longitude:0
  });
  const [data, setdata] = React.useState([]);
  console.log("GGGG",count)
  React.useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      setlocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    },error =>console.log(error),{
      enableHighAccuracy:false,
      timeout:2000,
      maximumAge:3600000
    })
    getnotif();
  },[isFocus])

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
            <View style={{paddingTop:15,}}>
        <Image source={{uri:ip+item.pic1}} style={{width:'100%',height:300}} resizeMode='contain'/>
      </View>
      <View style={style.descContainer}>  
          {/* <ReviewComp motor_id={item.motor_id}/> */}
          <Title style={{fontWeight:'bold',color:Color.color1}}>{item.name}</Title>
          <Text style={{color:"white",fontSize:18}}>{`\u20B1${item.rate}`}</Text>
          <Text style={{color:'white'}}>{getdistance({latitude:item.latitude,longitude:item.longitude})} km</Text>
        </View>
      </View>
    </TouchableOpacity>
  )


  return (

  
   <RNscreen>
      <View style={style.container}>
          <Title style={{padding:20,color:'white'}}>Tourmo</Title>
          <View style={style.container2}>
                <FlatList
              data={data}
              style={{flex:1,}}
              keyExtractor={(val,i)=>i.toString()}
              renderItem={renderItem}
            />    
          </View>
      </View>
      {/* <View style={{height:80,backgroundColor:Color.primary,justifyContent:'center',flexDirection:'row'}}>
        
      </View>
      <FlatList
        data={data}
        style={{flex:1,}}
        keyExtractor={(val,i)=>i.toString()}
        renderItem={renderItem}
       /> */}
     </RNscreen>
  )
}

export default Home;


const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Color.color2
  },
  container2:{
    backgroundColor:'white',
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    flex:1
  },
  itemContainer: {
    padding: 0,
    marginVertical:10,
    marginHorizontal:20,
    backgroundColor: 'lightgray', 
    marginVertical: 5,
    borderRadius:5,
    
  },
  motorImage: {
    width: '100%',
    height: '10%',
    
  },
  descContainer: {
    marginTop:10,
    paddingHorizontal: 20,
    paddingVertical:10,
    backgroundColor:Color.color2,
    borderRadius:20,
    margin:10
  }
  
})