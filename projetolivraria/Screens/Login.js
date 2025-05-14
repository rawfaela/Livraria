import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller';

//tudo umas cor generica jeni procura uma paleta de cor e uma logo pra colocar

//DECIDI FONTE , PALETA DE COR E LOGO
export default function Login({ navigation }) {


    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const VerificarUser = () => {
        signInWithEmailAndPassword(auth, email, senha).then(userCredential => {
            console.log('usuario logado', userCredential.user.email);
            navigation.navigate('BottomTabs', { screen: 'Home' });

        })
            .catch((error) => {
                console.log('erro ao logar', error.message);
            });
    }

    return (
        <View style={styles.container}>
            {/* <Image
            source={require('../assets/logogenerica.png')}
            style={{ width: 100, height: 100,top:150,left:150}}
            
            logo generica dps muda pra a q fizer
        /> */}
            <Text style={styles.title}>Livraria Tal</Text>
            <Text style={styles.text1}>Login</Text>

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
                <TouchableOpacity style={styles.botao} onPress={VerificarUser}>
                    <Text style={{fontSize: 23,color: 'white'}}>ENTRAR</Text>
                </TouchableOpacity>
            <br></br>
            <View style={styles.cadastro}>
                <Text style={{ fontSize: 24 }}>Não tem cadastro? </Text>
                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={{fontSize: 23,color: 'white'}}>CADASTRE-SE AGORA!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4A460',
    },

    inputs: {
        alignSelf: 'center',
    },
    input: {
        height: 50,
        width: 280,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 20
    },
    title: {
        fontWeight: 'bold',
        paddingTop: 150,
        fontSize: 30,
        paddingBottom: 10,
        alignSelf: 'center',
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 23,
        paddingBottom: 40,
        alignSelf: 'center',
    },
    text2: {
        paddingLeft: 15,
        fontSize: 20
    },

    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        alignSelf: 'center',
    },

    botao: {
        justifyContent: 'space-around',
        backgroundColor: "#532d0b",
        height: 'auto',
        width: 'auto',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 5,
    },
    botao2: {
        marginTop: 10,
        height: 50,
        width: 180,
    },
    cadastro: {
        alignItems: 'center',
        marginTop: 20,
    }
});
