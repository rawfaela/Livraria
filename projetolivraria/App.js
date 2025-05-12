import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';
import ShowInfo from './Components/ShowInfo';
import Livros from './Screens/Livros';
import HQs from './Screens/HQs';
import Carrinho from './Screens/Carrinho';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// ! TODOS OS DESIGNS E CONFIGURAÇÕES SAO DO OUTRO -- MUDAR!!!
function BottomTabs(){
  const Bottom = createBottomTabNavigator();

  return(
    <Bottom.Navigator
    screenOptions={{ headerShadowVisible: false, 
      headerTitleStyle: {fontWeight: 'bold', fontSize: 20}, 
      tabBarActiveTintColor: '#fff', animation: 'fade' }}> 

      <Bottom.Screen name='Home' component={Home}   options={{headerShown: false, 
      tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="bookshelf" size={30} color={focused ? "white" : "black"} />),
        tabBarStyle: { backgroundColor: 'rgb(208, 157, 231)'}}} />
      
      <Bottom.Screen name='Livros' component={Livros} options={{headerShown: false, 
        tabBarIcon: ({ focused }) => (<FontAwesome6 name="book" size={30} color={focused ? "white" : "black"} />),
        tabBarStyle: { backgroundColor: 'rgb(208, 157, 231)'}}}/>

      <Bottom.Screen name='HQs' component={HQs} options={{headerShown: false, 
      tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="book-open-variant" size={30} color={focused ? "white" : "black"} />), 
      tabBarStyle: { backgroundColor: 'rgb(208, 157, 231)'}}}/>

      <Bottom.Screen name='Carrinho' component={Carrinho} options={{headerShown: false, 
      tabBarIcon: ({ focused }) => (<FontAwesome6 name="book" size={30} color={focused ? "white" : "black"} />), 
      tabBarStyle: { backgroundColor: 'rgb(208, 157, 231)'}}}/>
    </Bottom.Navigator>
  )
}

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShadowVisible: false, headerStyle: {margin:0}, headerTitleStyle: {fontWeight: 'bold', fontSize: 20} }}>

        <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />

        <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown: false}} />
        
        <Stack.Screen name='BottomTabs' component={BottomTabs} options={{headerShown: false}} />

        <Stack.Screen name="ShowInfo" component={ShowInfo} options={{ title:'Detalhes do Livro', headerBackTitle: 'Voltar' }}/>


        {/* <Stack.Screen name='ADMProdutos' component={ADMProdutos} options={{}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}