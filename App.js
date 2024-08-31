import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import PatientLogin from './PatientLogin';
import DocDashboard from './DocDashboard';
import Docmenu from './Docmenu';
import DoctorSignUp from './DoctorSignUp';
import DoctorLogin from './DoctorLogin.js';
import PatDashboard from './PatDashboard.js';
import Diabetes from './Diabetes.js';
import PatMenu from './PatMenu.js';
import FoodsToEatScreen from './FoodsToEatScreen.js';
import FoodsToControlScreen from './FoodsToControlScreen.js';
import FoodsToAvoidScreen from './FoodsToAvoidScreen.js';

import AddPatient from './AddPatient.js';
import ViewAll from './ViewAll.js';
import HelpScreen from './HelpScreen.js';
import Patientmedic from './Patientmedic.js';
import BloodSugar from './BloodSugar.js';
import PatientDetails from './PatientDetails.js';
import Anthro from './anthro.js';
import Previous from './Previous.js';
import Video from './Video.js';
import Exercise from './Exercise.js';
import AddVideo from './AddVideo.js';
import FoodTriangle from './FoodTriangle.js';
import EditProfile from './EditProfile.js';
import EditDoctorScreen from './EditDoctorScreen.js';
import BloodSugarScreen from './BloodSugarScreen.js';

const Stack = createStackNavigator();
const { height } = Dimensions.get('window');

const headerOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#6EBFF9',
    height: height * 0.1, // Adjust the height proportionally to the screen height
  },
  headerTitle: '',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    color: 'white',
  },
  headerTintColor: 'white',
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Diabetes">
        <Stack.Screen name="Diabetes" component={Diabetes} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FoodsToAvoidScreen" component={FoodsToAvoidScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Diabetes Diet: Foods to Avoid", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="AddPatient" component={AddPatient} options={{ headerShown: false }} />
        <Stack.Screen name="DoctorLogin" component={DoctorLogin} options={headerOptions} />
        <Stack.Screen name="PatientLogin" component={PatientLogin} options={headerOptions} />
        <Stack.Screen name="DocDashboard" component={DocDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="PatDashboard" component={PatDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Docmenu" component={Docmenu} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Menu", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="DoctorSignUp" component={DoctorSignUp} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="PatMenu" component={PatMenu} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Menu", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="FoodsToEatScreen" component={FoodsToEatScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Diabetes-Friendly Foods", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="FoodsToControlScreen" component={FoodsToControlScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Balanced Choices", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="ViewAll" component={ViewAll} options={{ headerShown: false }} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Support Center", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="Patientmedic" component={Patientmedic} options={headerOptions} />
        <Stack.Screen name="BloodSugar" component={BloodSugar} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Blood Sugar", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="PatientDetails" component={PatientDetails} options={headerOptions} />
        <Stack.Screen name="Anthro" component={Anthro} options={headerOptions} />
        <Stack.Screen name="Previous" component={Previous} options={{ headerShown: false }} />
        <Stack.Screen name="Video" component={Video} options={headerOptions} />
        <Stack.Screen name="Exercise" component={Exercise} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Exercise Videos", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />

        <Stack.Screen name="AddVideo" component={AddVideo} options={{ headerShown: false }} />
        <Stack.Screen name="FoodTriangle" component={FoodTriangle} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Food Pyramid", headerTitleStyle: { textAlign: 'center',  marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Edit Profile", headerTitleStyle: { textAlign: 'center', marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="EditDoctorScreen" component={EditDoctorScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Blood Sugar", headerTitleStyle: { textAlign: 'center', marginLeft: 70, marginTop: 10, flexGrow: 1, color: 'white' } }} />
        <Stack.Screen name="BloodSugarScreen" component={BloodSugarScreen} options={{ ...headerOptions, headerStatusBarHeight: 30, headerTitle: "Blood Sugar", headerTitleStyle: { textAlign: 'center', marginLeft: 70, marginTop: 10, flexGrow: 1, color: 'white' } }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
