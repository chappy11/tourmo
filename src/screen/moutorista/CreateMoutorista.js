import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet,View,Text,ImageBackground,Alert,ScrollView} from 'react-native';
import Swiper from "react-native-swiper";
import {Caption, Paragraph, Title} from 'react-native-paper'
import { Button } from '../../components/Button';
import Screen from '../../components/Screen';
import { TextInput } from '../../components/TextInput';
import { Color } from '../../utils/Themes';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import MapView,{Marker} from 'react-native-maps';
import API from '../../endpoints/API';
import { UserContext } from '../../context/Context';
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import RNscreen from '../../components/RNscreen';

const INITIAL_REGION = {
  latitude: 10.3157,
  longitude: 123.8854,
  latitudeDelta: 0.0006294034,
  longitudeDelta: 0.000138792,
}
const CreateMoutorista = ({navigation,route}) => {
    const mapRef = React.useRef(null)
    const [isView, setisView] = React.useState(true);
    const [isLoad,setisLoad] = React.useState(false);
    const [input, setinput] = useState({
        name:""
    })
    const { user } = useContext(UserContext);
    const [accept, setaccept] = React.useState(false);
    const [coordinate, setcoordinate] = useState(null)

    const [region, setregion] = React.useState(INITIAL_REGION)

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setcoordinate({ latitude: info.coords.latitude, longitude: info.coords.longitude })
            setregion({...region,latitude:info.coords.latitude,longitude:info.coords.longitude})
        });
        
    },[]);

    const onChange = (name, val) => {
        setinput({...input,[name]:val})
    }

    const markPosition = (newCoords) => {
        setcoordinate({...newCoords})
    }

    const onRegionChange = (region)=>{
        if(region===null){
            return {...INITIAL_REGION,...coordinate}
        }
        setregion(region)
    }
    const submit = async() => {
        setisLoad(true);
        if (input.name === "") {
            Alert.alert("Error", "Fill out all Fields",[{text:"Okay"}]);
            setisLoad(false)
        } else {
                let payload = {
                    user_id: user.user_id,
                    name: input.name,
                    lat: coordinate.latitude,
                    lng:coordinate.longitude
                }
                let res = await API.addMotourista(payload);
                console.log(res.data)
                if (res.data.status == 1) {
                    Alert.alert(
                        "Success",
                        res.data.message,
                        [{
                            text: "Okay",
                            onPress:()=>navigation.push("Profile")
                        }]
                    );
                    setisLoad(false)
                } else {
                    Alert.alert("Error",res.data.message,[{text:"Okay"}])
                    setisLoad(false);
                }
                
         }
        
    }

    
    return (
       <RNscreen>
            {isView ? (
                <Slide onPress={() => setisView(false)} accept={accept} setaccept={setaccept}/>
            ): (
                <View style={{flex:1,backgroundColor:Color.white}}>
                        <CreateMotourista region={region} onRegionChange={onRegionChange} setregion={setregion} onChange={onChange} coordinate={coordinate} markPosition={markPosition}  submit={submit}/>
                </View>
            )}
            
        </RNscreen>
    );
}

export default CreateMoutorista;


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
        
    },
    item: {
        flex: 1,
    },
    imagebackground: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        margin:10
    }
})

export const CreateMotourista = ({coordinate,onChangeRegion,markPosition,submit,onChange,setregion,region}) => {
    console.log("REGION",region)
    return (
        <>
            <View style={{paddingHorizontal:10,paddingVertical:15}}>
                    <Caption>Name of Brand</Caption>
                <TextInput placeholder="Enter your brand name" onChangeText={(e)=>onChange("name",e)}/>
            </View>
            <MapView
                region={region}
                style={{ flex: 1 }}
                onRegionChangeComplete={onChangeRegion}
               
                
            >
                <Marker
                    draggable
                    coordinate={coordinate}
                    onDragEnd={(e) => {
                        markPosition(e.nativeEvent.coordinate)
                        setregion({...region,...e.nativeEvent.coordinate})
                    }}
                />

            </MapView>
            <View style={{paddingHorizontal:15,paddingVertical:10}}>
                <Button name="Create" mode='contained' onPress={submit} color={Color.primary}/>
            </View>
          
        </>
        )
}


export const Slide = ({onPress,accept,setaccept}) => {
    console.log("Accept",accept)
    return (
        <View style={{flex:1,...style.container}}>
            <Swiper loop={false}>
                <View style={style.item}>
                <ScrollView style={{flex:1}}>               
                          <Paragraph>
                   SERVICES PROVISION
1.Tourmo provides an internet platform for rental firms and individuals to register their motorcycles for reservation and enable users of our mobile application to reserve or create reservations.
2.By booking through Tourmo, renters establish a direct (legally binding) contract with the rental owner/company. When renters make their reservations, we act purely as an intermediary between the renter and the provider, delivering the renter's reservation details to the appropriate motorbike owner and sending the renters a confirmation email.
3.We disclose information based on what the motorbike owner provides us.
4.Tourmo assumes no responsibility for the content contained on our platform. The content information is according to the information provided to us by the motorbike owner.
5.Tourmo's services are for personal, non-commercial use only. It is expressly illegal to resell, deep-link to, use, copy, monitor, display, download, or reproduce any content or information.
6.Booking a motorbike does not guarantee that the motorcycle will be available on indicated dates. It would be best if the renter waited for confirmation of its availability.

TARIFFS AND PRICES
1. All Tourmo costs are per motorcycle for every renter's rental period.
2. The prices displayed on the mobile platform are for rental durations of one day, one week, or one month.
3. Daily rental rates are based on 24 hours.
4. No rental owner/company may charge more than the price indicated on our website.
5. The rental fee renters get after submitting a booking request is a complete payment for the motorbike owner. Tourmo reserves the right to recover 15% of the total price by deducting Tourmo points paid by motorcycle owners before the transaction and the service fee charged via the Stripe payment option we provide. The renter of a motorcycle pays directly to the motorbike owner.
6. The motorbike price will be computed based on its daily rate at booking. After picking up the bike, renters can prolong the rental duration. If the renter returns the motorcycle later than the agreed return date, the price due will be greater than the booking confirmation process.

REFUNDS AND CANCELLATIONS
1.Renters may cancel their booking request if the owner does not approve it.
2.When the motorbike owner has already approved the booking, renters cannot cancel it or request a refund from the owner or Tourmo.

3.Stripe Payment will be the application utilized to handle payments for the time being.
4.By renting a motorbike from the owner, the renter accepts and agrees to their associated terms and conditions, including their cancellation policy, if renters wish to return the motorcycle prior to the rental time expiring.
5.Tourmo is not required to issue reimbursements before or during the rental period, regardless of the cause of the motorbike renter's inability to complete the rental. Tourmo cannot be held liable for unexpected cancellations due to inclement or inappropriate weather conditions and no refunds in these instances.

                   </Paragraph>
                   </ScrollView>

                </View>
                <View style={style.item}>
                <ScrollView style={style.item}>
                        <Paragraph>
                        DEPOSIT FOR PAYMENT, DRIVING LICENSE, PASSPORT, AND LIMITATIONS
1.Most motorbike owners ask for a deposit for the motorcycle at the start of the rental, such as cash, ID, or passport, to cover the liability excess, any charges incurred during the rental, and, in some circumstances, fuel.
2.Before renting, all drivers must be at least 18 years old and possess a valid driver's license and passport. Licenses that have expired will not be accepted. Before riding the motorcycle, secure a license examined at a local police station. Always bring the original driver's license.
3.Depending on the motorbike owner, renters may be required to return the leased motorcycle with a full tank. Prior to renting, please confirm this with the rental owner/company.
4.Restrictions may apply when the motorbike unit goes to a different city or province. Consult the motorbike owner before riding the motorcycle to a different city or province.
5.The rental owner/company retains the absolute right to refuse to lend the motorcycle to anyone deemed unfit to drive or does not match the eligibility standards. We will not be accountable for xcompleting travel plans, refunds, compensation, damages, or any other fees incurred by the renter.
The renter of a motorcycle must not
1.Use the motorcycle for any illegal purpose.
2.Excessively load the motorcycle.
3.Ride the motorcycle if the renter is reasonably unfitted and unable to drive.
4.Operate a motorcycle while impaired by drink or drugs.
5.Use the motorcycle for racing, speed testing, or instructing others on how to ride.
6.Riding the motorcycle off-road or on racetracks is permissible.
7.Utilize the motorcycle to transport fare-paying passengers.
If renters are displeased with any aspect of their rental, please notify the motorbike owner immediately. Renters may also contact our Customer Service department with a complaint.



RESPONSIBILITIES OF THE OWNER
1.The motorcycle's owner must be at least 18 years old.
2.The owner is responsible for providing a motorcycle with up-to-date registration and third-party insurance. If the motorcycle insurance expires, motorbike owners are not permitted to lend their motorbikes to others.
3.The motorcycle must be well maintained and in good condition; Tourmo is not responsible for any damage caused by the renter; this is solely the owner's responsibility.
4.Before renting a motor vehicle, please verify that the renter has a valid driver's license and the renter's arrival date in the country of passport; a foreign citizen may drive in the Philippines for up to 90 days before renewing it with local authorities. Both parties must be aware of these facts. For additional information, please visit https://www.lto.gov.ph/frequently-asked-questions/license-permit.html.
5.The owner shall supply a full-face helmet; the owner may provide an unlimited number of helmets.
6.The motorcycle owner must obtain a local business permit and license before sharing/borrowing their motorcycles. Motorcycle owners in the Philippines must obtain the 'LTFRB' permit. Please review these guidelines prior to listing the owner's motorbike.

RESPONSIBILITIES OF THE RENTER
1.The renter is responsible for the motorcycle and its keys to avoid theft. The renter must park the motorcycle exclusively in protected areas and utilize all security systems installed on and supplied with the motorcycle.
2.The renter is responsible for protecting the motorcycle from inclement weather that could cause harm.
3.The renter should avoid riding the motorcycle near or near the beach since the salty water can rust and damage the motorcycle.
4.The renter must ensure the motorbike must have proper fuel and oil while using the motorbike.
5.The renter is not permitted to sell, rent, or otherwise dispose of the motorcycle or its components.
6.The renter shall notify Tourmo immediately and no later than 24 hours after becoming aware of a defect with the motorcycle. The motorbike renter shall not allow anyone to work on the motorcycle without the motorbike owner's or Tourmo's consent. If the renter obtains authorization from the motorbike owner, owners can reimburse if the renter presents a legitimate receipt for the work. Failure to comply entails the renter is responsible for any costs associated with repairing the motorcycle or bringing it into accordance with applicable legal rules.
7.For rental durations exceeding one week or 2000 kilometers, the renter shall complete essential vehicle inspections every 500 kilometers (i.e., oil & coolant level, tire pressure, chain tension & grease).
8.The renter is responsible for following all applicable national driving laws and regulations.
9.The renter must always have his or her motorcycle driver's license on hand.
                        </Paragraph>
                </ScrollView>                 
                </View>
                <View style={style.item}>
                <ScrollView style={{flex:1}}>
                            <Paragraph>
                            up date, and confirming that they have already picked up and returned the motorcycle.

PERSONAL INFORMATION 
Our Privacy Policy governs all data and information users provide to us. The information we collect from users must not be shared with third parties and will be used solely for booking reasons.

CORRESPONDENCE BETWEEN USERS AND TOURMO
1.We will contact the users primarily via email. We will communicate via email: info@Tourmo.ph or via Facebook Messenger: facebook.com/tourmo.ph. In instances where immediate communication is required, we reserve the right to phone or SMS the number users gave when booking on our mobile platform.
2.Users are personally liable for any messages transmitted to them.
3.All communications with users are in English.
4.Users are obligated to maintain records of our communications, whether via email or SMS.

PERSONAL DATA PROCESSING
Tourmo collects and processes the following personal data about its clients: their name, their user avatar, their telephone number, their date of birth, their nationality, their motorcycle pickup location, their motorcycle details, and their email address, as well as a copy of their identification document if necessary. Tourmo must gather information from the users. Furthermore, in order for them to identify and contact the renter, information is shared with the motorcycle owner. The renter must have the motorcycle owner's contact details in order for him to reach the motorbike owner's place.
When it comes to motorcycle owners, we also compile a list of motorcycle pickup places so that the renter can locate the owner. Tourmo does not share or sell this information with any third parties. The information from both parties must retain so they can contact one another. Tourmo uses this information to contact the users, update their booking details, or notify them when a new motorbike listing becomes available.
We may contact the users with newsletters, marketing or promotional materials, and other information that we believe will interest them. Users may unsubscribe from any or all of these communications by following the unsubscribe link or instructions included in each email we send.
Users can always submit a request to Tourmo to erase their data (or user account). Please email us at tourmo.ph@gmail.com for additional information.

WE PROTECT USERS AND THE COMMUNITY OF TOURMO
We make every effort to keep users secure by monitoring messages sent over the Tourmo platform. We will filter out potentially harmful messages that contain words or numbers that could reveal contact information or references to other websites, including external links. Users can assist. Notify us if users get a strange message by reporting it or flagging it in their inbox.

IMAGE UPLOADING ON TOURMO
By submitting their motorcycle to Tourmo, motorbike owners grant Tourmo the right to post photographs on social media and make advertisements.
Motorbike owners must post an image of their motorcycle that is not a photocopy from the Internet. If motorbike owners share an image of another person and break privacy laws, they will face legal repercussions.                   
                            </Paragraph>
                        </ScrollView>
             
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <BouncyCheckbox
                            isChecked={accept}
                            onPress={()=>setaccept(!accept)}
                        />
                        <Text>I Accept terms and agreements</Text>
                 
                    </View>
                     
                    <Button name="Confirm" onPress={onPress} disabled={accept ? false :true}/>
                </View>
            </Swiper>
       </View>
    )
}


