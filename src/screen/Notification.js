import { View, Text, StyleSheet,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import { Headline, Subheading, Title,  } from 'react-native-paper'
import RNscreen from '../components/RNscreen'
import { UserContext } from '../context/Context'
import API from '../endpoints/API'
import { Color } from '../utils/Themes'


const Notification = ({navigation}) => {
  const {id} = React.useContext(UserContext);
  const [list,setlist] = React.useState([]);

  React.useEffect(()=>{
    getdata();
  },[])
  
  const getdata = async()=>{
    let resp = await API.getnotif(id);
    console.log("resp",resp);
    setlist(resp.data);
  }

  const handleRead = async(id,item) =>{
    const payload = {
      "notif_id" : id
    }
    try{
      let response = await API.read(payload);
      console.log("RESPO",response);
      if(response.status == 1){
          navigation.navigate("View Notification",{item})
      }
    }catch(e){
      console.log(e)
    }
    
  }
  
  const renderItem = ({item}) =>(
     <TouchableOpacity onPress={()=>handleRead(item.notif_id,item)}>
     <View style={{paddingHorizontal:20,paddingVertical:10,backgroundColor:item.isRead == 0 ? "whitesmoke" : "white"}}>
          <Title>{item.notif_title}</Title>
          <Subheading>{item.notif_date}</Subheading>
      </View>
      </TouchableOpacity>
  )
  
  return (
    <RNscreen>
        <View style={style.container}>
          <Headline style={{color:"white",fontWeight:'bold',padding:20}}>Notification</Headline>
          <View style={style.container2}>
              <FlatList
                data={list}
                keyExtractor={(val,i)=>i.toString()}
                renderItem={renderItem}
              />
          </View>
        </View>
    </RNscreen>
  )
}

export default Notification


const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Color.color2
  },
  container2:{
    backgroundColor:'white',
    borderTopEndRadius:20,
    borderTopStartRadius:20,
    flex:1,
  }
})