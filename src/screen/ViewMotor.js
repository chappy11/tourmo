import { View, Text, StyleSheet,Image,ScrollView,Alert,TouchableOpacity,FlatList} from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { Color } from '../utils/Themes'
import { Avatar, Button, Headline, Subheading, Title} from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import {Rating} from 'react-native-ratings'
import RNscreen from '../components/RNscreen'
import { ip } from '../endpoints/API'
import Swiper from 'react-native-swiper'
import { UserContext } from '../context/Context'
import API from '../endpoints/API';
import { Pbutton, Sbutton } from '../components/Rbutton'
import { List } from '../components/List'
import ReviewComp from './review/ReviewComp'
import { useIsFocused } from '@react-navigation/native'
import ViewReview from './review/ViewReview'
const ViewMotor = ({ navigation, route }) => {
    const isFocus = useIsFocused()
    const data = route.params.item;
    const { id,isVer } = React.useContext(UserContext);
    const [isDisabled, setisDisabled ] = React.useState(false);
    const [isFav,setisFav] = React.useState(false);
    const [count,setcount] = React.useState(0)
    const [rev,setrev] = React.useState([]);
    console.log(route.params);
    React.useEffect(() => {
        check();

    },[route,isFocus])

    React.useEffect(()=>{
        checkfav();
        review();
    },[route,isFocus])
    
    const review = async() =>{
        let resp =await API.getreview(data.motor_id);
        if(resp.status == 1){
            setcount(resp.count);
            setrev(resp.data);
        }else{
            console.log("ERROR")
        }
       
    }

    
    const checkfav = async() =>{
        try{
            let resp = await API.checkfav(id,data.motor_id);
            if(resp.status == 1){
                setisFav(true)
            }else{
                setisFav(false);
            }
        }catch(e){
            console.log(e)
        }
    }
    
    const check = async() => {
        let isRent = "";
        let resp = await API.getprofile(id);
        isRent = resp.data[0].isRent;
        if (id == data.user_id || isRent == 1 || isVer == 0) {
            setisDisabled(true);
        }        
    }

    const addtofav = async () =>{
        try{
            let res = await API.addtofav(id,data.motor_id);
            if(res.status == 1){
                Alert.alert("Success",res.message);
                checkfav()
            }else{
                Alert.alert("Error",res.message)
            }
        }catch(e){
            console.log(e)
        }
    }

    const removefav = async ()=>{
        try{
            let res = await API.delete(data.motor_id,id);
            if(res.status == 1){
                Alert.alert("Success",res.message)
                checkfav()
            }else{
                Alert.alert("Error",res.message);
            }
        }catch(e){
            console.log(e)
        }
    }


    return (
        <RNscreen>
            <View style={style.con1}>
             
                <View style={{padding:20}}>
                    
                    <Title style={{color:'white'}}>{data.name}</Title>
                    <Subheading style={{color:'white'}}>{data.brand}</Subheading>
                 
                </View>
                <View style={style.con2}>
                      <ScrollView>
                        <View style={style.container}>
                        <Swiper style={{height:300}}>
                            <Image source={{ uri: ip + data.pic1 }} style={{ width: '100%', height: 300 }} resizeMode='contain' />
                            <Image source={{ uri: ip + data.pic2 }} style={{ width: '100%', height: 300 }} resizeMode='contain' />
                            <Image source={{uri:ip+data.pic3}} style={{width:'100%',height:300}} resizeMode='contain' />
                            <Image source={{ uri: ip + data.offRec }} style={{ width: '100%', height: 300 }} resizeMode='contain' />
                            <Image source={{uri:ip+data.certReg}} style={{width:'100%',height:300}} resizeMode='contain' />
                        </Swiper>
                        <Title>Motorcycle Data</Title>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                              <View style={{flex:1,alignItems:'flex-start',justifyContent:'center'}}>
                                    <Text>Rating</Text>
                                    <ReviewComp count={count === undefined ? 0 :count}/>
                                </View>  
                                <View style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                                    <Button onPress={()=>navigation.navigate("View Review",{rev})}>VIew Review</Button>                            
                                </View>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                                <List color="black" title="Name" value={data.name}/>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                                <List color="black" title="Brand" value={data.brand}/>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                                <List color="black" title="Transmission" value={data.transmission}/>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                                <List color="black" title="Rate per day" value={"Php  "+data.rate}/>
                        </View>
                        
                        <Title style={{marginTop:20}}>Owner</Title>
                        <View style={{width:'100%',alignItems:'center'}}>
                            <Avatar.Image source={{uri:API.baseUrl + data.user_pic}} size={100}/>
                            <Title>{data.motour_name}</Title>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10,marginTop:20}}>
                                <List color="black" title="Full Name" value={data.firstname+" "+data.middlename+" "+data.lastname}/>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                                <List color="black" title="Contact No." value={data.contact}/>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'lightgray',paddingVertical:5,paddingRight:10}}>
                                <List color="black" title="Email" value={data.email}/>
                        </View>
                        <Title style={{marginTop:20}}>Location</Title>
                        <MapView
                        style={style.map}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        region={{
                            latitude: parseFloat(data.latitude),
                            longitude: parseFloat(data.longitude),
                            latitudeDelta: 0.001,
                            longitudeDelta:0.0010,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude) }}
                        />
                       
                    </MapView>
                    <View style={{paddingVertical:10,paddingHorizontal:20}}>
                        <Title>Rates and Review</Title>
                        {rev.map((val,i)=>(
                            <View style={{width:'100%',padding:20}}>
                                <View style={{flexDirection:'row'}}>
                                    <Avatar.Text label='U' size={20}/>
                                    <Rating
                                        ratingCount={5}
                                        defaultRating={val.rate}
                                        readonly={true}
                                        minValue={val.rate}
                                        jumpValue={val.rate}
                                        fractions={1}
                                        startingValue={val.rate}
                                        imageSize={20}
                                        style={{marginLeft:10}}
                                    />
                                </View>
                                <View style={{paddingVertical:10}}>
                                    <Text>{val.user_review}</Text>
                                </View>
                            </View>
                        ))

                        }
                    </View>
                     </View>    
                    
                 </ScrollView>
                 <View style={{margin:10}}>
                    {isFav ? 
                        ( <Sbutton name="Remove To Favorite"  color={Color.primary} mode='contained'  onPress={removefav}/>)
                        :
                        ( <Sbutton name="Add to Favorite"  color={Color.primary} mode='contained'  onPress={addtofav}/>)
                    }
                    
                </View>
  
                <View style={{margin:10}}>
                     <Pbutton name="Rent this Vehicle" disabled={isDisabled ? true : false} color={Color.primary} mode='contained'  onPress={() => navigation.navigate('Create Transaction', { data })}/>
                </View>
                 
  
                </View>
            </View>
    
          
    </RNscreen>
  )
}

export default ViewMotor

const style = StyleSheet.create({
    con1:{
        backgroundColor:Color.color2,
        flex:1,
    },
    con2:{
        backgroundColor:"white",
        flex:1,
        borderTopStartRadius:20,
        borderTopEndRadius:20,
    },
    container: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    textContainer: {
        padding: 20,
        display: 'flex'
    },
    map: {
        height: 500,
        width:'100%',
    }
})