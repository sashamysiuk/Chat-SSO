import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Chat from "./screens/Chat";
import Login from './screens/Login';

const Tab = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
            name="Login"
            component={Login}
            options={{
              headerShown:false
            }}
          />
          <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
              headerShown:false
            }}
          />
        </Tab.Navigator>
        </NavigationContainer>
  );
}
