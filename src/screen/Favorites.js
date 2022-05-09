import React from "react";
import {View,Text,StyleSheet,FlatList} from 'react-native';
import { Headline, Title } from "react-native-paper";
import RNscreen from "../components/RNscreen";
import { UserContext } from "../context/Context";
import API from "../endpoints/API";
import { Color } from "../utils/Themes";


const Favorite = () =>{
   const [list,setlist] = React.useState([]);
   const {id} = React.useContext(UserContext);

   React.useEffect(()=>{
        getdata();
   },[])

   const getdata = async()=>{
       try{
            let resp = await API.getfav(id);
            console.log(resp);
            if(resp.status == 1){
                setlist(resp.data);
            }else{
                setlist([]);
            }   
       }catch(e){
            console.log(e)
       }
   }

   const renderItem = ({item}) =>(
       <View style={{padding:20,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
            <Title>{item.name}</Title>
       </View>
   );
    return(
        <RNscreen>
            <View style={style.container}>
                <Headline style={{padding:20,color:'white',fontWeight:'bold'}}>Favorites</Headline>
                <View style={style.container2}>
                    <FlatList
                        data={list}
                        keyExtractor={(val,i)=> i.toString()}
                        renderItem={renderItem}      
                    />
                </View>
            </View>
        </RNscreen>
    );
}
export default Favorite;

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.color2
    },
    container2:{
        flex:1,
        backgroundColor:'white',
        borderTopStartRadius:20,
        borderTopEndRadius:20
    }
})