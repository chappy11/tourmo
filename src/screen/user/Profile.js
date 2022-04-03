import { View, Text,StyleSheet, Image,ScrollView } from 'react-native'
import React from 'react'
import { AuthContext, UserContext } from '../../context/Context'
import Screen from '../../components/Screen';
import { ip } from '../../endpoints/API';
import { Headline, Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';

const Profile = () => {
  const {data} = React.useContext(UserContext);
  const {signOut} = React.useContext(AuthContext)
  console.log("Data",data);
  return (
    <Screen>
      <ScrollView style={style.container} >
          <View style={{...style.card,display:'flex',justifyContent:'center',alignItems:'center'}}>
              <Image source={{uri:ip+data.user_pic}} style={style.image} resizeMode='contain'/>
              <Title>{data.firstname+" "+data.middlename+" "+data.lastname}</Title>
              <Text>{data.email}</Text>
              <Text>{data.contact}</Text>
          </View>
          <View style={style.card}>
            <Title>License picture</Title>
              <Image source={{uri:ip+data.license_pic}} style={{width:300,height:300}}/>
          </View>
          <View style={style.card}>
              <Button name="Logout" mode='outlined' color={Color.danger} onPress={signOut}/>
          </View>
      </ScrollView>
      
    </Screen>
  )
}

export default Profile


const style= StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:'whitesmoke'
 },
 card:{
   backgroundColor:'white',
   padding:10,
   marginVertical:10,
   marginHorizontal:20,
  },
 image:{
   width:150,
   height:150,
   borderRadius:100
  }
 
})