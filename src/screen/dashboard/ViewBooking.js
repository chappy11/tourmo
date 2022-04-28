import React from 'react'
import RNscreen from '../../components/RNscreen';
import { Text,StyleSheet } from 'react-native';
import Card from '../../components/Card';
import { Avatar, Caption, Headline, Subheading } from 'react-native-paper';
import { ip } from '../../endpoints/API';

const ViewBooking = ({route}) => {
    const data = route.params.item;
    return (
        <RNscreen>
            <SrollView style={{ flex:1}}>
            <Card style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Avatar.Image source={{ uri: ip + data.user_pic }} size={100}/>
                <Headline>{data.firstname+" "+data.middlename+" "+data.lastname}</Headline>
                <Subheading>{data.email}</Subheading>
                <Subheading>{data.contact}</Subheading>
            </Card>
            <Card style={{ flex: 1,padding:20 }}>
                <Caption>NO. of Days</Caption>
                <Text style={style.textData}>{data.no_days}</Text>
                <Caption>Date Start</Caption>
                <Text style={style.textData}>{data.start_date}</Text>
                <Caption>Date End</Caption>
                <Text style={style.textData}>{data.end_date}</Text>
                <Caption>Date Start</Caption>
                <Text style={style.textData}>{data.start_date}</Text>
            </Card>
            </SrollView>
        </RNscreen>
    );
}

export default ViewBooking;

const style = StyleSheet.create({
    textData: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 10,
        color:'black'
    }
})