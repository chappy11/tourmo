import { View, Text, StyleSheet,Image,ScrollView } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { Color } from '../utils/Themes'
import { Headline, Title } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { Button } from '../components/Button'

const ViewMotor = ({navigation,route}) => {
    const data = route.params.item
    console.log(route.params);
    return (
      <Screen style={{backgroundColor:'whitesmoke'}}>
            <ScrollView style={{ flex: 1 }}>
                <View style={style.container}>
                      <Image source={data.motorImg} style={{width:'100%',height:200}} />
                        <View style={style.textContainer}>
                            <Headline>{data.motorname}</Headline>
                        <Text style={{ color: Color.secondary,fontSize:18 }}>{`\u20B1 ${data.rate}`}</Text>
                        </View>
                </View>
                <View style={style.container}>
                    <View style={style.textContainer}>  
                        <Title>Owner</Title>
                        <Image source={data.user.user_pic} style={{width:100,height:100,alignSelf:'center'}}/>
                        <Headline style={{ textAlign: 'center' }}>{data.user.name}</Headline>
                    </View>
                   
                </View>
                <View style={style.container}>
                    <MapView
                        style={style.map}
                        region={{
                            latitude: data.coordinate.lat,
                            longitude: data.coordinate.lng,
                            latitudeDelta: 0.001,
                            longitudeDelta:0.0010,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: data.coordinate.lat, longitude: data.coordinate.lng }}
                            
                        />
                       
                    </MapView>
                </View>
                <View style={style.container}>
                    <Button name="Rent this Vehicle" color={Color.primary} mode='contained' onPress={()=>navigation.navigate('Create Transaction',{rate:data.rate})}/>
                </View>
      </ScrollView>
    </Screen>
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