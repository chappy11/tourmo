import { View, Text,StyleSheet, Image,ScrollView,Alert } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContext, NotifContext, UserContext } from '../../context/Context'
import Screen from '../../components/Screen';
import API, { ip } from '../../endpoints/API';
import { Headline, Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';
import RNscreen from '../../components/RNscreen';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

const Profile = ({navigation,route}) => {
  const isFocus =  useIsFocused();
  const {user} = React.useContext(UserContext);
  const {signOut,getnotif } = React.useContext(AuthContext)
  const {count} =React.useContext(NotifContext);
  const [profile, setprofile] = React.useState({});

  useEffect(() => {
    getuser();
    getnotif();
  },[route,isFocus])

  console.log("COUNT",count)
  const getuser = async() => {
    
      let resp = await API.getprofile(user.user_id);
      console.log("Profiles",resp.data[0])
      if (resp.status === 1) {
        setprofile(resp.data[0]);
      }
    // } catch (error) {
    //     Alert.alert("Error","Something went wrong",0)
    // }
  }
  
  return (
    <RNscreen> 
      <View style={style.container}>
        <Title style={{padding:20,color:'white'}}>Profile</Title>
        <View style={style.container2}>
        <ScrollView style={{flex:1}} >
          <View style={{...style.card,display:'flex',justifyContent:'center',alignItems:'center'}}>
              <Image source={{uri:ip+profile.user_pic}} style={style.image} resizeMode='contain'/>
              <Title>{profile.firstname+" "+profile.middlename+" "+profile.lastname}</Title>
              <Text>{profile.email}</Text>
              <Text>{profile.contact}</Text>
          </View>
          <View style={style.card}>
            <Title>License picture</Title>
              <Image source={{uri:ip+profile.license_pic}} style={{width:300,height:300}}/>
          </View>
        <View style={style.card}>
          {profile.isVer == 1 &&
            <>
              {profile.isMotourista == 0 &&
                <Button name="Become a Motourista" mode="contained" color={Color.primary} onPress={()=>navigation.navigate("Create Motourista")}/>
              }
            </>
          }
              
              <View style={{marginVertical:10}}>
                  <Button name="Update Profile" mode='contained' color={Color.primary} onPress={() => navigation.navigate("Update Profile")}/>
              </View>
              <View style={{marginVertical:10}}>
                  <Button name="Logout" mode='outlined' color={Color.danger} onPress={signOut}/>
              </View>
              
          </View>
      </ScrollView>
          </View>
      </View>
      
    </RNscreen>
   
  )
}

export default Profile


const style= StyleSheet.create({
 container:{
   flex:1,
   backgroundColor:Color.color2
 },
 container2:{
    flex:1,
    backgroundColor:'white',
    borderTopStartRadius:20,
    borderTopEndRadius:20,
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