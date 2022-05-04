import React from 'react'
import Screen from '../components/Screen';
import {Caption, Headline,Subheading,Dialog,TextInput} from 'react-native-paper'
import {FlatList,StyleSheet,View,Text,TouchableOpacity,Image,Alert} from 'react-native'
import {Rating} from 'react-native-ratings';
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
    const [rate,setrate] = React.useState(3);
    const [review,setreview] = React.useState("");
    const [open,setopen] = React.useState(true);
    const [isReload,setisReload] = React.useState(false);
    const [isMotourista, setisMotourista] = React.useState(false);
    const [booking, setbooking] = React.useState({});
    const [hasbooking, sethasbooking] = React.useState(false);
    const [onStart, setonStart] = React.useState(0);
    const [count, setcount] = React.useState(0);
    React.useLayoutEffect(() => {
        getdata();
    }, [route,isReload])
    React.useLayoutEffect(() => {
          viewbooking();
    },[route,isver,isMotourista])

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
        console.log("RESPONSE",resp.data);
        if (resp.status == 1) {
            sethasbooking(true)
            setbooking(resp.data[0]);
            setonStart(resp.data[0].onStart);
            if(resp.data[0].onStart == 1){
                setcount(calculate(resp.data[0].end_date));
            }
        } else {
            sethasbooking(false);
        }
        
    }


    const cancelbooking =async()=>{
        try{
            let resp = await API.cancelbooking(booking.booking_id);
            if(resp.status == 1){
                Alert.alert("Success",resp.message);
                viewbooking();
            }else{
                Alert.alert("Error",resp.message);
            }
        }catch(err){
            console.log("ERROR",err);
        }
    }

    const startbooking = async()=>{
        try{
            let resp = await API.startbooking(booking.booking_id);
            if(resp.status == 1){
                Alert.alert("Success",resp.message);
                viewbooking();
            }else{
                Alert.alert("Error",resp.message);
            }
        }catch(err){
            console.log("ERROR",err)
        }
    }

    const returnmotorbike = async()=>{
        try{
            let resp = await API.returnBooking(booking.booking_id);
            if(resp.status == 1){
                Alert.alert("Success",resp.message);
                viewbooking();
            }else{
                Alert.alert("Error",resp.message);
            }
        }catch(err){
            console.log("ERROR",err)
        }
    }

    const sendReview = () =>{
        const payload = {
            motor_id:1,
            review:review,
            rate:rate
        }
        try{
            let res = API.sendReview(payload);
            if(res.status == 1){
                setopen(false);
                viewbooking();
                Alert.alert("Success","Thank you for rating")
            }else{
                Alert.alert("Error","Something went wrong");
            }
        }catch(e){
            console.log("ERROR",e)
        }
    }

    const noReview = () =>{
        viewbooking();
    }
    console.log("HASBOOKING",booking);

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
                        {hasbooking ? (
                                      <View style={{flex:1,backgroundColor:Color.color2}}>
                                        <View style={{padding:10}}>
                                            <Headline style={style.headline}>{booking.name}</Headline>
                                            <Subheading style={style.textBlack}>{booking.brand}</Subheading>             
                                        </View>
                                            {onStart == 1 &&                         
                                                <CountDown                                    
                                                until={count}
                                                onFinish={() => alert('finished')}
                                                onPress={() => alert('hello')}
                                                size={20}
                                                />
                                            }
                                       
                                       
                                    
                             
                               
                            <View style={style.container}>
                                    <View style={style.iamge}>  
                                        <Image source={{uri:API.baseUrl + booking.pic2}} style={{width:'70%',height:200,borderRadius:20}} resizeMode='stretch' resizeMethod='scale'/>
                                    </View>
                                         
                                        
                                             <View style={style.container2}>
                                                <View style={{flexDirection:'row',}}>
                                                    <View style={{flex:1}}>
                                                        <Caption style={{color:Color.color1}}>Start Date</Caption>
                                                        <Text style={{ color: Color.color1,fontSize:20 }}>{booking.start_date}</Text>
                                                    </View>
                                                        <View>
                                                        <Caption style={{color:Color.color1}}>End Date</Caption>
                                                        <Text style={{ color: Color.color1,fontSize:20 }}>{booking.start_date}</Text>
                                                    </View>
                                                </View>
                                                  <View style={{flexDirection:'row',}}>
                                                    <View style={{ flex: 1 }}>
                                                        <Caption style={{color:Color.color1}}>Fee</Caption>
                                                        <Text style={{ color: Color.color1, fontSize: 20 }}>{"Php "+booking.total_amount}</Text>
                                                    </View>
                                                        <View>
                                                        <Caption style={{color:Color.color1}}>Owner Name</Caption>
                                                        <Text style={{ color: Color.color1,fontSize:20 }}>{booking.firstname+" "+booking.lastname}</Text>
                                                    </View>
                                                </View>
                                                
                                                <View style={{marginVertical:booking.booking_status == 0 ? 20:5}}>
                                                      <Button name="View Mourista Info" color={Color.primary}/>
                                                </View>
                                                    {booking.booking_status == 0 ? 
                                                        (<Button name="Cancel Booking" color={Color.danger} onPress={cancelbooking}/>) :
                                                        (<>
                                                                       {booking.booking_status == 1 && Func.datebetween(booking.start_date, booking.end_date).includes(Func.dateformat(new Date)) &&
                                                                                <>
                                                                                    {booking.onStart == 0 ?
                                                                                        (
                                                                                            <>
                                                                                                <Text style={{color:Color.color1,textAlign:'center',paddingVertical:10 }}>Click the Start so that the will start</Text>
                                                                                                <Pbutton name="Start Now" onPress={startbooking} />
                                                                                            </>
                                                                                                )
                                                                                            :
                                                                                    ( <Pbutton name="Return Motorcycle" onPress={returnmotorbike}/>)
                                                                                    }
                                                                                </>
                                                 
                                                                         }
                                                      
                                                        </>)

                                                    }
                                                 
                                                </View>
                            </View>  
                                       
                                        
                                     </View>    
                                    ): (
                                        <View style={{flex:1,backgroundColor:Color.color2}}>
                                            <View style={{padding:20}}>
                                                  <Headline style={style.headline}>Dash Board</Headline>
                                            </View>
                                            <View style={style.contain}>
                                                    <View style={{flex:1,alignItems:'center'}}>
                                                                   <Image source={require("../../asset/no_booking.png")} style={{ width: 200, height: 200 }} />
                                                                 <Subheading style={{fontWeight:'bold',fontSize:18}}>You Dont have current booking</Subheading>
                                                    </View>
                                             
                                                    <View style={{flex:1,marginVertical:20,marginHorizontal:20}}>
                                                    <FlatList
                                                        data={nav}
                                                        keyExtractor={(va, i) => i.toString()}
                                                        renderItem={renderItem}
                                                        numColumns={3}
                                                    />    
                                                    </View>    
                                            </View>
                                               
                                        </View>        
                                    )
                                        
                            }
                            
                              
                         </>             
                    )}
              </>  
            )  

        }
        <Dialog visible={open} >
            <Dialog.Title>
                Rate your experience
            </Dialog.Title>
            <Dialog.Content>
                <Rating
                    count={5}
                    showRating
                    defaultRating={2}
                    size={18}
                    onFinishRating={(e=>setrate(e))}
                />
                <TextInput placeholder="Your Comment" onChangeText={(e)=>setreview(e)} style={{backgroundColor:'white',marginTop:20}}/>
            </Dialog.Content>
            <Dialog.Actions>
                <Button name="Confirm" onPress={sendReview} color={Color.color1}/>
                <Button name="No, Thanks" onPress={noReview} color={Color.danger}/>
            </Dialog.Actions>
        </Dialog>
            
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
    contain: {
          backgroundColor:'white',
        paddingTop:20,
        marginTop:10,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        flex:1
    },
    container:{
        backgroundColor:'white',
        paddingTop:20,
        marginTop:10,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        justifyContent:'center',
        flex:1
    },
    iamge:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:200,
    },
    container2: {
        flex: 1,
        marginTop:10,
        paddingTop: 10,
        borderTopStartRadius: 25,
        backgroundColor: Color.color2,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 10,
        marginBottom:5
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
    {
        name: "Favorites",
        image: require("../../asset/fab.png")
    }
];