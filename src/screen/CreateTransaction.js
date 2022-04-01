import { View, Text, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Screen from '../components/Screen'
import { Dialog, Headline, Modal, Portal } from 'react-native-paper'
import { TextInput } from '../components/TextInput'
import { Button } from '../components/Button'
import { Color } from '../utils/Themes'
import CalendarPicker from 'react-native-calendar-picker/CalendarPicker'


const CreateTransaction = ({route}) => {
     const minDate = new Date(); // Today
    const maxDate = new Date(2022, 3, 4);
    const [state, setstate] = useState({
         selectedStartDate: null,
      selectedEndDate: null,
    })
    const [isView, setisView] = useState(false);
   
    const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setstate({...state,
        selectedEndDate: date.toString(),
      });
    } else {
      setstate({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }
    
    return (
        <Portal>
        <Screen style={{ backgroundColor: 'lightgray' }}>
 
          <View style={style.container}>
              <Headline>Set Up Payment</Headline>
          </View>
                <View style={ style.container}>
                         
                 
                         <CalendarPicker
                    
                            startFromMonday={true}
                   
                    minDate={minDate}
                    
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={(e)=>onDateChange(e,'END_DATE')}
                        />
                    <TextInput placeholder={state.selectedEndDate}/>
          </View>
                <View style={style.container}>
                <Text>Pay With Stripe</Text>
              <TextInput placeholder='Enter Acount Number' />
              <TextInput placeholder={route.params.rate} editable={false} selectTextOnFocus={false} style={{marginVertical:10}} />
              <Button color={Color.secondary} mode='contained' name="Pay It now"/>
         </View>
               
            </Screen>
        </Portal>
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