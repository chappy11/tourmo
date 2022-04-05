import React from 'react'
import Screen from '../components/Screen';
import {FlatList,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native'


const Dashboard = ({navigation}) =>{
    
    const renderItem = ({item,i}) =>(
        <TouchableOpacity key={i} onPress={()=>navigation.navigate(item.link)}>
            <View style={style.item}>
                <View style={{justifyContent:'center',alignItems:'center',flex:1,}}>
                    <Image source={item.image} style={{width:50,height:50}} resizeMode='contain'/>
                </View>
                    <Text style={{textAlign:'center'}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
    return(
        
    <View style={{flex:1,flexDirection:'column',justifyContent:'center',backgroundColor:'white',alignItems:'center'}}>
          
            <FlatList
            data={navlist}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(val,i)=>i.toString()}
            />
            </View>
        
    );
}

export default Dashboard;

const style= StyleSheet.create({
    item:{
        width:100,
        height:120,
        flexDirection:'column',
        alignItems:'center'
    }  
})

const navlist = [
    {
        name:"Vehicle",
        image:require("../../asset/icon/motorcycle.png"),
        link:"VehicleRoute"
    },
    {
        name:"Transaction History",
        image:require("../../asset/icon/transactionhistory.png")
    },
    {
        name:"Bookings",
        image:require("../../asset/icon/bookings.png"),
    },
    {
        name:"My Bookings",
        image:require("../../asset/icon/mybookings.png"),
    }
]