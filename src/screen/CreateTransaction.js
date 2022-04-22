import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import RNscreen from '../components/RNscreen'
import { Dialog, Headline, Modal, Portal } from 'react-native-paper'
import { Button } from '../components/Button'
import { TextInput } from '../components/TextInput'
import { Color } from '../utils/Themes'
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker'
import Calendar from '../components/Calendar'
import { Func } from '../utils/Func'


const CreateTransaction = ({route}) => {
    const minDate = new Date(); // Today
    const maxDate = new Date(2022, 3, 4);
    const [state, setstate] = useState({
         hr: null,
         min: null,
         type:null, 
         start: "YYYY-MM-DD",
         end: "YYYY-MM-DD",
    })
  const [type, settype] = useState("");
  const [showCalendar, setshowCalendar] = React.useState(false);
    
  const [isView, setisView] = useState(false);
  
  const openCalendar = (type) => {
    settype(type)
    setshowCalendar(true)
  }
  
  console.log("DATE NOW", Func.dateformat())
  


    return (
       <>
       {showCalendar ? 
          (
               <Calendar/>  
          ) :
          (
            <View>
 
          <View style={style.container}>
              <Headline>Create Booking</Headline>
          </View>
          <View style={ style.container}>
            <View>
                <View style={{flexDirection:'row'}}>
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
    }
})