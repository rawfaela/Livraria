import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from '../controller';

export default function Cadastro({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const VerificarUser = () => {
        createUserWithEmailAndPassword(auth, email, senha).then((userCredential) => {
            console.log('cadastrado!', userCredential.user.email);
            navigation.navigate('BottomTabs');
        })
            .catch((error) => {
                console.log('erro', error.message);
            });
    }

    return (
        <View style={styles.container}>
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
            <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', width: '80%'}}>
                <TouchableOpacity style={styles.botao} onPress={VerificarUser}>
                    <Text style={styles.textbotao}>CADASTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textbotao}>VOLTAR</Text>
                </TouchableOpacity>
            </View>

            {/* nao é pra ter botao, agr é so pra testar */}
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('AddProdutos')}>
                <Text style={styles.textbotao}>ADICIONAR PRODUTOS</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(181, 194, 223)',
    },

    inputs: {
        alignSelf: 'center',
    },
    input: {
        color: 'white',
        height: 50,
        width: 280,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        fontSize: 20,
        backgroundColor: 'rgb(167, 191, 226)',
        borderRadius: 10,
        borderColor: 'rgb(137, 163, 218)'
    },
    title: {
        color: 'rgb(223, 243, 214)',
        fontWeight: 'bold',
        paddingTop: 150,
        fontSize: 40,
        paddingBottom: 10,
        alignSelf: 'center', 
        textShadowColor: 'rgba(80, 102, 69, 0.75)',
        textShadowOffset: {width: 2, height: 3},
    },
    text1: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 40,
        alignSelf: 'center',
        color: 'rgb(80, 102, 69)',
    },
    text2: {
        paddingLeft: 15,
        fontSize: 20,
    },

    botao: {
        justifyContent: 'space-around',
        backgroundColor: "rgb(144, 168, 133)",
        height: 'auto',
        width: 130,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        rowGap: 20,
    },
    textbotao: {
        fontSize: 20,
        color: 'white',
    },

})

