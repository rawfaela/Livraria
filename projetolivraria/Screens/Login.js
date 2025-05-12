import { Text, View, StyleSheet, TextInput, Button, Image } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller';

//tudo umas cor generica jeni procura uma paleta de cor e uma logo pra colocar
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
            <View style={styles.tudo}>
                {/* <Image
                source={require('../assets/logogenerica.png')}
                style={{ width: 100, height: 100,top:150,left:150}}
                
                logo generica dps muda pra a q fizer
            /> */}
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
                <View>
                    <View style={styles.botoes}>
                        <View style={styles.botao}>

                            <Button
                                title="Entrar"
                                color="#532d0b"
                                onPress={VerificarUser}
                            />
                        </View>
                    </View>

                </View>
                <br></br>
                <View style={styles.cadastro}>
                    <Text style={{ fontSize: 24 }}>Não tem cadastro? </Text>
                    <Text style={{ color: 'red', textDecorationLine: 'underline', fontSize: 22 }}

                        onPress={() => navigation.navigate('Cadastro')}
                    >
                        Cadastre-se agora!
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4A460',
    },

    tudo: {
        bottom: 100
    },

    inputs: {
        paddingLeft: 60
    },
    input: {
        height: 50,
        width: 280,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 20
    },
    text1: {
        paddingTop: 250,
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
        paddingTop: 20,
        height: 50,
        width: 120,
    },

    cadastro: {
        alignItems: 'center',
        marginTop: 20,
    }
});
