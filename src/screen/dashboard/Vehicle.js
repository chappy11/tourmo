import React,{useEffect,useState,useLayoutEffect} from 'react';
import { View, Text, StyleSheet,Alert, ScrollView ,RefreshControl,FlatList,Image,TouchableOpacity} from 'react-native';
import {  Subheading, Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import RNscreen from '../../components/RNscreen';
import Screen from '../../components/Screen';
import { UserContext } from '../../context/Context';
import API from '../../endpoints/API';
import { Color } from '../../utils/Themes';
import Card from '../../components/Card';
import { Button as Rbutton} from 'react-native-paper';
const Vehicle  = ({navigation,route}) =>{
    const { user } = React.useContext(UserContext);
    const [has,sethas] = useState(false)
    const [brand, setbrand] = useState(null);
    const [vehiclelist,setvehiclelist] = useState([]);
    const [refresh,setrefresh] = useState(true)
    useEffect(() => {
         getdata();        
    }, [route,has])
   
    const getdata = async () => {
       try{
                let resp = await API.getmotouristabyuser(user.user_id);
                if (resp.status === 1) {
                    setbrand(resp.data[0]);
                    sethas(true);
                    let res = await API.getvehicle(resp.data[0].m_id);
                    console.log(res.data);
                    setvehiclelist(res.data);

                }else{
                    sethas(false)
                }
       }catch(e){
           console.log(e)
       }
        
    }
   
    const changestatus = () => {
        let status = brand.isActive == 0 ? 1 : 0;
        let payload = {
            mot_id: brand.m_id,
            status: status
        }
        API.changestatus(payload).then(res => {
            if (res.data.status == 1) {
                Alert.alert("Success", res.data.message);
                getdata();
            } else {
                Alert.alert("Error", res.data.message);
            }
        })
    }

    
    const renderItem = ({item,i}) =>(
        <TouchableOpacity onPress={()=>navigation.navigate("View Vehicle",{...item,from:"fromProfile"})}>
       <Card style={{paddingHorizontal:10,paddingVertical:10}}>
            <View style={style.render}>
                <Image source={{uri:API.baseUrl+item.pic1}} style={{width:100,height:100}}/>
                <View style={style.renderText}>
                    <Subheading>{item.name}</Subheading>
                    <Text>{item.brand}</Text>
                    <Text>{item.transmission}</Text>
                </View>   
            </View>
        </Card>
        </TouchableOpacity>
    )
        console.log(API.baseUrl)
    return ( 
       <RNscreen>
        
            <View style={style.card}>
                {has ?
                    (<>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Title>{brand.motour_name ? brand.motour_name : ""}</Title>
                        </View>
                        <View style={{display:'flex',width:'100%',padding:5,flexDirection:'row'}}>
                            <View style={{flex:1}}>
                                    <Rbutton color={Color.secondary} onPress={()=>navigation.navigate("Update Motourista",{m_id:brand.m_id})}>Update</Rbutton>
                            </View>
                            <View style={{flex:1}}>
                                <Rbutton onPress={changestatus}>{brand.isActive == 0 ? "Activate" : "Deactivate"}</Rbutton>
                            </View>
                        </View>
                      
                    </>)                
                    :
                    (<>
                        <Title>Motorista</Title>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <Button name="Become Motorista" mode='contained' onPress={()=>navigation.navigate("Create Motourista")} color={Color.primary}/>
                        </View>
                    </>)
                }   
               
            </View>
            {has &&
                <>
            <Card style={{padding:5}}>
                    <View style={{ flexDirection: 'row', padding: 10, }}>
                        <Title>Motorcycle List</Title>
                        <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                <Rbutton color={Color.primary} onPress={()=>navigation.navigate("Add Motor",{m_id:brand.m_id})}>Add Motorbike</Rbutton>
                        </View>
                    
                    </View>    
            </Card>
           
                <FlatList
                    data={vehiclelist}
                    keyExtractor={(val,i)=>i.toString()}
                    renderItem={renderItem}
                />
                </>
            }
                          
            </RNscreen>
    );
}

export default Vehicle

const style = StyleSheet.create({
    card:{
        padding:10,
        marginHorizontal:10,
        marginVertical:5,
        backgroundColor:'white',
        flex:1
    },
    render:{
        flex:1,
        flexDirection:'row'
    },
    renderImage:{
        width:100,
        height:120
    },
    renderText:{
        paddingHorizontal:15,
        paddingVertical:10
    }
})