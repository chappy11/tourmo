import { View, Text, StyleSheet,Image,ScrollView } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { Color } from '../utils/Themes'
import { Headline, Title } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { Button } from '../components/Button'
import RNscreen from '../components/RNscreen'
import { ip } from '../endpoints/API'
import Swiper from 'react-native-swiper'
import { UserContext } from '../context/Context'
import API from '../endpoints/API';
const ViewMotor = ({ navigation, route }) => {
    const data = route.params.item;
    const { id,isVer } = React.useContext(UserContext);
    const [isDisabled, setisDisabled ] = React.useState(false);
    console.log(route.params);
    React.useEffect(() => {
        check();
    },[])

    const check = async() => {
        let isRent = "";
        let resp = await API.getprofile(id);
        isRent = resp.data[0].isRent;
        if (id == data.user_id || isRent == 1 || isVer == 0) {
            setisDisabled(true);
        }
        
    }


    return (
        <RNscreen>
         <ScrollView style={{flex:1}}>
                <View style={style.container}>
                    <Swiper style={{height:300}}>
                        <Image source={{ uri: ip + data.pic1 }} style={{ width: '100%', height: 200 }} resizeMode='contain' />
                        <Image source={{ uri: ip + data.pic2 }} style={{ width: '100%', height: 200 }} resizeMode='contain' />
                        <Image source={{uri:ip+data.pic3}} style={{width:'100%',height:200}} resizeMode='contain' />
                        <Image source={{ uri: ip + data.offRec }} style={{ width: '100%', height: 200 }} resizeMode='contain' />
                          <Image source={{uri:ip+data.certReg}} style={{width:'100%',height:200}} resizeMode='contain' />
                    </Swiper>
                   
                        <View style={style.textContainer}>
                            <Headline>{data.name}</Headline>
                        <Text style={{ color: Color.secondary,fontSize:18 }}>{`\u20B1 ${data.rate}`}</Text>
                        </View>
                </View>
                   <View style={style.container}>
                    <View style={style.textContainer}>  
                        <Title>Owner</Title>
                        <Image source={{uri:ip+data.user_pic}} style={{width:100,height:100,alignSelf:'center'}}/>
                        <Headline style={{ textAlign: 'center' }}>{data.firstname + " " + data.middlename + " " + data.lastname }</Headline>
                    </View>
                   
                </View>
                    <View style={style.container}>
                    <MapView
                        style={style.map}
                        region={{
                            latitude: parseFloat(data.latitude),
                            longitude: parseFloat(data.longitude),
                            latitudeDelta: 0.001,
                            longitudeDelta:0.0010,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }}
                        />
                       
                    </MapView>
                </View>
                <View style={style.container}>
                    <Button name="Rent this Vehicle" disabled={isDisabled ? true : false} color={Color.primary} mode='contained' onPress={() => navigation.navigate('Create Transaction', { data })}/>
                </View>
 
        </ScrollView>
    </RNscreen>
  )
}

export default ViewMotor

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    textContainer: {
        padding: 20,
        display: 'flex'
    },
    map: {
        height: 300,
        width:'100%'
    }
})