/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet,View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { MainRoute } from './src/routes/MainRoute';
const App = () => {
 
  
  return (
      <PaperProvider>
       <NavigationContainer>
        <MainRoute/>
    </NavigationContainer>
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
