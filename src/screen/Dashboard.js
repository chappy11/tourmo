import React from 'react'
import Screen from '../components/Screen';
import {FlatList,StyleSheet,View,Text,TouchableOpacity,Image} from 'react-native'
import { UserContext } from '../context/Context';
import API from '../endpoints/API';


const Dashboard = ({navigation,route}) =>{
    const { user } = React.useContext(UserContext)
    const [isver, setisver] = React.useState(false);
    const [isMotourista,setisMotourista] =  React.useState(false);
    React.useLayoutEffect(() => {
        getdata();
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
    console.log(isver)
    return(
        
    <View style={{flex:1,flexDirection:'column',justifyContent:'center',backgroundColor:'white',alignItems:'center'}}>
          {!isver  ?
            (<Text>Your Account currently verifying by the admin</Text>)
            :
            (
                <>
                {isMotourista ? (
                  <>
                    <FlatList
                    data={navlist}
                    renderItem={renderItem}
                    numColumns={3}
                    keyExtractor={(val,i)=>i.toString()}
                   />
                   </>
                    ):(
                        <FlatList
                        data={nav}
                        renderItem={renderItem}
                        numColumns={3}
                        keyExtractor={(val,i)=>i.toString()}
                       />                          
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