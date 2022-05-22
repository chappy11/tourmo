import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {View,StyleSheet,Text,FlatList,TouchableOpacity} from 'react-native';
import { Headline, Subheading, Title } from "react-native-paper";
import RNscreen from "../../components/RNscreen";
import { UserContext } from "../../context/Context";
import API from "../../endpoints/API";
import { Color } from "../../utils/Themes";

function historytype(history){
    if(history == 0){
        return "Buy Tourmo Points";
    }else if(history == 1){
        return "Completed (as tourista)";
    }else if(history == 2){
        return "Competed (as Moutorista)";
    }
}


const TransactionHistory = ({route,navigation}) =>{
    const {id,mode} = React.useContext(UserContext);
    const [list,setlist] = React.useState([]);

    React.useEffect(()=>{
        getdata();
    },[route])


    const getdata = async() =>{
        try{
            let resp = await API.gethistory(id);
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

    const background = React.useCallback(()=>{
        return mode==="0" ? {flex:1,backgroundColor:Color.color3} : {flex:1,backgroundColor:Color.color2}
    },[mode])

    const renderItem = ({item}) =>(
        <TouchableOpacity onPress={()=>navigation.navigate("View History",{item})}>
        <View style={{padding:10,borderBottomWidth:1,borderBottomColor:'lightgray'}}>
            <Title>{historytype(item.his_type)}</Title>
            {item.his_type == 0 &&
                <Subheading>{"Php "+item.amount}</Subheading> 
            }
            {item.his_type == 1  &&
                <Subheading>{"Php "+item.total_amount}</Subheading>
            }
            {item.his_type == 2 &&
                <Subheading>{"Php "+item.total_amount}</Subheading>
            }
        </View>
        </TouchableOpacity>
    )

    return(
        <RNscreen>
            <View style={background()}>
                <Headline style={{padding:15,color:'white'}}>
                        Transaction History
                </Headline>
                <View style={style.container2}>
                    <FlatList
                        data={list}
                        keyExtractor={(val,i)=>i.toString()}
                        renderItem={renderItem}
                        style={{flex:1}}
                    />                  
                </View>
            </View>

        </RNscreen>
    );
}


export default TransactionHistory;

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.color2
    },
    container2:{
        flex:1,
        backgroundColor:'white',
        borderTopStartRadius:20,
        borderTopEndRadius:20,
        paddingTop:20
    }
})