import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import 'react-native-url-polyfill/auto';
import RestaurantScreen from './screens/RestaurantScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
//import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name='Home'component={HomeScreen}/> 
        <Stack.Screen name="Restaurants" component={RestaurantScreen} />  
        <Stack.Screen name="Basket" component={BasketScreen}
             options={{ presentation: "modal", headerShown: false }}
         /> 
         <Stack.Screen name="PreparingOrderScreen" 
        component={PreparingOrderScreen}
        options={{presentation: 'fullScreenModal', headerShown: false}}
        />  
         <Stack.Screen name="Delivery" 
        component={DeliveryScreen}
        options={{presentation: 'fullScreenModal', headerShown: false}}
        />
        </Stack.Navigator>
        </Provider>
    </NavigationContainer>
  );
}
