import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { db } from "../controller";
import { collection, addDoc } from 'firebase/firestore';

export default function AddProdutos(){
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");//estados para mudar as variaveis conforme os campos forem preenchidos
    const [sinopse, setSinopse] = useState("");
    const [editora, setEditora] = useState("");
    const [genero, setGenero] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagem, setImagem] = useState("");
    const [erro, setErro] = useState('');

    const validarCampos = () => { //funcao para validar os campos
        if (!titulo.trim() || !autor.trim() || !sinopse.trim() || !editora.trim() || !genero.trim() || !categoria || !imagem.trim()) { //trim eh tipo pra remover espacoes em brancos q nem o .strip do py  horror 1 fase, ent se nao
            setErro("Por favor, preencha todos os campos."); //vai definr na variavel erro essa msg 
            return false; //se tiver campo em branco e td mais, vai envia retornr como falso a validação
        }
        setErro(''); //caso nao, retorna verdadeiro e sem mensagem de erro
        return true;
    };

    const addProduct = async () => { //funcao assíncrona q ela serve pra qnd tem algo q leva um tempo para ser executado (levar dados para o banco ex) sem q foda o resto do codigo inteiro, ent se isso aq nao acontecer, nao vai buga o app todo
        if (!validarCampos()) {
            return; //se o campo tiver validado, nao vai retornar nada
        }

        try {
            await addDoc(collection(db, "produtos"), { //o try eh para executar algo q pode dar erro, se ocorrer esse erro vai ir por catch q eh 'pego' o erro, por exemplo a internet cai, da erro mas o app ainda funciona sem problema
                //ent resumindo, se tudo estiver certo, ele executa isso
                titulo: titulo.trim(), //esse await ele espera o banco confirmar q salvou os produtos dentro da coleçao antes de seguir para as demais coisas, ent sem ele, ja ia direto pro alert, msm q nao seja salvo, pq demora ne, internet lixo da satc
                autor: autor.trim(),
                sinopse: sinopse.trim(),
                editora: editora.trim(),
                genero: genero.trim(), //nome do campo mas o resultado do campo espaço
                categoria,
                imagem: imagem.trim(),
            });
            alert("Produto adicionado com sucesso!");
            setTitulo("");
            setAutor("");
            setSinopse("");
            setEditora(""); //apos adicionar, volta a limpa os campos caso o usuario queria inserir um novo produto
            setGenero("");
            setCategoria("");
            setImagem("");
        } catch (error) {
            console.error("Erro ao adicionar produto: ", error);
            alert("Erro ao adicionar produto.");
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Adicionar Produtos</Text>
            <View style={{flex:1, alignItems: 'center'}}>
                <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo}></TextInput>
                <TextInput style={styles.input} placeholder="Autor" value={autor} onChangeText={setAutor}></TextInput>
                <TextInput style={styles.input} placeholder="Sinopse" value={sinopse} onChangeText={setSinopse} multiline={true}></TextInput>
                <TextInput style={styles.input} placeholder="Gênero" value={genero} onChangeText={setGenero}></TextInput>
                <TextInput style={styles.input} placeholder="Editora" value={editora} onChangeText={setEditora}></TextInput>

                <Picker selectedValue={categoria} style={styles.select} onValueChange={(itemValue) => setCategoria(itemValue)}>
                    <Picker.Item label="Selecione uma categoria" value="" enabled={false} />
                    <Picker.Item label="Livro" value="Livro"/>
                    <Picker.Item label="HQ" value="HQ"/>
                </Picker>
                <TextInput style={styles.input} placeholder="Imagem" value={imagem} onChangeText={setImagem}></TextInput>
                <TouchableOpacity style={styles.botao} onPress={addProduct}>
                    <Text style={{ color: 'white', fontSize: 26 }}>Enviar</Text>
                </TouchableOpacity>
                <Text style={styles.erro}>{erro}</Text>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(208, 222, 252)',       
    },
    input: {
        fontSize: 23,
        height: 50,
        width: '90%',
        margin: 10,
        color: 'white',
        borderWidth: 3, 
        padding: 10,
        borderRadius: 7,
        backgroundColor:' rgb(167, 191, 226)',
        borderColor: 'rgb(137, 163, 218)'
    },
    select: {
        fontSize: 23,
        height: 50,
        width: '90%',
        margin: 12,
        color: 'white',
        borderWidth: 4,
        padding: 10,
        borderRadius: 7,
        backgroundColor:'  rgb(167, 191, 226)',
        borderColor: 'rgb(137, 163, 218)'
    },
    titulo: {
        color: 'rgb(173, 148, 238)',
        marginTop: 30,
        marginBottom: 20,
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgb(97, 87, 128)',
        textShadowOffset: {width: 2, height: 3},
    },
    botao: {
        width: 200, 
        height: 60, 
        backgroundColor: 'rgb(139, 124, 182)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10
    },
    erro: {
        fontSize: 20,
        paddingTop: 7,
        color: 'rgb(193, 53, 10)'
    }
});