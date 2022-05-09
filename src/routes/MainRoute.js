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
import { Listofbookings } from '../screen/dashboard/Listofbookings';
import ViewBooking from '../screen/dashboard/ViewBooking';
import UpdateVehicle from '../screen/vehicle/UpdateVehicle';
import Ongoing from '../screen/dashboard/Ongoing';
import ConfirmReturn from '../screen/dashboard/ConfirmReturn';
import ActiveBooking from '../screen/dashboard/ActiveBooking';
import TransactionHistory from '../screen/dashboard/TransactionHistory';
import ViewHistory from '../screen/dashboard/ViewHistory';
import ViewNotification from '../screen/notification/ViewNotification';
import Favorite from '../screen/Favorites';
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
        <DashBoardRouteStack.Screen name="List Of Bookings" component={ListofBookings}/>
        <DashBoardRouteStack.Screen name="On Going" component={Ongoing}/>
        <DashBoardRouteStack.Screen name="Active Booking" component={ActiveBooking}/>
        <DashBoardRouteStack.Screen name="Confirm Return" component={ConfirmReturn}/>
        <DashBoardRouteStack.Screen name="Transaction History" component={TransactionHistory}/>
        <DashBoardRouteStack.Screen name="View History" component={ViewHistory}/>
        <DashBoardRouteStack.Screen name="Favorite"  component={Favorite}/>
    </DashBoardRouteStack.Navigator>

)


const VehicleStack = createNativeStackNavigator();
export const VehicleRoute = () => (
    <VehicleStack.Navigator>
        <VehicleStack.Screen name="Vehicle" component={Vehicle} />
        <VehicleStack.Screen name="Update Motourista" component={UpdateMoutorista}/>
        <VehicleStack.Screen name="Add Motor" component={AddVehicle}/>
        <VehicleStack.Screen name="View Vehicle" component={ViewVehicle}/>
        <VehicleStack.Screen name="Top up" component={Topop}/>
        <VehicleStack.Screen name="Update Vehicle" component={UpdateVehicle}/>
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
    <NotificationStack.Navigator screenOptions={{headerShown:false}}>
        <NotificationStack.Screen name="notification" component={Notification}/>
        <NotificationStack.Screen name="View Notification" component={ViewNotification}/>
    </NotificationStack.Navigator>
);


const UserStack = createNativeStackNavigator();
export const UserRoute = () => (
    <UserStack.Navigator>
        <UserStack.Screen name="Profile" component={Profile} />
        <UserStack.Screen name="Update Profile" component={UpdateProfile}/>
        <UserStack.Screen name="Create Motourista" component={CreateMoutorista} />
    </UserStack.Navigator>
);


const ListofBookingsStack = createNativeStackNavigator();

export const ListofBookings = () =>(
    <ListofBookingsStack.Navigator>
        <ListofBookingsStack.Screen name="List of Bookings" component={Listofbookings} />
        <ListofBookingsStack.Screen name="View Booking" component={ViewBooking}/>
    </ListofBookingsStack.Navigator>
)