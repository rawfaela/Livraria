import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller';

export default function Vetlogin ({navigation}){

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const VerificarUser = () => {
        signInWithEmailAndPassword(auth, email, senha).then(userCredential => {
            console.log('usuario logado', userCredential.user.email);
            navigation.navigate('home');
        })
        .catch((error) => {
            console.log('erro ao logar', error.message);
        });
    }

    return(
        <View style={styles.container}>
          <Text style={styles.text1}><b>Login - Livraria Tal</b></Text>
            <View style={styles.inputs}>
                <Text style={styles.text2}><b>Email</b></Text>
                <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                />
                <Text style={styles.text2}><b>Senha</b></Text>
                <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
                />
            </View>
            <View style={styles.botoes}>
            <View style={styles.botao}>
            <Button 
            title="Entrar"
            color="#532d0b"
            onPress={VerificarUser}
            />
            </View>
            <View style={styles.botao}>
            <Button 
            title="Cadastre-se"
            color="#532d0b"
            onPress={() => navigation.navigate('cadastro')}
            />
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F4A460',
    },
    inputs:{
        paddingLeft:43
    },
    input:{
        height: 40,
        width:280,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    text1:{
        paddingTop:250,
        fontSize:23,
        paddingBottom:40,
        alignSelf:'center',
    },
    text2:{
      paddingLeft:15,
      fontSize:20
    },
    botao:{
        paddingTop: 20,
        height: 40,
        width:120,
    },
    botoes:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'70%',
        alignSelf:'center'
    }
})