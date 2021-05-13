import React, { useEffect } from 'react';
import { Image, TouchableOpacity, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from 'react-native-splash-screen';

import Hamburger from '@assets/hamburger.png'
import constants from '@helpers/constants.js';

//    C O M M O N
import About from '@screens/About.screen';
import RoleSelector from '@screens/Auth/RoleSelector.screen';
import OtpVerification from '@screens/Auth/OtpVerification.screen';
import Signin from '@screens/Auth/Signin';
//    A D M I N
import Home from '@screens/Admin/Home';
import Hostel from '@screens/Admin/Hostel';
import Room from '@screens/Admin/Room';
import ManageData from '@screens/ManageData/ManageData.screen';
import ManageHostel from '@screens/ManageData/ManageHostel.screen';
import ManageRoom from '@screens/ManageData/ManageRoom.screen';
import ManageRoomSlots from '@screens/ManageData/ManageRoomSlots.screen';
import ManageStudent from '@screens/ManageData/ManageStudent.screen';
import ManageBed from '@screens/ManageData/ManageBed.screen';
import ManageAlmirah from '@screens/ManageData/ManageAlmirah.screen';
import ManageTable from '@screens/ManageData/ManageTable.screen';
import ManageChair from '@screens/ManageData/ManageChair.screen';
import CustomDrawer from '@components/CustomDrawer/CustomDrawer.component';
//    S T U D E N T
import Student_Home from '@screens/Student/Student_Home';
// import Student_Hostel from '@screens/Student/Student_Hostel';
import Complain from '@screens/Student/Complain';
import CustomDrawer_Student from '@components/CustomDrawer/CustomDrawer_Student';
//    C A R E T A K E R
import CareTaker_Home from '@screens/CareTaker/CareTaker_Home';
import CareTaker_Complain from '@screens/CareTaker/CareTaker_Complain';
import CustomDrawer_CareTaker from '@components/CustomDrawer/CustomDrawer_CareTaker';




import { signin, SIGNOUT, setUserToken, setUserType, setUserName, setStudent } from '@actions/authAction';

const WIDTH = constants.WIDTH;
const HEIGHT = constants.HEIGHT;

const RootStack = createStackNavigator();



//    C O M M O N
const AuthStack = createStackNavigator();
const AboutStack = createStackNavigator();
//    A D M I N
const Drawer_Admin = createDrawerNavigator();
const HomeStack = createStackNavigator();
const ManageDataStack = createStackNavigator();
//    C A R E T A K E R
const Drawer_CareTaker = createDrawerNavigator();
const CareTakerStack = createStackNavigator();
//    S T U D E N T
const Drawer_Student = createDrawerNavigator();
const StudentStack = createStackNavigator();
const ComplainStack = createStackNavigator();




const Drawer_Icon = ({ navigation }) => {
  return (
    <TouchableOpacity style={{ height: HEIGHT * 0.08, width: WIDTH * 0.2, justifyContent: 'center' }} activeOpacity={0.5} onPress={() => navigation.openDrawer()}>
      <Image source={Hamburger} style={{ width: WIDTH * 0.065, height: WIDTH * 0.048, marginLeft: WIDTH * 0.05, }} resizeMode="stretch" />
    </TouchableOpacity>
  )
}
const Style1 = {
  headerTransparent: true, headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold', fontSize: WIDTH * 0.06, letterSpacing: 1 }
}
const RootStackScreen = ({ logged, userType }) => (
  <RootStack.Navigator headerMode="none">
    {
      logged === true ? (
        userType == 'student' || userType == 'Student' ? (
          <RootStack.Screen name="Home" component={StudentDrawerScreen} />
        ) : userType == 'admin' || userType == 'Admin' ? (
          <RootStack.Screen name="Home" component={AdminDrawerScreen} />
        ) : userType == 'caretaker' || userType == 'CareTaker' ? (
          <RootStack.Screen name="Home" component={CareTakerDrawerScreen} />
        ) : <RootStack.Screen name="Onboarding" component={AuthStackScreen} />
      ) : (
        <RootStack.Screen name="Onboarding" component={AuthStackScreen} />
      )
    }
  </RootStack.Navigator>
)



// =================================================================================C O M M O N=================================================================================
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none" screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}>
    <AuthStack.Screen name="roleSelector" component={RoleSelector} />
    <AuthStack.Screen name="signin" component={Signin} />
    <AuthStack.Screen name="otpVerification" component={OtpVerification} />
  </AuthStack.Navigator>
);
const AboutStackScreen = () => (
  <AboutStack.Navigator screenOptions={({ navigation }) => ({
    ...Style1, ...TransitionPresets.SlideFromRightIOS,
    headerLeft: () => {
      return (
        <Drawer_Icon navigation={navigation} />
      )
    }
  })}
  >
    <AboutStack.Screen name="ABOUT" component={About} />
  </AboutStack.Navigator>
);
// =================================================================================C O M M O N=================================================================================










// =================================================================================A D M I N=================================================================================
const AdminDrawerScreen = () => (
  <Drawer_Admin.Navigator drawerStyle={{ width: WIDTH * 0.85 }} drawerContent={props => <CustomDrawer {...props} />}  >
    <Drawer_Admin.Screen name="drawer_home" component={HomeStackScreen} />
    <Drawer_Admin.Screen name="manage_data" component={ManageDataStackScreen} />
    <Drawer_Admin.Screen name="about" component={AboutStackScreen} />
  </Drawer_Admin.Navigator>
)
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={({ navigation }) => ({
    ...Style1, ...TransitionPresets.SlideFromRightIOS,
    headerLeft: () => {
      return (
        <Drawer_Icon navigation={navigation} />
      )
    }
  })}
  >
    <HomeStack.Screen name="HOME" component={Home} />
    <HomeStack.Screen name="hostel" component={Hostel} options={({ route }) => ({ title: route.params.headerLabel })} />
    <HomeStack.Screen name="room" component={Room} options={({ route }) => ({ title: route.params.headerLabel })} />
  </HomeStack.Navigator>
);
const ManageDataStackScreen = () => (
  <ManageDataStack.Navigator screenOptions={({ navigation }) => ({
    ...Style1, ...TransitionPresets.SlideFromRightIOS,
    headerLeft: () => {
      return (
        <Drawer_Icon navigation={navigation} />
      )
    }
  })}
  >
    <ManageDataStack.Screen name="MANAGE DATA" component={ManageData} />
    <ManageDataStack.Screen name="Manage Hostel" component={ManageHostel} />
    <ManageDataStack.Screen name="Manage Room" component={ManageRoom} />
    <ManageDataStack.Screen name="Manage Room Slots" component={ManageRoomSlots} />
    <ManageDataStack.Screen name="Manage Student" component={ManageStudent} />
    <ManageDataStack.Screen name="Manage Bed" component={ManageBed} />
    <ManageDataStack.Screen name="Manage Almirah" component={ManageAlmirah} />
    <ManageDataStack.Screen name="Manage Table" component={ManageTable} />
    <ManageDataStack.Screen name="Manage Chair" component={ManageChair} />
  </ManageDataStack.Navigator>
);
// =================================================================================A D M I N=================================================================================










// =================================================================================S T U  D E N T=================================================================================
const StudentDrawerScreen = () => (
  <Drawer_Student.Navigator drawerStyle={{ width: WIDTH * 0.85 }} drawerContent={props => <CustomDrawer_Student {...props} />}  >
    <Drawer_Student.Screen name="drawer_home" component={StudentStackScreen} />
    <Drawer_Student.Screen name="complain" component={ComplainStackScreen} />
    <Drawer_Student.Screen name="about" component={AboutStackScreen} />
  </Drawer_Student.Navigator>
)
const StudentStackScreen = () => (
  <StudentStack.Navigator screenOptions={({ navigation }) => ({
    ...Style1, ...TransitionPresets.SlideFromRightIOS,
    headerLeft: () => {
      return (
        <Drawer_Icon navigation={navigation} />
      )
    }
  })}
  >
    <StudentStack.Screen name="HOME" component={Student_Home} />
    <StudentStack.Screen name="hostel" component={Hostel} options={({ route }) => ({ title: route.params.headerLabel })} />
    <StudentStack.Screen name="room" component={Room} options={({ route }) => ({ title: route.params.headerLabel })} />
  </StudentStack.Navigator>
);
const ComplainStackScreen = () => (
  <ComplainStack.Navigator screenOptions={({ navigation }) => ({
    ...Style1, ...TransitionPresets.SlideFromRightIOS,
    headerLeft: () => {
      return (
        <Drawer_Icon navigation={navigation} />
      )
    }
  })}
  >
    <ComplainStack.Screen name="Complaints" component={Complain} />
  </ComplainStack.Navigator>
);
// =================================================================================S T U  D E N T=================================================================================










// =================================================================================C A R E T A K E R=================================================================================
const CareTakerDrawerScreen = () => (
  <Drawer_CareTaker.Navigator drawerStyle={{ width: WIDTH * 0.85 }} drawerContent={props => <CustomDrawer_CareTaker {...props} />}  >
    <Drawer_CareTaker.Screen name="drawer_home" component={CareTakerStackScreen} />
    <Drawer_CareTaker.Screen name="complain" component={ComplainStackScreen_CareTaker} />
    <Drawer_CareTaker.Screen name="about" component={AboutStackScreen} />
  </Drawer_CareTaker.Navigator>
)
const CareTakerStackScreen = () => (
  <CareTakerStack.Navigator screenOptions={({ navigation }) => ({
    ...Style1, ...TransitionPresets.SlideFromRightIOS,
    headerLeft: () => {
      return (
        <Drawer_Icon navigation={navigation} />
      )
    }
  })}
  >
    <CareTakerStack.Screen name="HOME" component={CareTaker_Home} />
    <CareTakerStack.Screen name="hostel" component={Hostel} options={({ route }) => ({ title: route.params.headerLabel })} />
    <CareTakerStack.Screen name="room" component={Room} options={({ route }) => ({ title: route.params.headerLabel })} />
  </CareTakerStack.Navigator>
);


const ComplainStackScreen_CareTaker = () => (
  <ComplainStack.Navigator screenOptions={({ navigation }) => ({
    ...Style1, ...TransitionPresets.SlideFromRightIOS,
    headerLeft: () => {
      return (
        <Drawer_Icon navigation={navigation} />
      )
    }
  })}
  >
    <ComplainStack.Screen name="Complaints" component={CareTaker_Complain} />
  </ComplainStack.Navigator>
);
// =================================================================================C A R E T A K E R=================================================================================















const App = () => {

  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.auth.loggedin);
  const USER_TYPE = useSelector((state) => state.auth.userType);

  useEffect(() => {
    const getUserToken = async () => {
      try {
        const userData = await AsyncStorage.getItem("hostals_USER_DATA");
        if (userData) {
          let parsedUserData = JSON.parse(userData);
          const { USER_TYPE, USER_TOKEN, USER_NAME, AUTH_EXPIRE } = parsedUserData;
          const expiration = new Date(AUTH_EXPIRE)
          const reminderTime = new Date(AUTH_EXPIRE).getTime() - 1 * 60 * 1000;

          if (expiration <= new Date() || !USER_TOKEN) {
            console.log("TOKEN EXPIRED");
            dispatch(setUserToken(null));
            dispatch(SIGNOUT());
          }
          else if (new Date(reminderTime).getTime() <= new Date().getTime()) {
            console.log("CALLING SIGNOUT TIMER");
            let expiresIn = expiration.getTime() - new Date().getTime();
            dispatch(signin(expiresIn));
          }
          else {
            dispatch(setUserType(USER_TYPE))
            dispatch(setUserToken(USER_TOKEN))
            dispatch(setUserName(USER_NAME))
            dispatch(setStudent(parsedUserData.STUDENT));
            dispatch(signin(0));
          }
        }
        SplashScreen.hide()
      }
      catch (err) {
        console.log(err);
      }
    }
    getUserToken();
  }, []);

  return (
    <NavigationContainer>
      <RootStackScreen logged={loggedIn} userType={USER_TYPE} />
    </NavigationContainer>
  );
};


export default App;
