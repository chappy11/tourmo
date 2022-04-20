import React from 'react';
import { NaivgationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screen/SplashScreen';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Home from '../screen/Home';
import ViewMotor from '../screen/ViewMotor'
import CreateTransaction from '../screen/CreateTransaction';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../screen/Notification';
import Profile from '../screen/user/Profile';
import Dashboard from '../screen/Dashboard';
import Vehicle from '../screen/dashboard/Vehicle';
import CreateMoutorista from '../screen/moutorista/CreateMoutorista';
import AddVehicle from '../screen/vehicle/AddVehicle';
import ViewVehicle from '../screen/vehicle/ViewVehicle';
import UpdateProfile from '../screen/user/UpdateProfile';
import Topop from '../screen/vehicle/Topup';
import UpdateMoutorista from '../screen/moutorista/UpdateMoutorista';
const MainStack = createNativeStackNavigator();

// export const MainRoute = () => (
//     <MainStack.Navigator>
//         <MainStack.Screen name="UnAuthRoute" options={{headerShown:false}} component={UnauthRoute}/>
//         <MainStack.Screen name="Auth" options={{headerShown:false}} component={AuthRoute}/>
//     </MainStack.Navigator>
// )


const UnAuthStack = createNativeStackNavigator();

export const UnauthRoute = () => (
    <UnAuthStack.Navigator screenOptions={{headerShown:false}} >
        <UnAuthStack.Screen name='SplashScreen' component={SplashScreen} />
        <UnAuthStack.Screen name='Login' component={Login} />
        <UnAuthStack.Screen name="Register" component={Register}/>
    </UnAuthStack.Navigator>
)


const AuthRouteTab = createBottomTabNavigator();

export const AuthRoute = () => (
    <AuthRouteTab.Navigator screenOptions={{headerShown:false}}>
        <AuthRouteTab.Screen name="HomeRoute" component={HomeRoute} options={{tabBarLabel:"Home"}}/>
         <AuthRouteTab.Screen name="UserRoute" component={UserRoute} options={{tabBarLabel:"Profile"}}/>
        <AuthRouteTab.Screen name="DashboardRoute" component={DashboardRoute} options={{tabBarLabel:"Dashboard"}}/>
        <AuthRouteTab.Screen name="NotificationRoute" component={NotificationRoute} options={{ tabBarLabel: "Notification" }} />
    </AuthRouteTab.Navigator>
)


const DashBoardRouteStack = createNativeStackNavigator();

export const DashboardRoute = () =>(
    <DashBoardRouteStack.Navigator screenOptions={{headerShown:false}}>
        <DashBoardRouteStack.Screen name="Dashboard" component={Dashboard}/>
        <DashBoardRouteStack.Screen name="VehicleRoute" component={VehicleRoute}/>
    </DashBoardRouteStack.Navigator>
)


const VehicleStack = createNativeStackNavigator();
export const VehicleRoute = () => (
    <VehicleStack.Navigator>
        <VehicleStack.Screen name="Vehicle" component={Vehicle} />
        <VehicleStack.Screen name="Create Motourista" component={CreateMoutorista} />
        <VehicleStack.Screen name="Update Motourista" component={UpdateMoutorista}/>
        <VehicleStack.Screen name="Add Motor" component={AddVehicle}/>
        <VehicleStack.Screen name="View Vehicle" component={ViewVehicle}/>
        <VehicleStack.Screen name="Top up" component={Topop}/>
    </VehicleStack.Navigator>
)


//home route from tab
const AuthStack = createNativeStackNavigator();

export const HomeRoute = () => (
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="View Motor" component={ViewMotor} />
        <AuthStack.Screen name="Create Transaction" component={CreateTransaction}/>
    </AuthStack.Navigator>
);
    

//notification route from tab
const NotificationStack = createNativeStackNavigator();

export const NotificationRoute = ()=> (
    <NotificationStack.Navigator>
        <NotificationStack.Screen name="notification" component={Notification}/>
    </NotificationStack.Navigator>
);


const UserStack = createNativeStackNavigator();
export const UserRoute = () => (
    <UserStack.Navigator>
        <UserStack.Screen name="Profile" component={Profile} />
        <UserStack.Screen name="Update Profile" component={UpdateProfile}/>
    </UserStack.Navigator>
);


