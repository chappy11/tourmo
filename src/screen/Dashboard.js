import React from 'react'
import Screen from '../components/Screen';
import {Headline,Subheading} from 'react-native-paper'
import {FlatList,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native'
import { UserContext } from '../context/Context';
import API from '../endpoints/API';
import { Color } from '../utils/Themes';
import {Button} from '../components/Button';
import { Func } from '../utils/Func';
import CountDown from 'react-native-countdown-component';
import { Pbutton } from '../components/Rbutton';

function calculate(d2)  {
        let date1 = new Date();
        let date2 = new Date(d2);
        var dif = (date2.getTime() - date1.getTime()) / 1000;
    return dif;
    }

const Dashboard = ({navigation,route}) =>{
    const { user,id } = React.useContext(UserContext)
    const [isver, setisver] = React.useState(false);
    const [isMotourista, setisMotourista] = React.useState(false);
    const [booking, setbooking] = React.useState({});
    const [hasbooking, sethasbooking] = React.useState(false);
    const [count, setcount] = React.useState(0);
    React.useLayoutEffect(() => {
        getdata();
      
    }, [route])
    React.useEffect(() => {
          viewbooking();
    },[route,isver])

    const getdata = async() =>{
        let resp = await API.getprofile(user.user_id);
        let data = resp.data[0];
        if(data.isVer == 1){
            setisver(true)
        }

        if(data.isMotourista == 1){
            setisMotourista(true)
        }

    }

    const viewbooking = async() => {
        let resp = await API.getbookingbyuser(id);
        if (resp.data.status == 1) {
            sethasbooking(true)
            setbooking(resp.data.data[0]);
            setcount(calculate(resp.data.data[0].end_date));
        } else {
            sethasbooking(false);
        }
        
    }
    console.log("END DATE",calculate(booking.end_date))
    const renderItem = ({item,i}) =>(
        <TouchableOpacity key={i} onPress={()=>navigation.navigate(item.link)}>
            <View style={style.item}>
                <View style={{justifyContent:'center',alignItems:'center',flex:1,}}>
                    <Image source={item.image} style={{width:50,height:50}} resizeMode='contain'/>
                </View>
                    <Text style={{textAlign:'center'}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
 //   console.log(isver)
    return(
        
    <View style={{flex:1}}>
          {!isver  ?
            (<Text>Your Account currently verifying by the admin</Text>)
            :
            (
                <>
                {isMotourista ? (
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <FlatList
                    data={navlist}
                    renderItem={renderItem}
                    numColumns={3}
                    keyExtractor={(val,i)=>i.toString()}
                   />
                   </View>
                        ) : (
                            <>
                            <View style={{flex:1,backgroundColor:Color.color2}}>
                                        <View style={{padding:10}}>
                                            <Headline style={style.headline}>{booking.name}</Headline>
                                            <Subheading style={style.textBlack}>{booking.brand}</Subheading>             
                                        </View>
                                                                                
                                             <CountDown

                                                                                
                                            until={count}
                                            onFinish={() => alert('finished')}
                                            onPress={() => alert('hello')}
                                            size={20}
                                            />
                                       
                                        {booking.booking_status == 1 && Func.datebetween(booking.start_date,booking.end_date).includes(Func.dateformat(new Date)) &&
                                                 <Button name="Start Now"  mode='contained' color={Color.secondary} />
                                            
                                        }
                                    
                             
                               
                            <View style={style.container}>
                            <View style={style.iamge}>  
                                <Image source={{uri:API.baseUrl + booking.pic2}} style={{width:'70%',height:200,borderRadius:20}} resizeMode='stretch' resizeMethod='scale'/>
                            </View>
                            <Pbutton name="Return Motorcycle"/>
                            <FlatList
                            data={nav}
                            renderItem={renderItem}
                            numColumns={3}
                            keyExtractor={(val,i)=>i.toString()}
                            />    
                            </View>     
                                        
                            </View>        
                   </>             
                    )}
              </>  
            )  
        }
            
   </View>
        
    );
}

export default Dashboard;

const style= StyleSheet.create({
    item:{
        width:100,
        height:120,
        flexDirection:'column',
        alignItems:'center'
    },
    textBlack:{
        color:'white',
    },
    headline:{
        color:'white',
        fontWeight:'bold'
    },
    container:{
        backgroundColor:'white',
        paddingTop:20,
        borderTopStartRadius:25,
        justifyContent:'center',
        borderTopEndRadius:25,
        flex:1
    },
    iamge:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:200,
    }
})

const navlist = [
    {
        name:"Vehicle",
        image:require("../../asset/icon/motorcycle.png"),
        link:"VehicleRoute"
    },
    {
        name:"Transaction History",
        image:require("../../asset/icon/transactionhistory.png")
    },
    {
        name:"List of Bookings",
        image:require("../../asset/icon/bookings.png"),
        link:"List Of Bookings"
    },
    {
        name:"My Bookings",
        image:require("../../asset/icon/mybookings.png"),
    }
]

const nav = [
    {
        name:"Transaction History",
        image:require("../../asset/icon/transactionhistory.png")
    },
];