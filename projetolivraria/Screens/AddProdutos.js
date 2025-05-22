import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native'
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { db } from "../controller";
import { collection, addDoc } from 'firebase/firestore';

export default function AddProdutos(){
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [editora, setEditora] = useState("");
    const [genero, setGenero] = useState("");
    const [categoria, setCategoria] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    const addProduct = async () => {
        try {
            await addDoc(collection(db, "produtos"), {
                titulo,
                autor,
                sinopse,
                editora,
                genero,
                categoria,
                preco: parseFloat(preco),
                imagem,
            });
            alert("Produto adicionado com sucesso!");
            setTitulo("");
            setAutor("");
            setSinopse("");
            setEditora("");
            setGenero("");
            setCategoria("");
            setPreco("");
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
                <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco}></TextInput>
                <TextInput style={styles.input} placeholder="Imagem" value={imagem} onChangeText={setImagem}></TextInput>
                <TouchableOpacity style={styles.botao} onPress={addProduct}>
                    <Text style={{ color: 'white', fontSize: 26 }}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(181, 194, 223)',       
    },
    input: {
        fontSize: 23,
        height: 50,
        width: '90%',
        margin: 10,
        color: 'white',
        borderWidth: 3, /* ver tamanho pra ficar o mais parecido possivel com a categoria */
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
        color: 'rgb(223, 243, 214)',
        marginTop: 30,
        marginBottom: 20,
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(80, 102, 69, 0.75)',
        textShadowOffset: {width: 2, height: 3},
    },
    botao: {
        width: 200, 
        height: 60, 
        backgroundColor: 'rgb(144, 168, 133)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 10
    },
  });
