import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../controller';
import { errorFirebase } from '../Utils/AuthError';

export default function Cadastro({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState('');

    const VerificarUser = () => {
        createUserWithEmailAndPassword(auth, email, senha).then((userCredential) => {//then-> if tudo certinho
            console.log('cadastrado!', userCredential.user.email); //usando a função do firebase para criar cadastro, usando os parametros auth(que vai servir para colocar cadastro no banco), campos senha e email
            navigation.navigate('BottomTabs'); //se cadastrar td certinho
        })
            .catch((error) => { //meio q um else pegando o erro de parametro e mostrando a msg de erro do firebase caso esteja algo errado
                console.log('erro', error.message);
                const msg = errorFirebase(error.code);
                setErro(msg);
            });
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Livraria JRI</Text>
            <Text style={styles.text1}>Cadastro</Text>

            <View>
                <Text style={styles.text2}><b>Email</b></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {setEmail(text); setErro('');}}
                />
                <Text style={styles.text2}><b>Senha</b></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={(text) => {setSenha(text); setErro('');}}
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
    erro: {
        fontSize: 20,
        paddingTop: 7,
        color: 'rgb(193, 53, 10)'
    }
})

