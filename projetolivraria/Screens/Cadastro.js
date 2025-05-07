import { useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
/* import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../controller'; */

export default function Cadastro({navigation}){ 
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

/*     const cadastroUser = () => {
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log('cadastrado', userCredential.user.email);
            navigation.navigate('Login');
        })
        .catch((error) => {
            console.log('erro ao cadastrar', error.message)
        });
    }; */

    return(
        <View style={styles.container}>
            <View style={{flex:1}}><Text style={styles.titulo}> Perfumes by Rafa </Text></View>

            <View style={{flex:1}}>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}></TextInput>
                <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry={true}></TextInput>
            </View>

            <View style={{flex:0.5, alignItems: 'center', justifyContent: 'space-around'}}>
                <TouchableOpacity
                    style={styles.botao} /* onPress={cadastroUser} */>
                        <Text style={{ color: 'white', fontSize: 26 }}>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botao2} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: 'rgb(138, 83, 214)', fontSize: 26 }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(175, 137, 228)',
    },
    input: {
        fontSize: 23,
        height: 50,
        margin: 12,
        color: 'white',
        borderColor: 'rgb(117, 64, 192)',
        borderWidth: 4,
        padding: 10,
        borderRadius: 7,
        backgroundColor:' rgb(168, 128, 223)',
    },
    titulo: {
        marginTop: 150,
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(46, 6, 83)',
        textShadowColor: 'rgba(136, 65, 202, 0.75)',
        textShadowOffset: {width: 2, height: 3},
    },
    botao: {
        width: 200, 
        height: 60, 
        backgroundColor: 'rgb(138, 83, 214)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10
    },
    botao2: {
        width: 200, 
        height: 60, 
        backgroundColor: 'rgb(255, 255, 255)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10
    }
  });
