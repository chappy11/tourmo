import React from 'react';
import RNscreen from '../../components/RNscreen';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import { Color } from '../../utils/Themes';
import { Avatar, Card, Headline, Subheading, Title } from 'react-native-paper';
import API from '../../endpoints/API';
import { UserContext } from '../../context/Context';
const Ongoing = ({navigation}) =>{
    const {id} = React.useContext(UserContext);
    const [list,setlist] = React.useState([]);
    
    React.useEffect(()=>{
        getdata();
    },[])
    
    const getdata = async() =>{
        try{
            let resp =  await API.ongoing(id);
            console.log(resp);
            if(resp.status == 1){
                setlist(resp.data);
            }else{
                setlist([])
            }
        }catch(e){
            console.log(e)
        }
    }


    const renderitem = ({item}) =>(
        <TouchableOpacity style={{marginHorizontal:20}} onPress={()=>navigation.navigate("Confirm Return",{item})}>
            
            <Card mode='outlined' style={{padding:15,elevation:5} }>
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
       <RNscreen>
           <View style={style.container}>
                <Headline style={style.headline}>On Going</Headline>
                <View style={style.container2}>
                    <FlatList 
                        data={list}
                        keyExtractor={(item,i) => i.toString()}
                        renderItem={renderitem}
                        style={{marginTop:20}}
                    />
                </View>
           </View>
       </RNscreen> 
    );
}

export default Ongoing;

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.color2
    },
    container2:{
        backgroundColor:'white',
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        flex:1,
    },
    headline:{
        color:'white',
        fontWeight:'bold',
        padding:20
    },
    render:{
        marginVertical:10,
        marginHorizontal:20,
        borderWidth:1,
        borderColor:'lightgray',
        padding:10,
        borderRadius:10
    },
    circle:{
        height:15,
        width:15,
        borderRadius:100,
        backgroundColor:'green'
    }
})