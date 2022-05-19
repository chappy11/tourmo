import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { Caption, Title } from 'react-native-paper';
import RNscreen from "../../components/RNscreen";
import { Color } from '../../utils/Themes';
import API from '../../endpoints/API'
import {UserContext} from '../../context/Context'
import WebView from 'react-native-webview';


const ViewHistory = ({route}) =>{
    const data = route.params.item;
    console.log(data);
    return(
        <RNscreen>
            <View style={style.container}>
                <View style={{height:100,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>Reference No.</Text>
                        <Title style={{color:'white'}}>{data.ref_no}</Title>
                </View>
                <View style={style.container2}>
                        {data.his_type == 1  &&
                            <Tourista booking_id={data.booking_id} type={data.his_type}/>
                        }

                        {data.his_type == 2  &&
                            <Tourista booking_id={data.booking_id} type={data.his_type}/>
                        }
                        {data.his_type == 0 &&
                           <WebView source={{ uri: data.receipt_link }}/>
                        }

                </View>
            </View>
        </RNscreen>
    );
}

export default ViewHistory;

export const Tourista = ({booking_id,type}) =>{
    const [data,setdata] = React.useState({});
    const {id,user} = React.useContext(UserContext)
    
    React.useEffect(()=>{
        getdata();
    },[type])
    
    const getdata = async() =>{
        if(type == 1){
            try{
                let res = await API.tourista(booking_id);
                console.log("USER DATA",res);
                if(res.status == 1){
                    setdata(res.data[0]);
                }
            }catch(e){
                console.log(e)
            }
        }else{
            try{
                let res = await API.motourista(booking_id);
                console.log("USER DATA",res);
                if(res.status == 1){
                    setdata(res.data[0]);
                }
            }catch(e){
                console.log(e)
            }
        }
        
    }
    console.log("TYPE",type)
    return(
        <View style={{paddingVertical:15,paddingHorizontal:20}}>
            <View style={{marginVertical:5}}>
                <Caption>Tourista</Caption>
                <Text style={{color:'black',fontSize:15}}>{type == 1 ? (user.firstname+" "+user.middlename+" "+user.lastname):(data.firstname+" "+data.middlename+" "+data.lastname)}</Text>
            </View>
            <View style={{marginVertical:5}}>
                <Caption>Motourista</Caption>
                <Text style={{color:'black',fontSize:15}}>{data.motour_name}</Text>
            </View>
            <View style={{marginVertical:5}}>
                <Caption>Motourista Owner</Caption>
                <Text style={{color:'black',fontSize:15}}>{type == 1 ? data.firstname+" "+data.middlename+" "+data.lastname : user.firstname+" "+user.middlename+" "+user.lastname}</Text>
            </View>
            <View style={{marginVertical:5}}>
                <Caption>Motorbike</Caption>
                <Text style={{color:'black',fontSize:15}}>{data.brand+" "+data.name+" ("+data.transmission+")"}</Text>
            </View>
            {type == 2 &&
              <View style={{marginVertical:5}}>
              <Caption>Tourmopoints Cost</Caption>
              <Text style={{color:'black',fontSize:15}}>{data.deducted}</Text>
          </View>
            }
         
            <View style={{marginVertical:5}}>
                <Caption>Start Date</Caption>
                <Text style={{color:'black',fontSize:15}}>{data.start_date}</Text>
            </View>
            <View style={{marginVertical:5}}>
                <Caption>End Date</Caption>
                <Text style={{color:'black',fontSize:15}}>{data.end_date}</Text>
            </View>
            <View style={{marginVertical:5}}>
                <Caption>Transaction Date</Caption>
                <Text style={{color:'black',fontSize:15}}>{data.book_date}</Text>
            </View>
            <View style={{marginTop:15,borderTopWidth:1,borderTopColor:'lightgray',flexDirection:'row',height:'100%'}}>
                <View style={{flex:1,marginTop:15}}>
                    <Text>Total</Text>
                </View>
                <View style={{flex:1,marginTop:15,alignItems:'flex-end'}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>{"Php "+data.total_amount}</Text>
                </View>
            </View>
        </View>
    )
}


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
    }
})