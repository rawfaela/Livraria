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
    botao: {
        backgroundColor: "#532d0b",
        height: 'auto',
        width: 130,
        alignSelf: 'center',
        alignItems: 'center',
        padding: 5,
        rowGap: 20,
    },
    textbotao: {
        fontSize: 20,
        color: 'white',
    },

})

