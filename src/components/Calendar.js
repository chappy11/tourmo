import React from 'react';
import RNscreen from './RNscreen';
import Card from './Card';
import { CalendarList, Agenda} from 'react-native-calendars';
import {View} from 'react-native'
import { Button } from 'react-native-paper';
import { Color } from '../utils/Themes';
import { Func } from '../utils/Func';

const Calendar= ({onChange,onDismiss,type,start,end}) => {
    const minDate = new Date(); // Today
           
    React.useEffect(() => {

       
    },[])
    const onDateChange = (date,type) => {
        if (type === "END_DATE") {
            console.log("END", date)
            onChange("end",Func.dateformat(date))
        } else {
            console.log("start", Func.dateformat(date))
             onChange("start",Func.dateformat(date))
        }
    }
    return (
       <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
            <CalendarList
                startFromMonday={true}
                minDate={minDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                markingType={'period'}
                markedDates={{
                  '2022-04-28': {textColor: 'green',disableTouchEvent: true},
                  '2022-05-22': {startingDay: true, color: 'green'},
                  '2022-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                  '2022-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                }}
  
                allowBackwardRangeSelect={true}
                allowRangeSelection
                monthFormat={'MMMM yyyy'}
            />
            <View style={{flexDirection:'row',marginTop:20}}>
                <View style={{flex:1}}>
                    <Button color={Color.primary} onPress={onDismiss}>Confirm</Button>
                </View>
                <View style={{flex:1}}>
                          <Button color={Color.danger} onPress={onDismiss}>Cancel</Button>
                </View>
              
            </View>
            
       </View>
    );
}

export default Calendar;