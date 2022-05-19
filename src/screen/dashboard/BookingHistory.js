import React from 'react';
import {View,StyleSheet,Text,FlatList,TouchableOpacity} from 'react-native';
import { Card, Title,Avatar,Subheading} from 'react-native-paper';
import { UserContext } from '../../context/Context';
import API from '../../endpoints/API';
import { Color } from '../../utils/Themes';

const BookingHistory = ({navigation}) =>{
    const [list,setlist] = React.useState([]);
    const {id} = React.useContext(UserContext);

    React.useEffect(()=>{
        getdata();
    },[])

    const getdata = async() =>{
        let resp =  await API.booking_history(id);
        console.log(resp)
        if(resp.status == 1){
            setlist(resp.data)
        }
    }


    const renderItem = ({item}) =>(
        <TouchableOpacity style={{marginHorizontal:20}} onPress={()=>navigation.navigate("View Booking History",{item})}>
            
            <Card mode='outlined' style={{padding:15,elevation:5,marginVertical:10} }>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={{fontWeight:'bold',color:'black'}}>
                        <Avatar.Image source={{uri: API.baseUrl+item.user_pic}}/>
                    </Text>
                    <View style={{marginLeft:15}}>
                        <Subheading style={{fontWeight:'bold'}}>{item.firstname + " " + item.middlename + " " + item.lastname}</Subheading>
                        <Subheading>{item.name + " " + item.brand}</Subheading>
                    </View>
                   
                    <View style={{flex:1,alignItems:'flex-end'}}>
                                <View style={style.circle}/>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
    return(
        <View style={style.container}>
            <Title style={{padding:10,color:'white'}}>
                Booking History
            </Title>
            <View style={style.container2}>
                <FlatList
                    data={list}
                    keyExtractor={(val,i) => i.toString()}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
}

export default BookingHistory;

const style = StyleSheet.create({
    container:{
        backgroundColor:Color.color2,
        flex:1,
    },
    container2:{
        backgroundColor:'white',
        flex:1,
        borderTopEndRadius:20,
        borderTopStartRadius:20,
    }
})