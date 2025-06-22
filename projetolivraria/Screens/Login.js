import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Image} from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller';

import { errorFirebase } from '../Utils/AuthError';

//tudo umas cor generica jeni procura uma paleta de cor e uma logo pra colocar

//DECIDI  PALETA DE COR E LOGO
export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState('');

    const VerificarUser = () => {
        signInWithEmailAndPassword(auth, email, senha).then(userCredential => {
            if (email === 'adm@gmail.com'){
                console.log('adm logado', userCredential.user.email);
                navigation.navigate('AddProdutos', { screen: 'AddProdutos' });
            }
            else{
                console.log('usuario logado', userCredential.user.email);
                navigation.navigate('BottomTabs', { screen: 'Home' });
            }

        })
            .catch((error) => {
                console.log('erro ao logar', error.message);
                const msg = errorFirebase(error.code);
                setErro(msg);
            });
    }

    return (
        <View style={styles.container}>
            <Image
            source={require('../assets/logoApp.png')}
            style={{ width: 100, height: 100,top:128}}
            />
            <Text style={styles.title}>Livraria JRI</Text>
            <Text style={styles.text1}>Login</Text>

            <View>
                <Text style={styles.text2}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {setEmail(text); setErro('');}}
                />
                <Text style={styles.text2}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={(text) => {setSenha(text); setErro('');}}
                    secureTextEntry={true}
                />
            </View>
                <TouchableOpacity style={styles.botao} onPress={VerificarUser}>
                    <Text style={styles.textbotao}>ENTRAR</Text>
                </TouchableOpacity>
            <Text>{'\n'}</Text>
            <View style={styles.cadastro}>
                <Text style={{ fontSize: 24 }}>Não tem cadastro? </Text>
                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.textbotao}>CADASTRE-SE AGORA!</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.erro}>{erro}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(208, 222, 252)',
        alignItems:'center'
    },
    input: {
        color: 'black',
        height: 50,
        width: 280,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        fontSize: 20,
        backgroundColor: 'rgb(184, 202, 230)',
        borderRadius: 10,
        borderColor: 'rgb(137, 163, 218)'
    },
    title: {
        color: 'rgb(173, 148, 238)',
        fontWeight: 'bold',
        paddingTop: 150,
        fontSize: 40,
        paddingBottom: 10,
        textShadowColor: 'rgb(97, 87, 128)',
        textShadowOffset: {width: 3, height: 3},
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 40,
        color: 'rgb(139, 124, 182)',
    },
    text2: {
        paddingLeft: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    botao: {
        justifyContent: 'space-around',
        backgroundColor: "rgb(139, 124, 182)",
        height: 'auto',
        width: 'auto',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
    },
    textbotao: {
        fontSize: 20,
        color: 'white',
    },
    cadastro: {
        marginTop: 20,
    },
    erro: {
        fontSize: 20,
        paddingTop: 7,
        color: 'rgb(193, 53, 10)'
    }
});


