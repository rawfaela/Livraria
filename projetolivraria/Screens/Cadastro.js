import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from '../controller';

export default function Cadastro({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const VerificarUser = () => {
        createUserWithEmailAndPassword(auth, email, senha).then((userCredential) => {
            console.log('cadastrado!', userCredential.user.email);
        })
            .catch((error) => {
                console.log('erro', error.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.tudo}>
                <Text style={styles.title}>Livraria Tal</Text>
                <Text style={styles.text1}>Cadastro</Text>
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
                            title="Cadastrar"
                            color="#532d0b"
                            onPress={VerificarUser}
                        />
                    </View>
                    <View style={styles.botao}>
                        <Button
                            title="Voltar"
                            color="#532d0b"
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
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
    title: {
        fontWeight: 'bold',
        paddingTop: 250,
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
    botao: {
        paddingTop: 20,
        height: 40,
        width: 120,
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        alignSelf: 'center'
    }
})

