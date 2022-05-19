/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import React,{useEffect,useState,useMemo} from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet,View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthRoute, MainRoute, UnauthRoute } from './src/routes/MainRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, NotifContext, UserContext } from './src/context/Context';
import Loading from './src/screen/Loading';
import API from './src/endpoints/API';


const App = () => {
  const [isload, setisload] = useState(true);
  const [id, setid] = useState(null);
  const [isMotourista,setisMotourista] = useState(null);
  const [user,setuser] = useState(null);
  const [email, setemail] = useState("");
  const [isVer, setisVer] = useState(null);
  const [count,setcount] = useState(0);
  const authContext = useMemo(
    () => ({
      signIn: (id,data,isVer) => {
        AsyncStorage.setItem("id", id);
        AsyncStorage.setItem("user",JSON.stringify(data))
        setisload(false);
        setid(id);
        setuser(data);
        setisVer(isVer);
      
      },
      signUp: email => {
        setemail(email);
      },
      signOut: () => {
        setid(null);
         setisload(false);
        AsyncStorage.clear();
      },
      getnotif:async()=>{
        let resp = await API.unread(id);
        setcount(resp.count)
      }
     
    }),
    [],
  );
 
  console.log(count);
  const getcount = async() =>{
    let resp = await API.getnotif(id);
    setcount(resp.count);
  }
console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
  useEffect(() => {
    
    AsyncStorage.getItem("id")
      .then(res => {
        setid(res);
        // eslint-disable-next-line handle-callback-err
      })
      .catch(err => {
        setid(null);
      });
      AsyncStorage.getItem("user")
      .then(res=>{
        setuser(JSON.parse(res));
      }).catch(res=>{
        setuser(null);
      })
      console.log(id);
    setTimeout(() => {
      getcount();
      setisload(false);
    }, 5000);
  }, []);
  if (isload) {
    return <Loading/>;
  }

  return (
      <PaperProvider>
          <AuthContext.Provider value={authContext}>
       <NavigationContainer>
         {id === null ?
            <UnauthRoute/>
          :(

            <UserContext.Provider value={{id,user,isVer}}>
              <NotifContext.Provider value={{count}}>
                  <AuthRoute/>
              </NotifContext.Provider>
               
            </UserContext.Provider>
          )
            
          }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
};

const style = StyleSheet.create({
   container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default App;
