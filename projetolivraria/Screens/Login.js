import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller';

import { errorFirebase } from '../Utils/AuthError';


export default function Login({ navigation }) {

    const [email, setEmail] = useState(""); 
    const [senha, setSenha] = useState(""); //-> useState para estados relativos, que no caso mudam com o tempo, email e senha campos que vai escrever e erro pra mostrar a msg de erro
    const [erro, setErro] = useState('');
    //auth eh uma instancia que server para fazer login,cadastro... verificando se estão registrados no banco->firebase
    const VerificarUser = () => { //<-função de verificar o usuario
        signInWithEmailAndPassword(auth, email, senha).then(userCredential => { //essa função direta do firebase eh utilizada para logar contas pelo email e senha
            if (email === 'adm@gmail.com'){ //se o email for adm@gmail -> vai navegar ate a area de adicionar produtos do administrador
                console.log('adm logado', userCredential.user.email); //mostrar no console as credencia do msm q no caso eh o email e uma msg
                navigation.navigate('AddProdutos', { screen: 'AddProdutos' });
            }
            else{
                console.log('usuario logado', userCredential.user.email);
                navigation.navigate('BottomTabs', { screen: 'Home' }); //se nao for o adm, sera um usuário, e iria para a tela de home, que tera a navegações de bottomtabs (home,livro,hq..)
            }

        })
            .catch((error) => {//se der erro na senha ou email
                console.log('erro ao logar', error.message); //o errofirebase eh importado do autherror e ele eh varios switch case de possiveis erros de entrada-> email já em uso, senha pequena
                const msg = errorFirebase(error.code); //pega o codigo de erro de cada switch, adiciona a msg de erro e 'seta' ela dentro do estado error, q antes tava vazio
                setErro(msg);
            });
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Livraria JRI</Text>
            <Text style={styles.text1}>Login</Text>

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
                <TouchableOpacity style={styles.botao} onPress={VerificarUser}>
                    <Text style={styles.textbotao}>ENTRAR</Text>
                </TouchableOpacity>
            <br></br>
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


