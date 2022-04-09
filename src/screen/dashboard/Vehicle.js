import React,{useEffect,useState,useLayoutEffect} from 'react';
import { View, Text, StyleSheet, ScrollView ,RefreshControl} from 'react-native';
import { Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import RNscreen from '../../components/RNscreen';
import Screen from '../../components/Screen';
import { UserContext } from '../../context/Context';
import API from '../../endpoints/API';
import { Color } from '../../utils/Themes';


const Vehicle  = ({navigation,route}) =>{
    const { user } = React.useContext(UserContext);
    const [has,sethas] = useState(false)
    const [brand, setbrand] = useState(null);
    const [refresh,setrefresh] = useState(true)
    useEffect(() => {
         getdata();        
    }, [])
   
    const getdata = async () => {
        let resp = await API.getmotouristabyuser(user.user_id);
        if (resp.status === 1) {
            setbrand(resp.data[0]);
            sethas(true);
        }
    }

    return ( 
       <RNscreen>
        
            <View style={style.card}>
                {has ?
                    (<>
                        <Title>{brand.motour_name ? brand.motour_name : ""}</Title>
                        <Button name="Add Motorcycle" mode='contained' color={Color.secondary} textColor={Color.white} onPress={()=>navigation.navigate("Add Motor",{m_id:brand.m_id})}/>
                    </>)                
                    :
                    (<>
                         <Title>Motorista</Title>
                        <Button name="Become Motorista" mode='contained' onPress={()=>navigation.navigate("Create Motourista")} color={Color.primary}/>
                    </>)
                }   
               
            </View>
            <View style={style.card}>
                <Title>Motorcycle</Title>
            </View>
          
        </RNscreen>
    );
}

export default Vehicle

const style = StyleSheet.create({
    card:{
        padding:10,
        marginHorizontal:10,
        marginVertical:5,
        backgroundColor:'white'
    }
})