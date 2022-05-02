import React from "react";
import RNscreen from "../../components/RNscreen";
import {Text,FlatList,StyleSheet,Image,View,TouchableOpacity} from 'react-native';
import { UserContext } from "../../context/Context";
import API,{ip} from "../../endpoints/API";
import { Avatar, Headline, Title } from "react-native-paper";
export const Listofbookings = ({navigation}) =>{
    const {user} = React.useContext(UserContext);
    const [data,setdata] = React.useState([]);
    React.useLayoutEffect(()=>{
        getdata();
    },[navigation])
    const getdata = async()=>{
        let res =  await API.gelistofbookings(user.user_id);
        if(res.status == 1){
            setdata(res.data)
        }
    }

    const renderItem = ({item}) =>(
        <TouchableOpacity onPress={()=>navigation.push("View Booking",item)}>
        <View style={style.renderItem}>
            <Avatar.Image source={{uri:ip+item.user_pic}} size={100}/>
            <View style={{marginLeft:10}}>
                <Title>{item.firstname+" "+item.middlename+" "+item.lastname}</Title>
                <Text>{"No. Days: "+ item.no_days}</Text>
                <Text>{"Total Amount: "+ item.total_amount}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
    
    return (
        <RNscreen>
            
            <FlatList
                data={data}
                keyExtractor={(val,i) => i.toString()}
                renderItem={renderItem}
          />           
        </RNscreen>
    );
}

const style = StyleSheet.create({
    renderItem:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'lightgray',
        padding:10
    }
})