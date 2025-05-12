import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import Home from './Screens/Home';
import ShowInfo from './Components/ShowInfo';

// ! TODOS OS DESIGNS E CONFIGURAÇÕES SAO DO OUTRO -- MUDAR!!!
function BottomTabs(){
  const Bottom = createBottomTabNavigator();

  return(
    <Bottom.Navigator
    screenOptions={{ headerShadowVisible: false, 
      headerTitleStyle: {fontWeight: 'bold', fontSize: 20}, 
      tabBarActiveTintColor: '#fff', animation: 'fade' }}> 

      <Bottom.Screen name='Home' component={Home} options={{}}/>

{/*       <Bottom.Screen name='Livros' component={Livros} options={{}}/>

      <Bottom.Screen name='Quadrinhos' component={Quadrinhos} options={{}}/>

      <Bottom.Screen name='Carrinho' component={Carrinho} options={{}}/> */}

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
