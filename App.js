import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserLoginPage from './app/pages/login';
import UserSignupPage from './app/pages/signup';
import SubmitFormDataPage from './app/pages/submitformdata';
import RetrieveDataPage from './app/pages/retreivedata';
import Dashboard from './app/pages/dashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={UserSignupPage} />
      <Stack.Screen name="Login" component={UserLoginPage} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="SubmitFormData" component={SubmitFormDataPage} />
      <Stack.Screen name="RetrieveData" component={RetrieveDataPage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
