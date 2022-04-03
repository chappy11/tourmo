import React from 'react'
import Screen from '../components/Screen';
import {FlatList,StyleSheet,View,Text,TouchableOpacity} from 'react-native'


const Dashboard = ({navigation}) =>{
    
    const renderItem = ({item,i}) =>(
        <TouchableOpacity key={i} onPress={()=>navigation.navigate(item.link)}>
        <View style={style.item}>
            <Text style={{textAlign:'center'}}>{item.name}</Text>
        </View>
        </TouchableOpacity>
    )
    return(
        
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
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
        height:150,
        flexDirection:'column',
        alignItems:'center'
    }  
})

const navlist = [
    {
        name:"Vehicle Managment",
        image:"",
        link:"Vehicle"
    },
    {
        name:"Transaction History",
        image:""
    },
    {
        name:"Bookings",
        image:"",
    },
    {
        name:"My Bookings",
        image:"",
    }
]