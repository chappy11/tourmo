import { View, Text, StyleSheet,TouchableOpacity,Image,Alert } from 'react-native'
import React,{useState} from 'react'
import RNscreen from '../components/RNscreen'
import { Caption, Dialog, Headline, Modal, Portal,} from 'react-native-paper'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { Color } from '../utils/Themes'
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker'
import Calendar from '../components/Calendar'
import { Func } from '../utils/Func'
import { hour,  min } from '../components/Time'
import { Picker } from '@react-native-picker/picker'
import {UserContext} from '../context/Context';
import API from '../endpoints/API';


const CreateTransaction = ({route}) => {
  const { user } = React.useContext(UserContext);
  const [isLoad, setisLoad] = React.useState(false);
  const params = route.params.data;
  const [total, settotal] = React.useState(0);
 const [state, setstate] = useState({
         hr: "01",
        min: "00",
        isAm:"AM", 
        type:null, 
        start: "YYYY-MM-DD",
        end: "YYYY-MM-DD",
        no_days:"" 
  })
  const listhours = hour();
  const [type, settype] = useState("");
  const [showCalendar, setshowCalendar] = React.useState(false);
    
  const [isView, setisView] = useState(false);
  
  React.useCallback(() => {
    if (state.end !== "YYYY-MM-DD") {
      onChange("no_days", Func.daterange(state.start, state.end));
      settotal((Func.daterange(state.start, state.end)) * params.rate);
    } 
   
   
  },[state.end])

  const openCalendar = (type) => {
    settype(type)
    setshowCalendar(true)
  }
  
    const onChange = (name,val) => {
      setstate({...state,[name]:val})
  }
  
  console.log(state.no_days)

  const submit = () => {
   
    setisLoad(true);
    if (state.hr === "" || state.min === "") {
      Alert.alert("Warning", "Please specific time");
      setisLoad(false)
    }
    else if (state.start === "YYYY-MM-DD" || state.end === "YYYY-MM-DD") {
      Alert.alert("Warning", "Please Date start and End");
         setisLoad(false)
    } else {
      let payload = {
        motor_id: params.motor_id,
        user_id: user.user_id,
        time: state.hr + ":" + state.min + " " + state.isAm,
        date_start: state.start,
        date_end:state.end
      }
      API.createBookings(payload).then(res => {
        if (res.data.status === 1) {
          Alert.alert("Success", res.data.message);
          
        } else {
          Alert.alert("Error", res.data.message);
        }
         setisLoad(false)
      })
    }
  }
  //console.log("USER",user)

  


    return (
       <>
       {showCalendar ? 
          (
            <Calendar type={type} onChange={onChange} onDismiss={()=>setshowCalendar(false)}/>  
          ) :
          (
            <View>
 
          <View style={style.container}>
              <Headline>Create Booking</Headline>
          </View>
          <View style={ style.container}>
            <View>
                  <Caption>Date Start</Caption>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{flex:1}}>
                      <TextInput disabled placeholder={state.start}/>
                    </View> 
                    <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                      <TouchableOpacity onPress={() => openCalendar("start")}>
                           <Image source={require('../../asset/icon/calendar.png')} style={{ width: 30, height: 30 }} />
                      </TouchableOpacity>    
                    </View>
                </View>
                </View>
               <View>
                      <Caption>Date End</Caption>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{flex:1}}>
                          <TextInput disabled placeholder={state.end}/>
                        </View> 
                        <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                          <TouchableOpacity onPress={() => openCalendar("end")}>
                              <Image source={require('../../asset/icon/calendar.png')} style={{ width: 30, height: 30 }} />
                          </TouchableOpacity>    
                        </View>
                    </View>
            </View>
                <View>
                  <Caption>Time Start</Caption>
                </View>    
                <View style={style.border}>
                  <Picker
                    selectedValue={state.hr}
                    onValueChange={(val)=>onChange("hr",val)}
                    
                  >
                    {hour().map(val => (
                      <Picker.Item label={val} value={val}/>
                      ))}
                  </Picker>
                </View>
                 <View style={style.border}>
                  <Picker
                    selectedValue={state.min}
                    onValueChange={(val)=>onChange("min",val)}
                    
                  >
                    {min().map(val => (
                      <Picker.Item label={val} value={val}/>
                      ))}
                  </Picker>
                </View>
                <View style={style.border}>
                  <Picker
                    selectedValue={state.isAm}
                    onValueChange={(val)=>onChange("isAm",val)}
                  >
                    <Picker.Item label='AM' value="AM" />
                      <Picker.Item label='PM' value="PM"/>
                  </Picker>
                </View>
               <View>
               
                  <Button disabled={isLoad ? true :false} name="Create Booking" color={Color.primary} mode='contained' onPress={submit}/>
                </View>
                
          </View>
             
     </View>
        
          )
       
       }
       
       </>
          
  )
}

export default CreateTransaction
const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginVertical: 5,
        padding:15
  },
  border: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    marginVertical:10
  }
})