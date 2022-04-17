import { View, Text,StyleSheet, Image,ScrollView,Alert } from 'react-native'
import React, { useEffect } from 'react'
import { AuthContext, UserContext } from '../../context/Context'
import Screen from '../../components/Screen';
import API, { ip } from '../../endpoints/API';
import { Headline, Title } from 'react-native-paper';
import { Button } from '../../components/Button';
import { Color } from '../../utils/Themes';
import RNscreen from '../../components/RNscreen';
import { NavigationContainer } from '@react-navigation/native';

const Profile = ({navigation,route}) => {
  const {user} = React.useContext(UserContext);
  const {signOut} = React.useContext(AuthContext)

  const [profile, setprofile] = React.useState({});

  useEffect(() => {
    getuser();
  },[route])


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
      <ScrollView style={style.container} >
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
          <Button name="Update Profile" mode='contained' color={Color.primary} onPress={() => navigation.navigate("Update Profile")}/>
              <Button name="Logout" mode='outlined' color={Color.danger} onPress={signOut}/>
          </View>
      </ScrollView>
    </RNscreen>
   
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