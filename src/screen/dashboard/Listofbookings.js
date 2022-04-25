import React from "react";
import RNscreen from "../../components/RNscreen";
import {Text,FlatList,StyleSheet,Image,View} from 'react-native';
import { UserContext } from "../../context/Context";
import API,{ip} from "../../endpoints/API";
import { Avatar } from "react-native-paper";
export const Listofbookings = () =>{
    const {user} = React.useContext(UserContext);
    const [data,setdata] = React.useState([]);
    React.useEffect(()=>{
        getdata();
    },[])
    const getdata = async()=>{
        let res =  await API.gelistofbookings(user.user_id);
        if(res.status == 1){
            setdata(res.data)
        }
    }

    const renderItem = ({item}) =>(
        <View style={style.renderItem}>
            <Avatar.Image source={{uri:ip+item.user_pic}} size={100}/>
            <Text>{item.firstname}</Text>
        </View>
    );
    
    return (
        <RNscreen>
            <Text>Bookings</Text>
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
        width:'100%'
    }
})